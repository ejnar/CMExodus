import { Component, Input } from '@angular/core';

import { ComponentInterface } from '../../component-interface';

@Component({
    template: `
    <div class="job-ad">
      <h4>{{data.headline}}</h4>

      {{data.body}}
    </div>
    `,
    styleUrls: [
        'content.scss'
    ]
})
export class HeroJobContentComponent implements ComponentInterface {
  @Input() data: any;

}
