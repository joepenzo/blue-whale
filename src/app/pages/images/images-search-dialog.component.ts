import { Component, OnInit, Inject, HostListener, ViewChild, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    template: `
    <form>
        <md-input-container>
        <input mdInput [(ngModel)]="name" name="name" placeholder="name">
        <!-- <md-icon mdPrefix svgIcon="docker-logo"></md-icon> -->
        </md-input-container>
    </form>
    <div fxLayout="row" fxLayoutAlign="center end">
        <button md-button  (click)="dialogRef.close()">Close</button>
        <button md-button  (click)="dialogRef.close(name)">Search</button>
    </div>
  `
})
export class ImagesSearchDialogComponent implements OnInit {

    name = null;

    constructor(public dialogRef: MdDialogRef<ImagesSearchDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {

    }

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        if(event.key == "Enter" && this.name) {
            this.dialogRef.close(this.name);
        }
    }

}
