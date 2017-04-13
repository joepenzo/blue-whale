import { ContainerInspectInfo } from 'dockerode';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

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

  constructor(public dialogRef: MdDialogRef<ContainerOptionsComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    console.log(data.containerInspect);
    let c = data.containerInspect;

    //config
    this.configModel = c.Config;

    //general
    this.generalModel.Id = c.Id;
    this.generalModel.Name = c.Name;

    c.Config.Env.forEach((v) => {
      this.generalModel.Env.push({ Key: v.split("=")[0], Value: v.split("=")[1] });
    });

    this.generalModel.Env.push({Key: "", Value: "", end: true});

    //ports
    for (var key in c.NetworkSettings.Ports) {
      c.NetworkSettings.Ports[key].forEach((v) => {
        this.portsModel.push({DockerPort: key.split("/")[0], Type: key.split("/")[1], HostIp: v.HostIP, HostPort: v.HostPort});  
      });
    }

    //volumes
    this.volumesModel = c.Mounts;
    
  }

  ngOnInit() {

  }

  tabChanged($event) {
    console.log($event);
  }

}
