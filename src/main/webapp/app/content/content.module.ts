import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../shared';

import { contentRoute, ContentEngineComponent } from './';

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild([ contentRoute ])
    ],
    declarations: [
        ContentEngineComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusContentModule {}
