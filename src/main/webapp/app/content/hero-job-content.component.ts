import { Component, Input } from '@angular/core';

import { ComponentInterface } from './component-interface';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{data.headline}}</h4>

      {{data.body}}
    </div>
  `
})
export class HeroJobContentComponent implements ComponentInterface {
  @Input() data: any;

}
