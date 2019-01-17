import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CmPageModule } from './page/page.module';
import { CmMenuModule } from './menu/menu.module';
import { PageAuthorityModule } from './page-authority/page-authority.module';

@NgModule({
    imports: [
        CmPageModule,
        CmMenuModule,
        PageAuthorityModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusAdministrationModule {}
