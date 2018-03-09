import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmPortalCmService,
    CmPortalCmPopupService,
    CmPortalCmComponent,
    CmPortalCmDetailComponent,
    CmPortalCmDialogComponent,
    CmPortalCmPopupComponent,
    CmPortalCmDeletePopupComponent,
    CmPortalCmDeleteDialogComponent,
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
        CmPortalCmComponent,
        CmPortalCmDetailComponent,
        CmPortalCmDialogComponent,
        CmPortalCmDeleteDialogComponent,
        CmPortalCmPopupComponent,
        CmPortalCmDeletePopupComponent,
    ],
    entryComponents: [
        CmPortalCmComponent,
        CmPortalCmDialogComponent,
        CmPortalCmPopupComponent,
        CmPortalCmDeleteDialogComponent,
        CmPortalCmDeletePopupComponent,
    ],
    providers: [
        CmPortalCmService,
        CmPortalCmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmPortalCmModule {}
