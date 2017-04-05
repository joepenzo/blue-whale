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
import { DockerService } from './shared/Docker.service';
import { ContainersComponent } from './pages/containers/containers.component';
import { ContainersLayoutComponent } from './pages/containers/containers-layer.component';
import { ImagesComponent } from './pages/images/images.component';
import { LengthPipe } from './shared/Length.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContainersComponent,
    ContainersLayoutComponent,
    ImagesComponent,
    LengthPipe
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
  providers: [DockerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
