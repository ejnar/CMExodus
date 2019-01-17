import { Component, Input, OnInit, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentInterface } from '../../../content/component-interface';

@Component({
    selector: 'jhi-main',
    templateUrl: './column.component.html'
})
export class ColumnRightComponent implements ComponentInterface, OnInit, OnDestroy {
    @ViewChild('main', {read: ViewContainerRef}) mainContainerRef: ViewContainerRef;
    @ViewChild('column', {read: ViewContainerRef}) columnContainerRef: ViewContainerRef;
    @Input() data: any;
    constructor( ) { }
    ngOnInit() { }
    ngOnDestroy() {
        this.mainContainerRef.clear();
        this.columnContainerRef.clear();
    }
}
