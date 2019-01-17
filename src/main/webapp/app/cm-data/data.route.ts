import { Route, Routes } from '@angular/router';

import { DataComponent } from './data.component';
import { UploadPopupComponent } from './modules/upload/upload-dialog.component';

export const dataRoute: Route = {
    path: 'data',
    component: DataComponent,
    data: {
        authorities: [],
        pageTitle: 'content.title'
    }
};

export const dataPopupRoute: Routes = [
    {
        path: 'data/upload-file',
        component: UploadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        outlet: 'popup'
    }
];
