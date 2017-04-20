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
  styleUrls: ['./container-logs.component.css']
})
export class ContainerLogsComponent implements OnInit, AfterViewChecked {
  convert = new Convert();
  logs: Array<any> = new Array<any>();

  public logSubject: Subject<any> = new Subject();

  @ViewChild('scrollDiv') private scrollContainer: ElementRef;

  constructor(public dockerService: DockerService, public spinner: SpinnerService, public route: ActivatedRoute, private ngZone: NgZone, private domSanitizer: DomSanitizer) {
    this.logSubject.subscribe((v) => {
      this.logs.push(v);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(v => {
      this.dockerService.getContainerLogs(v["id"], { stdout: true, stderr: true, tail: 1000, follow: false, timestamp: 1 })
        .then((v: NodeJS.ReadableStream) => {
          v.setEncoding("utf8");
          v.on("data", (v) => {
            let unsafeHtml = v + "";
            unsafeHtml = this.convert.toHtml(unsafeHtml.replace(/ /g, '&nbsp;<wbr>'));
            this.ngZone.run(() => {
              this.logSubject.next(this.domSanitizer.bypassSecurityTrustHtml(unsafeHtml));
            });
          })
          this.spinner.stop();
        });

    });
  }

  ngAfterViewChecked() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}