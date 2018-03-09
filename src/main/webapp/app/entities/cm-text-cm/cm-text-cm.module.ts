import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmTextCmService,
    CmTextCmPopupService,
    CmTextCmComponent,
    CmTextCmDetailComponent,
    CmTextCmDialogComponent,
    CmTextCmPopupComponent,
    CmTextCmDeletePopupComponent,
    CmTextCmDeleteDialogComponent,
    cmTextRoute,
    cmTextPopupRoute,
    CmTextCmResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cmTextRoute,
    ...cmTextPopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmTextCmComponent,
        CmTextCmDetailComponent,
        CmTextCmDialogComponent,
        CmTextCmDeleteDialogComponent,
        CmTextCmPopupComponent,
        CmTextCmDeletePopupComponent,
    ],
    entryComponents: [
        CmTextCmComponent,
        CmTextCmDialogComponent,
        CmTextCmPopupComponent,
        CmTextCmDeleteDialogComponent,
        CmTextCmDeletePopupComponent,
    ],
    providers: [
        CmTextCmService,
        CmTextCmPopupService,
        CmTextCmResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmTextCmModule {}
