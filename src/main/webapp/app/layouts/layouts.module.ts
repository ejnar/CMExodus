import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmExodusSharedModule } from '../shared';
import {
    NavbarService
} from './';

@NgModule({
    imports: [
        CmExodusSharedModule
    ],
    declarations: [
    ],
    providers: [
        NavbarService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusLayoutModule {}
