import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmItemService,
    CmItemPopupService,
    CmItemComponent,
    CmItemDetailComponent,
    CmItemDialogComponent,
    CmItemPopupComponent,
    CmItemDeletePopupComponent,
    CmItemDeleteDialogComponent,
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
        CmItemComponent,
        CmItemDetailComponent,
        CmItemDialogComponent,
        CmItemDeleteDialogComponent,
        CmItemPopupComponent,
        CmItemDeletePopupComponent,
    ],
    entryComponents: [
        CmItemComponent,
        CmItemDialogComponent,
        CmItemPopupComponent,
        CmItemDeleteDialogComponent,
        CmItemDeletePopupComponent,
    ],
    providers: [
        CmItemService,
        CmItemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmItemModule {}
