import { DockerService } from './shared/Docker.service';
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
import { ContainersComponent } from './pages/containers/containers.component';
import { ContainersLayoutComponent } from './pages/containers/containers-layer.component'

@NgModule({
  declarations: [
    AppComponent,
    ContainersComponent,
    ContainersLayoutComponent
  ],
  imports: [
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
