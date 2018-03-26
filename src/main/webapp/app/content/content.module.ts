import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../shared';

import { contentRoute, ContentComponent } from './';

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild([ contentRoute ])
    ],
    declarations: [
        ContentComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusContentModule {}
