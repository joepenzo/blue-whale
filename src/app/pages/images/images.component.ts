import { SpinnerService } from './../../shared/service/spinner.service';
import { AlertDialogComponent } from './../../shared/component/alert-dialog/alert-dialog.component';
import { ImageInfo, ImageInspectInfo } from 'dockerode';
import { DockerService } from './../../shared/service/docker.service';
import { MdDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images: Array<ImageInfo> = new Array<ImageInfo>();
  remoteImages: Array<any> = new Array<any>();

  constructor(private dockerService: DockerService, public dialog: MdDialog, public spinner: SpinnerService) { }

  ngOnInit() {
    this.refreshLocal();
  }

  remove(item, i: number) {
    item.State = "waiting";
    this.dockerService.removeImage(item.RepoTags[0])
    .then((v) => {
      this.images.splice(i, 1);
    })
    .catch((error: string) => {
      this.dialog.open(AlertDialogComponent, {data: {type:"warning", message: error}});
    })
    .then(() => {
      item.State = "";
    });;
  }

  tabChanged($event) {
    switch ($event.index) {
      case 1:
        this.search({});
        break;
    
      default:
        this.refreshLocal();
        break;
    }
  }

  search(options: {}) {
    this.spinner.start();
    // if(!options["term"]) options["filters"] = '{"is-automated": ["true"]}';
    options["term"] = 'mysql';
    // options["limit"] = 100;
    this.dockerService.searchImages(options).then(v => {
      console.log(v);
      this.remoteImages = v;
      this.spinner.stop();
    });

  }

  refreshLocal() {
    this.spinner.start();
    this.dockerService.getImages().then((v) => {
      v.forEach((value) => {
        if(value.RepoTags.length > 1) {
          value.RepoTags.forEach((v) => {
            let clone = Object.assign({}, value);
            clone.RepoTags = [v];
            this.images.push(clone);
          });
        } else {
          this.images.push(value);
        }
      });
      this.spinner.stop();
    });
  }



}
