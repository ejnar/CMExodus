import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CmItem } from './cm-item.model';
import { CmItemService } from './cm-item.service';

@Injectable()
export class CmItemPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private cmItemService: CmItemService

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
                this.cmItemService.find(id)
                    .subscribe((cmItemResponse: HttpResponse<CmItem>) => {
                        const cmItem: CmItem = cmItemResponse.body;
                        cmItem.itemDate = this.datePipe
                            .transform(cmItem.itemDate, 'yyyy-MM-ddTHH:mm:ss');
                        if (cmItem.publishDate) {
                            cmItem.publishDate = {
                                year: cmItem.publishDate.getFullYear(),
                                month: cmItem.publishDate.getMonth() + 1,
                                day: cmItem.publishDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.cmItemModalRef(component, cmItem);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cmItemModalRef(component, new CmItem());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cmItemModalRef(component: Component, cmItem: CmItem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cmItem = cmItem;
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
