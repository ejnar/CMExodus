import {Pipe, PipeTransform, OnInit} from '@angular/core';
import { JhiLanguageService} from 'ng-jhipster';

import { JhiLanguageHelper } from '../shared';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Pipe ({
   name : 'lang'
})
export class LangPipe implements PipeTransform, OnInit {

    constructor(
        private languageHelper: JhiLanguageHelper
    ) {
    }

    ngOnInit() {
    }

   transform(val: any): string {
      console.log(val);
      console.log(this.languageHelper.lang);
      if (this.languageHelper.lang === 'en') {
        return val.textEn;
      }else {
        return val.textSv;
      }
   }
}
