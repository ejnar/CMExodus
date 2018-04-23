import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CmPageModule } from './page-management/page.module';

@NgModule({
    imports: [
        CmPageModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusAdministrationModule {}
