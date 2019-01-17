import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CmExodusCmTopicModule } from './cm-topic/cm-topic.module';
import { CmExodusCmSubTopicModule } from './cm-sub-topic/cm-sub-topic.module';
import { CmExodusCmPortalModule } from './cm-portal/cm-portal.module';
import { CmExodusCmPageAuthorityModule } from './cm-page-authority/cm-page-authority.module';
import { CmExodusCmPageModule } from './cm-page/cm-page.module';
import { CmExodusCmModuleModule } from './cm-module/cm-module.module';
import { CmExodusCmItemModule } from './cm-item/cm-item.module';
import { CmExodusCmItemListModule } from './cm-item-list/cm-item-list.module';
import { CmExodusCmTextModule } from './cm-text/cm-text.module';
import { CmExodusCmImageModule } from './cm-image/cm-image.module';
import { CmExodusCmUploadModule } from './cm-upload/cm-upload.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CmExodusCmTopicModule,
        CmExodusCmSubTopicModule,
        CmExodusCmPortalModule,
        CmExodusCmPageAuthorityModule,
        CmExodusCmPageModule,
        CmExodusCmModuleModule,
        CmExodusCmItemModule,
        CmExodusCmItemListModule,
        CmExodusCmTextModule,
        CmExodusCmImageModule,
        CmExodusCmUploadModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusEntityModule {}
