import { SpinnerService } from './shared/service/spinner.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'

var remote = require('electron').remote;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading: boolean = false;
  localeName: string = localStorage.getItem("localeName");

  constructor(mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer, router: Router, public spinner: SpinnerService) {
    mdIconRegistry.addSvgIcon("docker-logo", sanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.svg'));

    spinner.status.subscribe((v: boolean) => {
      this.loading = v;
    });

    router.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.spinner.start();
        }
        if (event instanceof NavigationCancel) {
          this.spinner.stop();
        }
        if (event instanceof NavigationError) {
          this.spinner.stop();
        }
    });

  }

  ngOnInit() { 
    this.spinner.stop();
  }

  onChangeLanguage(locale: string) {
    localStorage.setItem("localeName", locale);
    // remote.getCurrentWindow().webContents.reload();
    // remote.getCurrentWindow().reload();
    remote.getCurrentWindow().loadURL('file://' + __dirname + "/index.html")
  }

}
