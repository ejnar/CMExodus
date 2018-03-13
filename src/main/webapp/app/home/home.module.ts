import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../shared';

import { homeRoute, HomeComponent } from './';

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild([ homeRoute ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusHomeModule {}
