import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmItemListService,
    CmItemListPopupService,
    CmItemListComponent,
    CmItemListDetailComponent,
    CmItemListDialogComponent,
    CmItemListPopupComponent,
    CmItemListDeletePopupComponent,
    CmItemListDeleteDialogComponent,
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
        CmItemListComponent,
        CmItemListDetailComponent,
        CmItemListDialogComponent,
        CmItemListDeleteDialogComponent,
        CmItemListPopupComponent,
        CmItemListDeletePopupComponent,
    ],
    entryComponents: [
        CmItemListComponent,
        CmItemListDialogComponent,
        CmItemListPopupComponent,
        CmItemListDeleteDialogComponent,
        CmItemListDeletePopupComponent,
    ],
    providers: [
        CmItemListService,
        CmItemListPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmItemListModule {}
