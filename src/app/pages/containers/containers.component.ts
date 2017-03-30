import { ContainerInfo, ContainerInspectInfo } from 'dockerode';
import { DockerService } from './../../shared/Docker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  containers = new Array<ContainerInfo>();

  constructor(public dockerService: DockerService) { }

  ngOnInit() {
    this.dockerService.getContainers().then((containers) => {
      this.containers = containers.sort((n1 ,n2) => n2.State.length - n1.State.length)
    });
  }

  start(id: String) {
   this.dockerService.startContainer(id).then((value: ContainerInspectInfo) => {
     console.log(value);
   });
  }

  stop(id: String) {
   this.dockerService.stopContainer(id).then((value: ContainerInspectInfo) => {
     console.log(value);
   });
  }

}
