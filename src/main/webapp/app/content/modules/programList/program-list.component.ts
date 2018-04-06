import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ComponentInterface } from './../../component-interface';

@Component({
    templateUrl: './program-list.component.html',
    styleUrls: [
        'content.scss'
    ]
})
export class ProgramListComponent implements OnInit, ComponentInterface {
  @Input() data: any;

  constructor(private logger: NGXLogger ) {}

  ngOnInit() {

  }
}
