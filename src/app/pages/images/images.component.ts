import { State } from './../containers/containers.component';
import { Subject } from 'rxjs/Subject';
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

  current = 0;

  images: Array<ImageInfo> = new Array<ImageInfo>();
  remoteImages: Array<any> = new Array<any>();

  constructor(private dockerService: DockerService, public dialog: MdDialog, public spinner: SpinnerService) { }

  ngOnInit() {
    this.refreshLocal();
  }

  //local

  tabChanged($event) {
    this.current = $event.index;
    switch ($event.index) {
      case 1:
        this.search({ "term": "linux" });
        break;

      default:
        this.refreshLocal();
        break;
    }
  }

  remove(item, i: number) {
    item.State = "waiting";
    this.dockerService.removeImage(item.RepoTags[0])
      .then((v) => {
        this.images.splice(i, 1);
      })
      .catch((error: string) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
      })
      .then(() => {
        item.State = "";
      });;
  }

  refreshLocal(name?: string) {
    this.images = new Array<ImageInfo>();
    this.spinner.start();
    this.dockerService.getImages().then((v) => {
      v.forEach((value) => {
        if (value.RepoTags.length > 1) {
          value.RepoTags.forEach((v) => {
            let clone = Object.assign({}, value);
            clone.RepoTags = [v];
            this.images.push(clone);
          });
        } else {
          this.images.push(value);
        }
      });
      //filter repotag
      if (name) {
        this.images = this.images.filter((v) => v.RepoTags[0].indexOf(name) >= 0);
      }
      this.spinner.stop();
    });
  }

  //remote

  search(options: {}) {
    if (!options["term"]) return;
    this.spinner.start();
    // if(!options["term"]) options["filters"] = '{"is-automated": ["true"]}';
    options["limit"] = 20;
    this.dockerService.searchImages(options).then(v => {
      this.remoteImages = v;
      this.remoteImages.sort((n1, n2) => n2.star_count - n1.star_count);
      this.spinner.stop();
    });

  }

  /**
   * pull image by name
   */
  pull(item: any) {
    item.State = "waiting";
    this.dockerService.pullImage(item["name"])
      .then((v) => {
        console.log(v);
        item.State = "";
      })
      .catch((error: string) => {
        this.dialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
      });
  }


}
