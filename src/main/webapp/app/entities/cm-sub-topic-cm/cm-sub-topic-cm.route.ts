import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmSubTopicCmComponent } from './cm-sub-topic-cm.component';
import { CmSubTopicCmDetailComponent } from './cm-sub-topic-cm-detail.component';
import { CmSubTopicCmPopupComponent } from './cm-sub-topic-cm-dialog.component';
import { CmSubTopicCmDeletePopupComponent } from './cm-sub-topic-cm-delete-dialog.component';

export const cmSubTopicRoute: Routes = [
    {
        path: 'cm-sub-topic-cm',
        component: CmSubTopicCmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-sub-topic-cm/:id',
        component: CmSubTopicCmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmSubTopicPopupRoute: Routes = [
    {
        path: 'cm-sub-topic-cm-new',
        component: CmSubTopicCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-sub-topic-cm/:id/edit',
        component: CmSubTopicCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-sub-topic-cm/:id/delete',
        component: CmSubTopicCmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
