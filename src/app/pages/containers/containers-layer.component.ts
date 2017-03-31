import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'containers-layout',
    template: `
        <div style="position: relative; z-index: 1; height: 160px; margin-top: -160px; background-color: gray; opacity: 0.4"></div>
        <md-progress-bar mode='indeterminate' color='accent'></md-progress-bar>
    `
})
export class ContainersLayoutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}