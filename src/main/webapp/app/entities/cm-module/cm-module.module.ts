import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmModuleService,
    CmModulePopupService,
    CmModuleComponent,
    CmModuleDetailComponent,
    CmModuleDialogComponent,
    CmModulePopupComponent,
    CmModuleDeletePopupComponent,
    CmModuleDeleteDialogComponent,
    cmModuleRoute,
    cmModulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...cmModuleRoute,
    ...cmModulePopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CmModuleComponent,
        CmModuleDetailComponent,
        CmModuleDialogComponent,
        CmModuleDeleteDialogComponent,
        CmModulePopupComponent,
        CmModuleDeletePopupComponent,
    ],
    entryComponents: [
        CmModuleComponent,
        CmModuleDialogComponent,
        CmModulePopupComponent,
        CmModuleDeleteDialogComponent,
        CmModuleDeletePopupComponent,
    ],
    providers: [
        CmModuleService,
        CmModulePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmModuleModule {}
