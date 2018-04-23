import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CmItemList } from './cm-item-list.model';
import { CmItemListService } from './cm-item-list.service';

@Injectable()
export class CmItemListPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private cmItemListService: CmItemListService

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
                this.cmItemListService.find(id)
                    .subscribe((cmItemListResponse: HttpResponse<CmItemList>) => {
                        const cmItemList: CmItemList = cmItemListResponse.body;
                        cmItemList.itemDate = this.datePipe
                            .transform(cmItemList.itemDate, 'yyyy-MM-ddTHH:mm:ss');
                        if (cmItemList.publishDate) {
                            cmItemList.publishDate = {
                                year: cmItemList.publishDate.getFullYear(),
                                month: cmItemList.publishDate.getMonth() + 1,
                                day: cmItemList.publishDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.cmItemListModalRef(component, cmItemList);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cmItemListModalRef(component, new CmItemList());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cmItemListModalRef(component: Component, cmItemList: CmItemList): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cmItemList = cmItemList;
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