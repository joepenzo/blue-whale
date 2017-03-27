import { DockerService } from './shared/Docker.service';
import { Component } from '@angular/core';

import { remote } from 'electron'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(dockerService: DockerService) {

  }

}
