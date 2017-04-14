import { SpinnerService } from './../../shared/service/spinner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DockerService } from './../../shared/service/docker.service';
import { ContainerInspectInfo } from 'dockerode';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AlertDialogComponent } from './../../shared/component/alert-dialog/alert-dialog.component';

const {clipboard} = require('electron')

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
  styleUrls: ['./container-options.component.css']
})
export class ContainerOptionsComponent implements OnInit {
  //Config.Evn
  generalModel: General = new General("", "", new Array<any>());
  portsModel = new Array<any>();
  volumesModel = new Array<any>();
  configModel = {};

  constructor(public dialog: MdDialog, private dockerService: DockerService, private spinner: SpinnerService) {
    let c = JSON.parse(sessionStorage.getItem("settingsContainer"));
    console.log(c);

    //config
    this.configModel = c.Config;

    //general
    this.generalModel.Id = c.Id;
    this.generalModel.Name = c.Name;

    c.Config.Env.forEach((v) => {
      this.generalModel.Env.push({ Key: v.split("=")[0], Value: v.split("=")[1] });
    });

    this.generalModel.Env.push({end: true });

    //ports
    for (var key in c.NetworkSettings.Ports) {
      c.NetworkSettings.Ports[key].forEach((v) => {
        this.portsModel.push({ DockerPort: key.split("/")[0], Type: key.split("/")[1], HostIp: v.HostIP, HostPort: v.HostPort });
      });
    }

    this.portsModel.push({end: true });

    //volumes
    this.volumesModel = c.Mounts;
    this.volumesModel.push({end: true})

  }

  ngOnInit() {
    this.spinner.stop();
  }

  onRecreate() {
    
  }

  onCopyId() {
    clipboard.writeText(this.generalModel.Id);
  }

  onRename() {
    this.dockerService.renameContainer(this.generalModel.Id, {name: this.generalModel.Name})
      .then((v) => {
        console.log(v);
      })
      .catch((error: string) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
      });;
  }

}
