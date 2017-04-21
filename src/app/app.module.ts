import { ImageTagDialogComponent } from './pages/images/image-tag-dialog.component';
import { SpinnerService } from './shared/service/spinner.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'

import { FlexLayoutModule } from '@angular/flex-layout'

import 'hammerjs';
import { DockerService } from './shared/service/docker.service';
import { ContainersComponent } from './pages/containers/containers.component';
import { ImagesComponent } from './pages/images/images.component';
import { LengthPipe } from './shared/length.pipe';
import { AlertDialogComponent } from './shared/component/alert-dialog/alert-dialog.component';
import { LayerComponent } from './shared/component/layer/layer.component';
import { ContainerOptionsComponent } from './pages/container-options/container-options.component';
import { ContainerLogsComponent } from './pages/container-logs/container-logs.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainersComponent,
    ImagesComponent,
    ImageTagDialogComponent,
    LengthPipe,
    AlertDialogComponent,
    LayerComponent,
    ContainerOptionsComponent,
    ContainerLogsComponent,
    HomeComponent
  ],
  imports: [
    RouterModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ContainerOptionsComponent,
    ImageTagDialogComponent
  ],
  providers: [DockerService, SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
