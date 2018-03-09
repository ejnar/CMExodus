import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmPageCmService,
    CmPageCmPopupService,
    CmPageCmComponent,
    CmPageCmDetailComponent,
    CmPageCmDialogComponent,
    CmPageCmPopupComponent,
    CmPageCmDeletePopupComponent,
    CmPageCmDeleteDialogComponent,
    cmPageRoute,
    cmPagePopupRoute,
    CmPageCmResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cmPageRoute,
    ...cmPagePopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmPageCmComponent,
        CmPageCmDetailComponent,
        CmPageCmDialogComponent,
        CmPageCmDeleteDialogComponent,
        CmPageCmPopupComponent,
        CmPageCmDeletePopupComponent,
    ],
    entryComponents: [
        CmPageCmComponent,
        CmPageCmDialogComponent,
        CmPageCmPopupComponent,
        CmPageCmDeleteDialogComponent,
        CmPageCmDeletePopupComponent,
    ],
    providers: [
        CmPageCmService,
        CmPageCmPopupService,
        CmPageCmResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmPageCmModule {}
