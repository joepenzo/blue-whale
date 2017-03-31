import { ContainerInfo, ContainerInspectInfo } from 'dockerode';
import { DockerService } from './../../shared/Docker.service';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Component({
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  containers = new Array<ContainerInfo>();

  constructor(public dockerService: DockerService, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.refresh();
  }

  start(id: String, index: number) {
    this.containers[index].State = "waiting";
    this.dockerService.startContainer(id)
      .then((value: ContainerInspectInfo) => {
        this.containers[index].State = "running";
      })
      .catch((error: String) => {
        this.snackBar.open((error + "").split(":").splice(2).join(" "), "Start", { duration: 5000 });
        this.containers[index].State = "exited";
      });
  }

  stop(id: String, index: number) {
    this.containers[index].State = "waiting";
    this.dockerService.stopContainer(id)
      .then((value: ContainerInspectInfo) => {
        this.containers[index].State = "exited";
      })
      .catch((error: String) => {
        this.snackBar.open((error + "").split(":").splice(2).join(" "), "Start", { duration: 5000 });
        this.containers[index].State = "running";
      });
  }

  restart(id: String, index: number) {
    this.containers[index].State = "waiting";
    this.dockerService.stopContainer(id)
      .then((value: ContainerInspectInfo) => {
        this.dockerService.startContainer(id)
          .then((value: ContainerInspectInfo) => {
            this.containers[index].State = "running";
          })
          .catch((error: String) => {
            this.snackBar.open((error + "").split(":").splice(2).join(" "), "Start", { duration: 5000 });
            this.containers[index].State = "running";
          });
      })
      .catch((error: String) => {
        this.snackBar.open((error + "").split(":").splice(2).join(" "), "Start", { duration: 5000 });
        this.containers[index].State = "running";
      });
  }

  remove(id: String, index: number) {
    this.containers[index].State = "waiting";
    this.dockerService.removeContainer(id)
      .then((value: any) => {
        this.containers.splice(index, 1);
      })
      .catch((error: String) => {
        this.snackBar.open((error + "").split(":").splice(2).join(" "), "Start", { duration: 5000 });
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
