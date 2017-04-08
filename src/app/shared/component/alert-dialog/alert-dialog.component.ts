import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-alert-dialog',
  template: `
    <h2 md-dialog-title color="primary">{{data.type}}</h2>
    <md-dialog-content>
      {{data.message}}  
    </md-dialog-content>
  `
  
})
export class AlertDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<AlertDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
  }

}
