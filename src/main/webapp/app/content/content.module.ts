import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../shared';

import { ContentComponent } from './content.component';
import { ContentService } from './content.service';
import { ContentDirective } from './content.directive';
import { HeroJobContentComponent } from './hero-job-content.component';
import { HeroProfileComponent } from './hero-profile.component';
import { ContentEngineComponent } from './content-engine.component';
import { contentRoute } from './content.route';

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild([ contentRoute ])
    ],
    declarations: [
        ContentDirective,
        ContentComponent,
        HeroJobContentComponent,
        HeroProfileComponent,
        ContentEngineComponent,
    ],
    entryComponents: [
        HeroJobContentComponent, HeroProfileComponent
    ],
    providers: [
        ContentService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusContentModule {}
