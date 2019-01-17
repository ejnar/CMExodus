import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import {
    CmUploadService
} from './';

@NgModule({
    imports: [
        CmExodusSharedModule,
    ],
    declarations: [
    ],
    entryComponents: [
    ],
    providers: [
        CmUploadService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusCmUploadModule {}
