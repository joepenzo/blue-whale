import { ImageInfo, ImageInspectInfo } from 'dockerode';
import { DockerService } from './../../shared/Docker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images: Array<ImageInfo> = new Array<ImageInfo>();

  constructor(private dockerService: DockerService) { }

  ngOnInit() {
    // this.dockerService.searchImages("mysql").then(v => {
    //   console.log(v);
    // });
this.dockerService.getInfo().then((v) => {
  console.log(v);
});

this.dockerService.getVersion().then((v) => {
  console.log(v);
});
    this.dockerService.getImages().then((v) => {
      console.log(v);
      this.images = v;
    });
  }



}
