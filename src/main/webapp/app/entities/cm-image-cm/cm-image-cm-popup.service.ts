import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CmImageCm } from './cm-image-cm.model';
import { CmImageCmService } from './cm-image-cm.service';

@Injectable()
export class CmImageCmPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cmImageService: CmImageCmService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cmImageService.find(id)
                    .subscribe((cmImageResponse: HttpResponse<CmImageCm>) => {
                        const cmImage: CmImageCm = cmImageResponse.body;
                        if (cmImage.date) {
                            cmImage.date = {
                                year: cmImage.date.getFullYear(),
                                month: cmImage.date.getMonth() + 1,
                                day: cmImage.date.getDate()
                            };
                        }
                        if (cmImage.publishDate) {
                            cmImage.publishDate = {
                                year: cmImage.publishDate.getFullYear(),
                                month: cmImage.publishDate.getMonth() + 1,
                                day: cmImage.publishDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.cmImageModalRef(component, cmImage);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cmImageModalRef(component, new CmImageCm());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cmImageModalRef(component: Component, cmImage: CmImageCm): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cmImage = cmImage;
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
