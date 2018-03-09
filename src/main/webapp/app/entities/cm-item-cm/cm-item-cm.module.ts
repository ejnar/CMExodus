import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmItemCmService,
    CmItemCmPopupService,
    CmItemCmComponent,
    CmItemCmDetailComponent,
    CmItemCmDialogComponent,
    CmItemCmPopupComponent,
    CmItemCmDeletePopupComponent,
    CmItemCmDeleteDialogComponent,
    cmItemRoute,
    cmItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cmItemRoute,
    ...cmItemPopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmItemCmComponent,
        CmItemCmDetailComponent,
        CmItemCmDialogComponent,
        CmItemCmDeleteDialogComponent,
        CmItemCmPopupComponent,
        CmItemCmDeletePopupComponent,
    ],
    entryComponents: [
        CmItemCmComponent,
        CmItemCmDialogComponent,
        CmItemCmPopupComponent,
        CmItemCmDeleteDialogComponent,
        CmItemCmDeletePopupComponent,
    ],
    providers: [
        CmItemCmService,
        CmItemCmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmItemCmModule {}
