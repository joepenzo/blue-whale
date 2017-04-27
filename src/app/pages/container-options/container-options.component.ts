import { fadeInAnimation } from './../../animations/fade-in.animation';
import { SpinnerService } from './../../shared/service/spinner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DockerService } from './../../shared/service/docker.service';
import { ContainerInspectInfo } from 'dockerode';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AlertDialogComponent } from './../../shared/component/alert-dialog/alert-dialog.component';

const { clipboard } = require('electron')

class General {

  constructor(
    public Id?: string,
    public Name?: string,
    public Env?: Array<any>
  ) { }

}

@Component({
  selector: 'app-container-options',
  templateUrl: './container-options.component.html',
  styleUrls: ['./container-options.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ContainerOptionsComponent implements OnInit {
  //Config.Evn
  generalModel: General = new General("", "", new Array<any>());
  portsModel = new Array<any>();
  volumesModel = new Array<any>();
  configModel = {Tty: false, OpenStdin: false};

  constructor(public dialog: MdDialog, private dockerService: DockerService, private spinner: SpinnerService, private router: Router) {
    let c = JSON.parse(sessionStorage.getItem("settingsContainer"));

    //config
    this.configModel = c.Config;

    //general
    this.generalModel.Id = c.Id;
    this.generalModel.Name = c.Name;

    c.Config.Env.forEach((v) => {
      this.generalModel.Env.push({ Key: v.split("=")[0], Value: v.split("=")[1] });
    });

    this.generalModel.Env.push({});

    //ports
    for (var key in c.NetworkSettings.Ports) {
      if (!c.NetworkSettings.Ports[key]) continue;

      c.NetworkSettings.Ports[key].forEach((v) => {
        this.portsModel.push({ DockerPort: key.split("/")[0], Type: key.split("/")[1], HostIp: v.HostIP, HostPort: v.HostPort });
      });
    }

    this.portsModel.push({});

    //volumes
    this.volumesModel = c.Mounts;
    this.volumesModel.push({})

  }

  ngOnInit() {
    this.spinner.stop();
  }

  //add and remove one env,port,volume
  onClearEnv(index: number) {
    this.generalModel.Env.splice(index, 1);
  }

  onAddEnv() {
    this.generalModel.Env.push({});
  }

  onClearPorts(index: number) {
    this.portsModel.splice(index, 1);
  }

  onAddPorts() {
    this.portsModel.push({});
  }

  onClearVolumes(index: number) {
    this.volumesModel.splice(index, 1);
  }

  onAddVolumes() {
    this.volumesModel.push({});
  }

  //recreate the container, after remove it
  onRecreate() {
    let ports = {};
    this.portsModel.filter((v) => v["DockerPort"] && v["HostPort"]).forEach((v) => {
      v["Type"] = v["Type"] || "tcp";
      ports[v["DockerPort"] + "/" + v["Type"]] = { HostIp: "0.0.0.0", HostPort: v["HostPort"] };
    });

    let volumes = {};
    this.volumesModel.filter((v) => v["Destination"] && v["Source"]).forEach((v) => {
      volumes[v["Destination"]] = { Destination: v["Destination"], Mode: v["Destination"] || "rw", RW: v["RW"] || true, Source: v["Source"], Type: v["Type" || "bind"] }
    });

    this.spinner.start();
    let options = {
      Image: this.configModel["Image"],
      name: this.generalModel.Name,
      Tty: this.configModel["Tty"],
      OpenStdin: this.configModel["OpenStdin"],
      Env: this.generalModel.Env.filter((v) => v["Key"] && v["Value"]).map((v) => v["Key"] + "=" + v["Value"]),
      ExposedPorts: ports,
      Volumes: volumes
    };

    this.dockerService.removeContainer(this.generalModel.Id, { force: true })
      .then((v) => {
        this.dockerService.createContainer(options)
          .then((v) => {
            this.dockerService.startContainer(v.id)
          })
          .then((v) => {
            this.spinner.stop();
            this.router.navigate(['containers']);
          })
          .catch((error: string) => {
            this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
            this.spinner.stop();
          });
      })
      .catch((error: string) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.spinner.stop();
      });
  }

  //copy id
  onCopyId() {
    clipboard.writeText(this.generalModel.Id);
  }

  //rename
  onRename() {
    this.dockerService.renameContainer(this.generalModel.Id, { name: this.generalModel.Name })
      .then((v) => { })
      .catch((error: string) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
      });
  }

}
