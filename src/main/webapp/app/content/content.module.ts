import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../shared';

import { ContentComponent } from './content.component';
import { ContentService } from './content.service';
import { ContentDirective } from './content.directive';
import { ContentEngineComponent } from './content-engine.component';
import { contentRoute } from './content.route';

import { MainComponent } from './main.component';

import { ProgramListComponent } from './modules/programList/program-list.component';
import { TextComponent } from './modules/text/text.component';
import { TextImageComponent } from './modules/textImage/text-image.component';

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild([ contentRoute ])
    ],
    declarations: [
        ContentDirective,
        ContentComponent,
        MainComponent,
        ProgramListComponent,
        TextComponent,
        TextImageComponent,
        ContentEngineComponent,
    ],
    entryComponents: [
        MainComponent, ProgramListComponent, TextComponent, TextImageComponent
    ],
    providers: [
        ContentService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusContentModule {}
