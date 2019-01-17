import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmExodusSharedModule } from '../shared';

import { DataComponent } from './data.component';
import { DataService } from './data.service';
import { DataDirective } from './data.directive';
import { dataRoute, dataPopupRoute } from './data.route';

import { MainComponent } from './modules/main/main.component';
import { ColumnRightComponent } from './modules/columnRight/column.component';
import { ProgramListComponent } from './modules/programList/program-list.component';
import { TextComponent } from './modules/text/text.component';
import { TextImageComponent } from './modules/textImage/text-image.component';
import { TextListComponent } from './modules/textList/text-list.component';
import { ImageComponent } from './modules/image/image.component';

import { UploadPopupComponent, UploadDialogComponent } from './modules/upload/upload-dialog.component';

const ENTITY_STATES = [
    dataRoute,
    ...dataPopupRoute
];

@NgModule({
    imports: [
        CmExodusSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataDirective,
        DataComponent,
        MainComponent,
        ColumnRightComponent,
        ProgramListComponent,
        TextComponent,
        TextImageComponent,
        TextListComponent,
        ImageComponent,
        UploadPopupComponent,
        UploadDialogComponent
    ],
    entryComponents: [
        MainComponent,
        ColumnRightComponent,
        ProgramListComponent,
        TextComponent,
        TextImageComponent,
        TextListComponent,
        ImageComponent,
        UploadPopupComponent,
        UploadDialogComponent
    ],
    providers: [
        DataService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusDateModule {}
