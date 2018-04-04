import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../shared';

import { ContentComponent } from './content.component';
import { ContentService } from './content.service';
import { ContentDirective } from './content.directive';
import { ContentEngineComponent } from './content-engine.component';
import { contentRoute } from './content.route';

import { HeroJobContentComponent } from './modules/herojob/hero-job-content.component';
import { HeroProfileComponent } from './modules/heroprofile/hero-profile.component';
import { ProgramListComponent } from './modules/programList/program-list.component';

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
        ProgramListComponent,
        ContentEngineComponent,
    ],
    entryComponents: [
        HeroJobContentComponent, HeroProfileComponent, ProgramListComponent
    ],
    providers: [
        ContentService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusContentModule {}
