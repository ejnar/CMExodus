import { Component, Input } from '@angular/core';

import { ContentComponent } from './content.component';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{data.headline}}</h4>

      {{data.body}}
    </div>
  `
})
export class HeroJobAdComponent implements ContentComponent {
  @Input() data: any;

}
