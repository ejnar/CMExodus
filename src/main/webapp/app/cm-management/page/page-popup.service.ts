import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';

import { CmModule } from '../../entities/cm-module/cm-module.model';

import { CmPage } from '../../entities/cm-page/cm-page.model';
import { CmPageService } from '../../entities/cm-page/cm-page.service';

@Injectable()
export class PagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private pageService: CmPageService,
        private logger: NGXLogger
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, pageId?: number, moduleId?: number): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (pageId) {
                this.pageService.find(pageId)
                    .subscribe((pageResponse: HttpResponse<CmPage>) => {
                        const cmPage: CmPage = pageResponse.body;
                        this.ngbModalRef = this.pageModalRef(component, cmPage, moduleId);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pageModalRef(component, new CmPage(), -1);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pageModalRef(component: Component, cmPage: CmPage, moduleId?: number): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});

        if (cmPage.modules) {
            for (let i = 0; i < cmPage.modules.length; i++) {
                const cmModule = cmPage.modules[i];
                const id = cmModule.id;
                if (id === moduleId) {
                    modalRef.componentInstance.cmModule = Object.assign({}, cmModule);
                    break;
                }
            }
        }
        modalRef.componentInstance.cmPage = cmPage;

        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }

}
