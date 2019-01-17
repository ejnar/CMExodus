import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import { CmTopicService } from '../../entities/cm-topic/cm-topic.service';
import { CmSubTopicService } from '../../entities/cm-sub-topic/cm-sub-topic.service';
import {
    MenuComponent,
    SubMenuComponent,
    menuRoute
} from './';

const ENTITY_STATES = [
    ...menuRoute
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MenuComponent,
        SubMenuComponent
    ],
    entryComponents: [
        MenuComponent,
        SubMenuComponent
    ],
    providers: [
        CmTopicService,
        CmSubTopicService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmMenuModule {}
