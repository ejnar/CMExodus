import { Component, Input, OnInit, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentInterface } from '../../component-interface';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class MainComponent implements ComponentInterface, OnInit, OnDestroy {
    @ViewChild('main', {read: ViewContainerRef}) mainContainerRef: ViewContainerRef;
    @Input() data: any;
    constructor( ) { }
    ngOnInit() { }
    ngOnDestroy() {
        this.mainContainerRef.clear();
    }
}
