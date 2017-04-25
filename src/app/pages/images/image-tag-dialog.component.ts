import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <h2 md-dialog-title color="primary">Tag an image so that it becomes part of a repository.</h2>
    <md-dialog-content>
        <md-input-container style="width: 100%;">
          <input mdInput i18n-placeholder="repository" placeholder="Repository" #repo require>
        </md-input-container>
        <md-input-container style="width: 100%;">
          <input mdInput i18n-placeholder="tag" placeholder="Tag" #tag require>
        </md-input-container>
      <div fxLayout="row" fxLayoutAlign="end end">
        <button md-icon-button title="Close" [disabled]="!repo.value || !tag.value" (click)="dialogRef.close({repo: repo.value, tag: tag.value})">
          <md-icon>done</md-icon>
        </button>
      </div>
    </md-dialog-content>
  `

})
export class ImageTagDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<ImageTagDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
