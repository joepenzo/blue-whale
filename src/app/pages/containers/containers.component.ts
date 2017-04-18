import { Router } from '@angular/router';
import { ContainerOptionsComponent } from './../container-options/container-options.component';
import { SpinnerService } from './../../shared/service/spinner.service';
import { ContainerInfo, ContainerInspectInfo } from 'dockerode';
import { DockerService } from './../../shared/service/docker.service';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { AlertDialogComponent } from './../../shared/component/alert-dialog/alert-dialog.component';

export const State = {
  RUNNING: "running",
  WAITING: "waiting",
  EXITED: "exited",
}

@Component({
  selector: 'containers-component',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  containers = new Array<ContainerInfo>();

  constructor(public dockerService: DockerService, public dialog: MdDialog, public spinner: SpinnerService, private router: Router) {
    
  }

  ngOnInit() {
    this.onRefresh();
  }

  onStart(id: string, index: number) {
    this.containers[index].State = State.WAITING;
    this.dockerService.startContainer(id)
      .then((value: any) => {
        this.containers[index].State = State.RUNNING;
      })
      .catch((error: string) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.containers[index].State = State.EXITED;
      });
  }

  onStop(id: string, index: number) {
    this.containers[index].State = State.WAITING;
    this.dockerService.stopContainer(id)
      .then((value: any) => {
        this.containers[index].State = State.EXITED;
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.containers[index].State = State.RUNNING;
      });
  }

  onLogs(id: string) {
    console.log(this.dockerService.getContainer(id));
    this.dockerService.getContainerLogs(id, {stream:true, stdout: true, stderr: true})
      .then((v: NodeJS.ReadableStream) => {
        console.log(v);
        v.on("data", (v) => {
          console.log(v.toString('utf8'));
        });
        // v.pipe(process.stdout);
      // this.dockerService.getContainer(id).modem.demuxStream(v, process.stdout, process.stderr);

        // console.log(v);
        // console.log(v.read(1024));
        // v.pipe(process.stdout);
        // v.on('end', function(data) {
        //   console.log(data);
        //   console.log('finished');
        // });
      })
  }

  onRestart(id: string, index: number) {
    this.containers[index].State = State.WAITING;
    this.dockerService.restartContainer(id)
      .then((value: any) => {
        this.containers[index].State = State.RUNNING;
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.containers[index].State = State.RUNNING;
      });
  }

  onRemove(id: string, index: number) {
    this.containers[index].State = State.WAITING;
    this.dockerService.removeContainer(id, {force: this.containers[index].State = State.RUNNING })
      .then((value: any) => {
        this.containers.splice(index, 1);
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.containers[index].State = State.EXITED;
      });
  }

  onSettings(id: string, index: number) {
    let status = this.containers[index].State;
    this.containers[index].State = State.WAITING;
    this.dockerService.getContainerInspect(id)
      .then((v) => {
        sessionStorage.setItem("settingsContainer", JSON.stringify(v));
        this.router.navigate(["/containerOptions"]);
        this.containers[index].State = status;
      })
      .catch((error: String) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        this.containers[index].State = status;
      });
  }

  onRefresh(name?: string) {
    this.spinner.start();
    this.dockerService.getContainers().then((containers) => {
      this.containers = name ? containers.filter((v) => v.Names[0].indexOf(name) >= 0 ) : containers;
      this.sort();
      this.spinner.stop();
    });
  }

  private sort() {
    this.containers.sort((n1, n2) => n2.State.length - n1.State.length);
  }

}
