import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmImageCmService,
    CmImageCmPopupService,
    CmImageCmComponent,
    CmImageCmDetailComponent,
    CmImageCmDialogComponent,
    CmImageCmPopupComponent,
    CmImageCmDeletePopupComponent,
    CmImageCmDeleteDialogComponent,
    cmImageRoute,
    cmImagePopupRoute,
    CmImageCmResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cmImageRoute,
    ...cmImagePopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmImageCmComponent,
        CmImageCmDetailComponent,
        CmImageCmDialogComponent,
        CmImageCmDeleteDialogComponent,
        CmImageCmPopupComponent,
        CmImageCmDeletePopupComponent,
    ],
    entryComponents: [
        CmImageCmComponent,
        CmImageCmDialogComponent,
        CmImageCmPopupComponent,
        CmImageCmDeleteDialogComponent,
        CmImageCmDeletePopupComponent,
    ],
    providers: [
        CmImageCmService,
        CmImageCmPopupService,
        CmImageCmResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmImageCmModule {}
