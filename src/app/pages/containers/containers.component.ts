import { ContainerOptionsComponent } from './../container-options/container-options.component';
import { SpinnerService } from './../../shared/service/spinner.service';
import { ContainerInfo, ContainerInspectInfo } from 'dockerode';
import { DockerService } from './../../shared/service/docker.service';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { AlertDialogComponent } from './../../shared/component/alert-dialog/alert-dialog.component';

export const State = {
  RUNNING: "running",
  WAITING: "waiting",
  EXITED: "exited",
}

@Component({
  selector: 'containers-component',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  containers = new Array<ContainerInfo>();

  config: MdDialogConfig = {
    disableClose: false,
    width: '80%',
    height: '90%',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {}
  };

  constructor(public dockerService: DockerService, public dialog: MdDialog, public spinner: SpinnerService) {
    
  }

  ngOnInit() {
    this.refresh();
  }

  start(id: string, index: number) {
    this.containers[index].State = State.WAITING;
    this.dockerService.startContainer(id)
      .then((value: any) => {
        this.containers[index].State = State.RUNNING;
      })
      .catch((error: string) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.containers[index].State = State.EXITED;
      });
  }

  stop(id: string, index: number) {
    this.containers[index].State = State.WAITING;
    this.dockerService.stopContainer(id)
      .then((value: any) => {
        this.containers[index].State = State.EXITED;
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.containers[index].State = State.RUNNING;
      });
  }

  restart(id: string, index: number) {
    this.containers[index].State = State.WAITING;
    this.dockerService.restartContainer(id)
      .then((value: any) => {
        this.containers[index].State = State.RUNNING;
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.containers[index].State = State.RUNNING;
      });
  }

  remove(id: string, index: number) {
    this.containers[index].State = State.WAITING;
    this.dockerService.removeContainer(id, {force: this.containers[index].State = State.RUNNING })
      .then((value: any) => {
        this.containers.splice(index, 1);
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.containers[index].State = State.EXITED;
      });
  }

  settings(id: string, index: number) {
    this.containers[index].State = State.WAITING;
    this.dockerService.getContainerInspect(id)
      .then((v) => {
        this.config.data = {containerInspect: v};
        this.dialog.open(ContainerOptionsComponent, this.config).afterClosed().subscribe((v) => {
          this.containers[index].State = State.EXITED;  
        });
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.containers[index].State = State.EXITED;
      });
  }

  refresh() {
    this.spinner.start();
    this.dockerService.getContainers().then((containers) => {
      this.containers = containers;
      this.sort();
      this.spinner.stop();
    });
  }

  private sort() {
    this.containers.sort((n1, n2) => n2.State.length - n1.State.length);
  }

}
