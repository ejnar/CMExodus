import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmTopicCmService,
    CmTopicCmPopupService,
    CmTopicCmComponent,
    CmTopicCmDetailComponent,
    CmTopicCmDialogComponent,
    CmTopicCmPopupComponent,
    CmTopicCmDeletePopupComponent,
    CmTopicCmDeleteDialogComponent,
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
        CmTopicCmComponent,
        CmTopicCmDetailComponent,
        CmTopicCmDialogComponent,
        CmTopicCmDeleteDialogComponent,
        CmTopicCmPopupComponent,
        CmTopicCmDeletePopupComponent,
    ],
    entryComponents: [
        CmTopicCmComponent,
        CmTopicCmDialogComponent,
        CmTopicCmPopupComponent,
        CmTopicCmDeleteDialogComponent,
        CmTopicCmDeletePopupComponent,
    ],
    providers: [
        CmTopicCmService,
        CmTopicCmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmTopicCmModule {}
