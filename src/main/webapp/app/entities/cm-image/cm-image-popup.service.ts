import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CmImage } from './cm-image.model';
import { CmImageService } from './cm-image.service';

@Injectable()
export class CmImagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cmImageService: CmImageService

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
                    .subscribe((cmImageResponse: HttpResponse<CmImage>) => {
                        const cmImage: CmImage = cmImageResponse.body;
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
                    this.ngbModalRef = this.cmImageModalRef(component, new CmImage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cmImageModalRef(component: Component, cmImage: CmImage): NgbModalRef {
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
