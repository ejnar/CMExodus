import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmTopicService,
    CmTopicPopupService,
    CmTopicComponent,
    CmTopicDetailComponent,
    CmTopicDialogComponent,
    CmTopicPopupComponent,
    CmTopicDeletePopupComponent,
    CmTopicDeleteDialogComponent,
    cmTopicRoute,
    cmTopicPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cmTopicRoute,
    ...cmTopicPopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmTopicComponent,
        CmTopicDetailComponent,
        CmTopicDialogComponent,
        CmTopicDeleteDialogComponent,
        CmTopicPopupComponent,
        CmTopicDeletePopupComponent,
    ],
    entryComponents: [
        CmTopicComponent,
        CmTopicDialogComponent,
        CmTopicPopupComponent,
        CmTopicDeleteDialogComponent,
        CmTopicDeletePopupComponent,
    ],
    providers: [
        CmTopicService,
        CmTopicPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmTopicModule {}
