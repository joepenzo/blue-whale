import { DockerService } from './shared/Docker.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public dockerService: DockerService, mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    mdIconRegistry.addSvgIcon("docker-logo", sanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.svg'));
  }

  ngOnInit() {
  
  }

}
