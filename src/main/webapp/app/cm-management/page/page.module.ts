import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../../shared';
import { CmPageService } from '../../entities/cm-page/cm-page.service';

import {
    ExtendedPageService,
    PageComponent,
    PageEditComponent,
    PagePopupService,
    PagePopupComponent,
    PageDialogComponent,
    PageDeletePopupComponent,
    PageDeleteDialogComponent,
    ModulePopupComponent,
    ModuleDialogComponent,
    pagePopupRoute,
    pageRoute,
    PageResolvePagingParams
} from './';

const PAGE_STATES = [
    ...pageRoute,
    ...pagePopupRoute
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(PAGE_STATES)
    ],
    declarations: [
        PageComponent,
        PageEditComponent,
        PagePopupComponent,
        PageDialogComponent,
        PageDeletePopupComponent,
        PageDeleteDialogComponent,
        ModulePopupComponent,
        ModuleDialogComponent
    ],
    entryComponents: [
        PageComponent,
        PageEditComponent,
        PagePopupComponent,
        PageDialogComponent,
        PageDeletePopupComponent,
        PageDeleteDialogComponent,
        ModulePopupComponent,
        ModuleDialogComponent
    ],
    providers: [
        CmPageService,
        ExtendedPageService,
        PagePopupService,
        PageResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmPageModule {}
