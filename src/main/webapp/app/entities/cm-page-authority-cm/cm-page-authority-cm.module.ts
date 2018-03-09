import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmPageAuthorityCmService,
    CmPageAuthorityCmPopupService,
    CmPageAuthorityCmComponent,
    CmPageAuthorityCmDetailComponent,
    CmPageAuthorityCmDialogComponent,
    CmPageAuthorityCmPopupComponent,
    CmPageAuthorityCmDeletePopupComponent,
    CmPageAuthorityCmDeleteDialogComponent,
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
        CmPageAuthorityCmComponent,
        CmPageAuthorityCmDetailComponent,
        CmPageAuthorityCmDialogComponent,
        CmPageAuthorityCmDeleteDialogComponent,
        CmPageAuthorityCmPopupComponent,
        CmPageAuthorityCmDeletePopupComponent,
    ],
    entryComponents: [
        CmPageAuthorityCmComponent,
        CmPageAuthorityCmDialogComponent,
        CmPageAuthorityCmPopupComponent,
        CmPageAuthorityCmDeleteDialogComponent,
        CmPageAuthorityCmDeletePopupComponent,
    ],
    providers: [
        CmPageAuthorityCmService,
        CmPageAuthorityCmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmPageAuthorityCmModule {}
