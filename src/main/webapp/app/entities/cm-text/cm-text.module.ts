import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmTextService,
    CmTextPopupService,
    CmTextComponent,
    CmTextDetailComponent,
    CmTextDialogComponent,
    CmTextPopupComponent,
    CmTextDeletePopupComponent,
    CmTextDeleteDialogComponent,
    cmTextRoute,
    cmTextPopupRoute,
    CmTextResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cmTextRoute,
    ...cmTextPopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmTextComponent,
        CmTextDetailComponent,
        CmTextDialogComponent,
        CmTextDeleteDialogComponent,
        CmTextPopupComponent,
        CmTextDeletePopupComponent,
    ],
    entryComponents: [
        CmTextComponent,
        CmTextDialogComponent,
        CmTextPopupComponent,
        CmTextDeleteDialogComponent,
        CmTextDeletePopupComponent,
    ],
    providers: [
        CmTextService,
        CmTextPopupService,
        CmTextResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmTextModule {}
