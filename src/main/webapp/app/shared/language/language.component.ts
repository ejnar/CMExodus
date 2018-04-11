import { Component, Input, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'jhi-language',
  template: `<span>{{value}}</span>`
})
export class JhiLanguageComponent implements OnInit {
    @Input() model: any;
    @Input() property = 'text';
    value: string;
    constructor(private translateService: TranslateService) {}

    ngOnInit() {
        this.value =  this.model[this.propertyName(this.translateService.currentLang) ];
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.value = this.model[this.propertyName(this.translateService.currentLang)];
        });
    }

    private propertyName(token) {
        return this.property + token.charAt(0).toUpperCase() + token.slice(1);
    }
}
