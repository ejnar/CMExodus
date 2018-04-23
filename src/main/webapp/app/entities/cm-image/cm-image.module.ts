import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmImageService,
    CmImagePopupService,
    CmImageComponent,
    CmImageDetailComponent,
    CmImageDialogComponent,
    CmImagePopupComponent,
    CmImageDeletePopupComponent,
    CmImageDeleteDialogComponent,
    cmImageRoute,
    cmImagePopupRoute,
    CmImageResolvePagingParams,
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
        CmImageComponent,
        CmImageDetailComponent,
        CmImageDialogComponent,
        CmImageDeleteDialogComponent,
        CmImagePopupComponent,
        CmImageDeletePopupComponent,
    ],
    entryComponents: [
        CmImageComponent,
        CmImageDialogComponent,
        CmImagePopupComponent,
        CmImageDeleteDialogComponent,
        CmImageDeletePopupComponent,
    ],
    providers: [
        CmImageService,
        CmImagePopupService,
        CmImageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmImageModule {}
