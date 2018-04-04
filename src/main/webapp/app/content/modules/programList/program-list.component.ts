import { Component, Input } from '@angular/core';

import { ComponentInterface } from './../../component-interface';

@Component({
    template: `
    <div class="program_list">
      <h3>Program</h3>
      <h4>{{data.name}}</h4>
    </div>
    `,
    styleUrls: [
        'content.scss'
    ]

})
export class ProgramListComponent implements ComponentInterface {
  @Input() data: any;
}
