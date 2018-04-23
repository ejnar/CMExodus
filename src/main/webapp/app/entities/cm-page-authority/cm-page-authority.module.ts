import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmPageAuthorityService,
    CmPageAuthorityPopupService,
    CmPageAuthorityComponent,
    CmPageAuthorityDetailComponent,
    CmPageAuthorityDialogComponent,
    CmPageAuthorityPopupComponent,
    CmPageAuthorityDeletePopupComponent,
    CmPageAuthorityDeleteDialogComponent,
    cmPageAuthorityRoute,
    cmPageAuthorityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cmPageAuthorityRoute,
    ...cmPageAuthorityPopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmPageAuthorityComponent,
        CmPageAuthorityDetailComponent,
        CmPageAuthorityDialogComponent,
        CmPageAuthorityDeleteDialogComponent,
        CmPageAuthorityPopupComponent,
        CmPageAuthorityDeletePopupComponent,
    ],
    entryComponents: [
        CmPageAuthorityComponent,
        CmPageAuthorityDialogComponent,
        CmPageAuthorityPopupComponent,
        CmPageAuthorityDeleteDialogComponent,
        CmPageAuthorityDeletePopupComponent,
    ],
    providers: [
        CmPageAuthorityService,
        CmPageAuthorityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmPageAuthorityModule {}
