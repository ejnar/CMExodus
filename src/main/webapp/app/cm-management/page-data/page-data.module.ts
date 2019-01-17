import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';

import {
    PageDataComponent,
    pageDataRoute,
    pageDataPopupRoute

} from './';

const PAGE_STATES = [
    ...pageDataRoute,
    ...pageDataPopupRoute
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(PAGE_STATES)
    ],
    declarations: [
        PageDataComponent

    ],
    entryComponents: [
        PageDataComponent
    ],
    // providers: [
    //    PageDataPopupService
    // ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmPageDataModule {}
