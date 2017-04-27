import { MdDialog } from '@angular/material';
import { fadeInAnimation } from './../../animations/fade-in.animation';
import { SpinnerService } from './../../shared/service/spinner.service';
import { Component, OnInit } from '@angular/core';
import { DockerService } from './../../shared/service/docker.service';
import { AlertDialogComponent } from './../../shared/component/alert-dialog/alert-dialog.component';

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

  constructor(public dockerService: DockerService, public spinner: SpinnerService, public dialog: MdDialog,) { }

  ngOnInit() {
    this.dockerService.getInfo()
      .then((v) => {
        this.info = v;
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
      });

    this.dockerService.getVersion()
      .then((v) => {
        this.version = v;
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
      });
      
    this.spinner.stop();
  }

}
