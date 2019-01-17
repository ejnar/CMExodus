import { Component, Input, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'jhi-language',
  template: `<span>{{value}}</span>`
})
export class JhiLanguageComponent implements OnInit {
    @Input() model: any;
    @Input() property = 'text';
    value: string;
    defaulLang: 'sv';
    constructor(private translateService: TranslateService, private logger: NGXLogger) {}

    ngOnInit() {
        this.value =  this.model[this.propertyName(this.translateService.currentLang) ];
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            try {
                const value = this.model[this.propertyName(this.translateService.currentLang)];
                if (value) {
                    this.value = value;
                } else {
                    this.value = this.model[this.propertyName(this.defaulLang)];
                }
            } catch (e) {
                this.logger.debug(e);
            }
        });
    }

    private propertyName(token) {
        return this.property + token.charAt(0).toUpperCase() + token.slice(1);
    }
}
