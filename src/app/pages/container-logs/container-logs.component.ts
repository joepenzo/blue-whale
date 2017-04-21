import { fadeInAnimation } from './../../animations/fade-in.animation';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from './../../shared/service/spinner.service';
import { MdDialog } from '@angular/material';
import { DockerService } from './../../shared/service/docker.service';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, NgZone } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import Convert from 'ansi-to-html';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-container-logs',
  templateUrl: './container-logs.component.html',
  styleUrls: ['./container-logs.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ContainerLogsComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollDiv')
  private scrollContainer: ElementRef;
  private convert = new Convert();

  public logSubject: Subject<any> = new Subject();

  logs: Array<any> = new Array<any>();
  container: any;

  constructor(public dockerService: DockerService, public spinner: SpinnerService, public route: ActivatedRoute, private ngZone: NgZone, private domSanitizer: DomSanitizer) {
    this.logSubject.subscribe((v) => {
      this.logs.push(v);
    });
  }

  ngOnInit() {
    this.loadLogs();
  }

  //scroll to bottom
  ngAfterViewChecked() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  loadLogs() {
    this.route.params.subscribe(v => {
      this.ngZone.run(() => this.container = this.dockerService.getContainer(v["id"]));
      
      this.dockerService.getContainerLogs(v["id"], { stdout: true, stderr: true, follow: false, timestamp: 1 })
        .then((v: NodeJS.ReadableStream) => {
          v.setEncoding("utf8");
          v.on("data", (v) => {
            let unsafeHtml = v + "";
            unsafeHtml = unsafeHtml.substr(8);
            unsafeHtml = this.convert.toHtml(unsafeHtml.replace(/ /g, '&nbsp;<wbr>'));
            this.ngZone.run(() => {
              this.logSubject.next(this.domSanitizer.bypassSecurityTrustHtml(unsafeHtml));
            });
          })
          this.spinner.stop();
        });

    });
  }

}