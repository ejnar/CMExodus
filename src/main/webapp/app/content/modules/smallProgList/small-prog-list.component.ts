import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ComponentInterface } from './../../component-interface';

@Component({
    templateUrl: './small-prog-list.component.html',
    styleUrls: [
        'small-prog-list.scss'
    ]
})
export class SmallProgListComponent implements OnInit, ComponentInterface {
  @Input() data: any;

  constructor(private logger: NGXLogger ) {}

  ngOnInit() {

  }
}
