import { Injectable } from '@angular/core';

import { HeroJobContentComponent } from './hero-job-content.component';
import { HeroProfileComponent } from './hero-profile.component';
import { ContentItem } from './content-item';

@Injectable()
export class ContentService {
  getContent() {
    return [
      new ContentItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),

      new ContentItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),

      new ContentItem(HeroJobContentComponent,   {headline: 'Hiring for several positions',
                                        body: 'Submit your resume today!'}),

      new ContentItem(HeroJobContentComponent,   {headline: 'Openings in all departments',
                                        body: 'Apply today'}),
    ];
  }
}
