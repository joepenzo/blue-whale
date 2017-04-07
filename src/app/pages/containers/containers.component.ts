import { ContainerInfo, ContainerInspectInfo } from 'dockerode';
import { DockerService } from './../../shared/Docker.service';
import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AlertDialogComponent } from './../../shared/alert-dialog.component';

@Component({
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  containers = new Array<ContainerInfo>();

  constructor(public dockerService: DockerService, public dialog: MdDialog) {
  }

  ngOnInit() {
    this.refresh();
  }

  start(id: string, index: number) {
    this.containers[index].State = "waiting";
    this.dockerService.startContainer(id)
      .then((value: any) => {
        this.containers[index].State = "running";
      })
      .catch((error: string) => {
        this.dialog.open(AlertDialogComponent, {data: {type:"warning", message: error}});
        this.containers[index].State = "exited";
      });
  }

  stop(id: string, index: number) {
    this.containers[index].State = "waiting";
    this.dockerService.stopContainer(id)
      .then((value: any) => {
        this.containers[index].State = "exited";
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, {data: {type:"warning", message: error}});
        this.containers[index].State = "running";
      });
  }

  restart(id: string, index: number) {
    this.containers[index].State = "waiting";
    this.dockerService.stopContainer(id)
      .then((value: any) => {
        this.dockerService.startContainer(id)
          .then((value: any) => {
            this.containers[index].State = "running";
          })
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, {data: {type:"warning", message: error}});
        this.containers[index].State = "running";
      });
  }

  remove(id: string, index: number) {
    this.containers[index].State = "waiting";
    this.dockerService.removeContainer(id)
      .then((value: any) => {
        this.containers.splice(index, 1);
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, {data: {type:"warning", message: error}});
        this.containers[index].State = "exited";
      });;
  }

  refresh() {
    this.dockerService.getContainers().then((containers) => {
      this.containers = containers;
      this.sort();
    });
  }

  private sort() {
    this.containers.sort((n1, n2) => n2.State.length - n1.State.length);
  }

}
