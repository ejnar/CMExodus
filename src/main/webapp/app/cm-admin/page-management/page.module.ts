import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';

import {
    PageComponent,
    pageRoute
} from './';

const PAGE_STATES = [
    ...pageRoute
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(PAGE_STATES)
    ],
    declarations: [
        PageComponent
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmPageModule {}
