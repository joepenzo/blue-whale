import { ImageTagDialogComponent } from './image-tag-dialog.component';
import { Router } from '@angular/router';
import { State } from './../containers/containers.component';
import { Subject } from 'rxjs/Subject';
import { SpinnerService } from './../../shared/service/spinner.service';
import { AlertDialogComponent } from './../../shared/component/alert-dialog/alert-dialog.component';
import { ImageInfo, ImageInspectInfo } from 'dockerode';
import { DockerService } from './../../shared/service/docker.service';
import { MdDialog } from '@angular/material';
import { Component, OnInit, Pipe, enableProdMode } from '@angular/core';

const { dialog } = require('electron').remote
var fs = require('fs')

//http://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  current = 0;
  local = true;
  images: Array<ImageInfo> = new Array<ImageInfo>();
  remoteImages: Array<any> = new Array<any>();

  constructor(private dockerService: DockerService, public mdDialog: MdDialog, public spinner: SpinnerService, private router: Router) { }

  ngOnInit() {
    this.onRefreshLocal();
  }

  //local

  onTabChanged($event) {
    this.current = $event.index;
    switch ($event.index) {
      case 1:
        this.local = false;
        this.onSearch({ "term": "linux" });
        break;

      default:
        this.local = true;
        this.onRefreshLocal();
        break;
    }
  }

  onRemove(item, i: number) {
    item.State = "waiting";
    this.dockerService.removeImage(item.RepoTags[0])
      .then((v) => {
        this.images.splice(i, 1);
      })
      .catch((error: string) => {
        this.mdDialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
      })
      .then(() => {
        item.State = "";
      });;
  }

  onRefreshLocal(name?: string) {
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

  onCreateContainer(item) {
    item.State = "waiting";
    this.dockerService.createContainer({
      Image: item.RepoTags[0],
      AttachStdout: true,
      AttachStderr: true,
      Tty: true
    })
      .then((v) => {
        item.State = "";
        this.router.navigate(["containers"]);
      })
      .catch((error: string) => {
        this.mdDialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
        item.State = "";
      });
  }

  onTag(item) {
    let state = item.State;
    item.State = "waiting";
    this.mdDialog.open(ImageTagDialogComponent, { data: {} }).afterClosed().subscribe((v) => {
      if (!v) {
        item.State = state;
        return;
      }
      this.dockerService.tagImage(item.RepoTags[0], v)
        .then((v) => {
          item.State = state;
          this.onRefreshLocal();
        })
        .catch((error: string) => {
          this.mdDialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
          item.State = "";
        });
    });
  }

  onExport(item) {
    let state = item.State;
    item.State = "waiting";
    dialog.showSaveDialog((v) => {
      if (!v) {
        item.State = state;
        return;
      }

      this.dockerService.getImageStream(item.RepoTags[0])
        .then((stream: NodeJS.ReadableStream) => {
          var writeStream = fs.createWriteStream(v);
          //write strem to file
          stream.on("data", (v) => {
            writeStream.write(v);
          })

          stream.on("end", (v) => {
            item.State = state;
            writeStream.close();
          })

          writeStream.on('error', (error) => {
            this.mdDialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
            item.State = "";
          });
        })
        .catch((error: string) => {
          this.mdDialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
          item.State = "";
        });
    })

  }

  onImport() {
    this.spinner.start();
    dialog.showOpenDialog({ filters: [{ name: '*.tar', extensions: ['tar'] }] }, (v) => {
      if (!v) {
        this.spinner.stop();
        return;
      }

      this.dockerService.loadImage(v[0], {})
        .then((v) => {
          this.onRefreshLocal();
          this.spinner.stop();
        })
        .catch((error: string) => {
          this.mdDialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
          this.spinner.stop();
        });
    });
  }

  //remote

  onSearch(options: {}) {
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
  onPull(item: any) {
    item.State = "waiting";
    this.dockerService.pullImage(item["name"])
      .then((v) => {
        item.State = "";
      })
      .catch((error: string) => {
        this.mdDialog.open(AlertDialogComponent, { data: { type: "warning", message: error } });
      });
  }


}
