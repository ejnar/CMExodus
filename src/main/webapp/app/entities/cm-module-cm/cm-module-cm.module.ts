import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmModuleCmService,
    CmModuleCmPopupService,
    CmModuleCmComponent,
    CmModuleCmDetailComponent,
    CmModuleCmDialogComponent,
    CmModuleCmPopupComponent,
    CmModuleCmDeletePopupComponent,
    CmModuleCmDeleteDialogComponent,
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
        CmModuleCmComponent,
        CmModuleCmDetailComponent,
        CmModuleCmDialogComponent,
        CmModuleCmDeleteDialogComponent,
        CmModuleCmPopupComponent,
        CmModuleCmDeletePopupComponent,
    ],
    entryComponents: [
        CmModuleCmComponent,
        CmModuleCmDialogComponent,
        CmModuleCmPopupComponent,
        CmModuleCmDeleteDialogComponent,
        CmModuleCmDeletePopupComponent,
    ],
    providers: [
        CmModuleCmService,
        CmModuleCmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmModuleCmModule {}
