import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmSubTopicService,
    CmSubTopicPopupService,
    CmSubTopicComponent,
    CmSubTopicDetailComponent,
    CmSubTopicDialogComponent,
    CmSubTopicPopupComponent,
    CmSubTopicDeletePopupComponent,
    CmSubTopicDeleteDialogComponent,
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
        CmSubTopicComponent,
        CmSubTopicDetailComponent,
        CmSubTopicDialogComponent,
        CmSubTopicDeleteDialogComponent,
        CmSubTopicPopupComponent,
        CmSubTopicDeletePopupComponent,
    ],
    entryComponents: [
        CmSubTopicComponent,
        CmSubTopicDialogComponent,
        CmSubTopicPopupComponent,
        CmSubTopicDeleteDialogComponent,
        CmSubTopicDeletePopupComponent,
    ],
    providers: [
        CmSubTopicService,
        CmSubTopicPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmSubTopicModule {}
