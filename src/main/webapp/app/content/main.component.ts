import { Component, Input, OnInit } from '@angular/core';
import { ComponentInterface } from './component-interface';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class MainComponent implements ComponentInterface, OnInit {
    @Input() data: any;
    constructor( ) { }

    ngOnInit() {
        console.log('HomeComponent.ngOnInit');

    }
}
