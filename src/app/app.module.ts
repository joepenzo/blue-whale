import { ImagesSearchDialogComponent } from './pages/images/images-search-dialog.component';
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

@NgModule({
  declarations: [
    AppComponent,
    ContainersComponent,
    ImagesComponent,
    LengthPipe,
    AlertDialogComponent,
    LayerComponent,
    ImagesSearchDialogComponent
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
    ImagesSearchDialogComponent
  ],
  providers: [DockerService, SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
