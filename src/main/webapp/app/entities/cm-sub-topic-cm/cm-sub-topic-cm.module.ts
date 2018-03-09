import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmSubTopicCmService,
    CmSubTopicCmPopupService,
    CmSubTopicCmComponent,
    CmSubTopicCmDetailComponent,
    CmSubTopicCmDialogComponent,
    CmSubTopicCmPopupComponent,
    CmSubTopicCmDeletePopupComponent,
    CmSubTopicCmDeleteDialogComponent,
    cmSubTopicRoute,
    cmSubTopicPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cmSubTopicRoute,
    ...cmSubTopicPopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmSubTopicCmComponent,
        CmSubTopicCmDetailComponent,
        CmSubTopicCmDialogComponent,
        CmSubTopicCmDeleteDialogComponent,
        CmSubTopicCmPopupComponent,
        CmSubTopicCmDeletePopupComponent,
    ],
    entryComponents: [
        CmSubTopicCmComponent,
        CmSubTopicCmDialogComponent,
        CmSubTopicCmPopupComponent,
        CmSubTopicCmDeleteDialogComponent,
        CmSubTopicCmDeletePopupComponent,
    ],
    providers: [
        CmSubTopicCmService,
        CmSubTopicCmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmSubTopicCmModule {}
