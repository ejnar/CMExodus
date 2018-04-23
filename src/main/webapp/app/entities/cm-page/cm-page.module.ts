import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmPageService,
    CmPagePopupService,
    CmPageComponent,
    CmPageDetailComponent,
    CmPageDialogComponent,
    CmPagePopupComponent,
    CmPageDeletePopupComponent,
    CmPageDeleteDialogComponent,
    cmPageRoute,
    cmPagePopupRoute,
    CmPageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cmPageRoute,
    ...cmPagePopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmPageComponent,
        CmPageDetailComponent,
        CmPageDialogComponent,
        CmPageDeleteDialogComponent,
        CmPagePopupComponent,
        CmPageDeletePopupComponent,
    ],
    entryComponents: [
        CmPageComponent,
        CmPageDialogComponent,
        CmPagePopupComponent,
        CmPageDeleteDialogComponent,
        CmPageDeletePopupComponent,
    ],
    providers: [
        CmPageService,
        CmPagePopupService,
        CmPageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmPageModule {}
