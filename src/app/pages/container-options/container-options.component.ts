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

  constructor(public dialogRef: MdDialogRef<ContainerOptionsComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    console.log(data.containerInspect);
    let c = data.containerInspect;
    this.generalModel.Id = c.Id;
    this.generalModel.Name = c.Name;

    c.Config.Env.forEach((v) => {
      this.generalModel.Env.push({ Key: v.split("=")[0], Value: v.split("=")[1] });
    });

    this.generalModel.Env.push({Key: "", Value: "", end: true});

  }

  ngOnInit() {

  }

  tabChanged($event) {
    console.log($event);
  }

}
