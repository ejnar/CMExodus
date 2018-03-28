import { Injectable } from '@angular/core';

import { HeroJobAdComponent } from './hero-job-content.component';
import { HeroProfileComponent } from './hero-profile.component';
import { ContentItem } from './content-item';

@Injectable()
export class ContentService {
  getAds() {
    return [
      new ContentItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),

      new ContentItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),

      new ContentItem(HeroJobAdComponent,   {headline: 'Hiring for several positions',
                                        body: 'Submit your resume today!'}),

      new ContentItem(HeroJobAdComponent,   {headline: 'Openings in all departments',
                                        body: 'Apply today'}),
    ];
  }
}
