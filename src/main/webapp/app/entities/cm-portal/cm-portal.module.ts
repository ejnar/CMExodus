import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmPortalService,
    CmPortalPopupService,
    CmPortalComponent,
    CmPortalDetailComponent,
    CmPortalDialogComponent,
    CmPortalPopupComponent,
    CmPortalDeletePopupComponent,
    CmPortalDeleteDialogComponent,
    cmPortalRoute,
    cmPortalPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cmPortalRoute,
    ...cmPortalPopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmPortalComponent,
        CmPortalDetailComponent,
        CmPortalDialogComponent,
        CmPortalDeleteDialogComponent,
        CmPortalPopupComponent,
        CmPortalDeletePopupComponent,
    ],
    entryComponents: [
        CmPortalComponent,
        CmPortalDialogComponent,
        CmPortalPopupComponent,
        CmPortalDeleteDialogComponent,
        CmPortalDeletePopupComponent,
    ],
    providers: [
        CmPortalService,
        CmPortalPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmPortalModule {}
