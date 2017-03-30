import { DockerService } from './../../shared/Docker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  constructor(public dockerService: DockerService) { }

  ngOnInit() {
    this.dockerService.getContainers().then((containers) => {
      console.log(containers);
    });
  }

}
