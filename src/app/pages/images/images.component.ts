import { AlertDialogComponent } from './../../shared/alert-dialog.component';
import { ImageInfo, ImageInspectInfo } from 'dockerode';
import { DockerService } from './../../shared/Docker.service';
import { MdDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images: Array<ImageInfo> = new Array<ImageInfo>();

  constructor(private dockerService: DockerService, public dialog: MdDialog) { }

  ngOnInit() {
    // this.dockerService.searchImages("mysql").then(v => {
    //   console.log(v);
    // });
    // this.dockerService.getInfo().then((v) => {
    //   console.log(v);
    // });

    // this.dockerService.getVersion().then((v) => {
    //   console.log(v);
    // });
    this.refresh();
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

  refresh() {
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
    });
  }



}
