import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';

// import { CmPageAuthorityService } from '../../entities/cm-page-authority/cm-page-authority.module';

import {
    PageAuthorityPopupService,
    PageAuthorityDialogComponent,
    PageAuthorityPopupComponent,
    pageAuthorityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pageAuthorityPopupRoute,
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PageAuthorityDialogComponent,
        PageAuthorityPopupComponent,
    ],
    entryComponents: [
        PageAuthorityDialogComponent,
        PageAuthorityPopupComponent,
    ],
    providers: [
        PageAuthorityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageAuthorityModule {}
