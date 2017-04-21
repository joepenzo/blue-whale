import { fadeInAnimation } from './../../animations/fade-in.animation';
import { SpinnerService } from './../../shared/service/spinner.service';
import { Component, OnInit } from '@angular/core';
import { DockerService } from './../../shared/service/docker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent implements OnInit {

  info: any;
  version: any;

  constructor(public dockerService: DockerService, public spinner: SpinnerService) { }

  ngOnInit() {
    this.dockerService.getInfo().then((v) => {
      this.info = v;
    });
    this.dockerService.getVersion().then((v) => {
      this.version = v;
    })
    this.spinner.stop();
  }

}
