import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmItemListCmService,
    CmItemListCmPopupService,
    CmItemListCmComponent,
    CmItemListCmDetailComponent,
    CmItemListCmDialogComponent,
    CmItemListCmPopupComponent,
    CmItemListCmDeletePopupComponent,
    CmItemListCmDeleteDialogComponent,
    cmItemListRoute,
    cmItemListPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cmItemListRoute,
    ...cmItemListPopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmItemListCmComponent,
        CmItemListCmDetailComponent,
        CmItemListCmDialogComponent,
        CmItemListCmDeleteDialogComponent,
        CmItemListCmPopupComponent,
        CmItemListCmDeletePopupComponent,
    ],
    entryComponents: [
        CmItemListCmComponent,
        CmItemListCmDialogComponent,
        CmItemListCmPopupComponent,
        CmItemListCmDeleteDialogComponent,
        CmItemListCmDeletePopupComponent,
    ],
    providers: [
        CmItemListCmService,
        CmItemListCmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmItemListCmModule {}
