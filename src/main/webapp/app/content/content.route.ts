import { Route } from '@angular/router';

import { ContentComponent } from './';

export const contentRoute: Route = {
    path: 'content',
    component: ContentComponent,
    data: {
        authorities: [],
        pageTitle: 'content.title'
    }
};
