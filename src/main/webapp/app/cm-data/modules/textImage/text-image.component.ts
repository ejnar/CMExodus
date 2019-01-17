import { OnInit, OnDestroy, Component, Directive, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { NGXLogger } from 'ngx-logger';

import { ComponentInterface } from '../../../content/component-interface';
import { CmText, TextType, LayoutType } from '../../../entities/cm-text/cm-text.model';
import { CmImage, CmImageService} from '../../../entities/cm-image';

@Component({
    templateUrl: './text-image.component.html',
    styleUrls: [
        '../content/styles.scss'
    ]
})
export class TextImageComponent implements ComponentInterface, OnInit, OnDestroy {
    @Input() data: any;
    eventSubscriber: Subscription;
    private imagePath = 'data:image/jpeg;base64,';

    profileImage: string;

    title: CmText;
    text: CmText;
    image: CmImage = new CmImage();
    images: CmImage[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private cmImageService: CmImageService,
        private eventManager: JhiEventManager,
        private logger: NGXLogger
    ) { }

    ngOnInit() {
        this.data.module.texts.forEach((item) => {
            if (item.textType === 'TITLE') {
                this.title = item;
            } else if (item.textType === 'TEXT_IMAGE') {
                this.text = item;
                if (item.image) {
                    this.image = item.image;
                }
            }
        });
        this.loadAll();
        this.registerChangeInCmImages();
    }

    loadAll() {
        this.cmImageService.query()
            .subscribe((res: HttpResponse<CmImage[]>) => { this.response(res.body); }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    response(res: CmImage[]) {
        this.images = res;
        this.selectImage();
    }

    onChange(publish) {
        this.data.module.texts.forEach((item) => {
            item.publish = publish;
            if (item.textType === 'TEXT_IMAGE') {
                if (item.image) {
                    this.image.publish = publish;
                }
            }
        });
    }

    selectImage() {
        this.text.imageId = this.image.id;
        const img = this.images.find((i) => i.id === this.image.id);
        if (img) {
            this.profileImage = this.imagePath + img.data;
        }
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    registerChangeInCmImages() {
        this.eventSubscriber = this.eventManager.subscribe('imageListModification', (response) => this.loadAll());
    }

    ngOnDestroy() {
        this.onChange(this.text.publish);
        this.eventManager.destroy(this.eventSubscriber);
    }
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// const base64 = btoa( new Uint8Array(img.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
