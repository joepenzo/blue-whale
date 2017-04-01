import { DockerService } from './shared/Docker.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading: boolean = true;

  constructor(mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer, router: Router) {
    mdIconRegistry.addSvgIcon("docker-logo", sanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.svg'));

    router.events.subscribe((event: RouterEvent) => {
      this.loading = true;
      this.sleep(500).then(() => {
        this.navigationInterceptor(event);
      });
    });

  }

  ngOnInit() { }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

  sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
  }

}
