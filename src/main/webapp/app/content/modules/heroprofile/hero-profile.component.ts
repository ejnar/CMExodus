import { Component, Input } from '@angular/core';

import { ComponentInterface } from './../../component-interface';

@Component({
    template: `
    <div class="hero-profile">
      <h3>Featured Hero Profile</h3>
      <h4>{{data.name}}</h4>
      <p>{{data.bio}}</p>
      <strong>Hire this hero today!</strong>
    </div>
    `,
    styleUrls: [
        'content.scss'
    ]

})
export class HeroProfileComponent implements ComponentInterface {
  @Input() data: any;
}
