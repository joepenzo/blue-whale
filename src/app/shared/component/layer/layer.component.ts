import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'layer',
    template: `
        <div style="position: relative; z-index: 1; background-color: gray; opacity: 0.4" [style.height]="layerHeight" [style.margin-top]="marginTop"></div>
        <md-progress-bar mode='indeterminate' color='accent'></md-progress-bar>
    `
})
export class LayerComponent implements OnInit {
    @Input() height = 0;

    marginTop = "0px";
    layerHeight = "0px";

    constructor() {}

    ngOnInit() { 
        this.layerHeight = this.height + "px";
        this.marginTop = -this.height + "px";
    }

}