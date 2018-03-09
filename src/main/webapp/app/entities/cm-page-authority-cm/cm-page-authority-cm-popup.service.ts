import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CmPageAuthorityCm } from './cm-page-authority-cm.model';
import { CmPageAuthorityCmService } from './cm-page-authority-cm.service';

@Injectable()
export class CmPageAuthorityCmPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cmPageAuthorityService: CmPageAuthorityCmService

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
                this.cmPageAuthorityService.find(id)
                    .subscribe((cmPageAuthorityResponse: HttpResponse<CmPageAuthorityCm>) => {
                        const cmPageAuthority: CmPageAuthorityCm = cmPageAuthorityResponse.body;
                        this.ngbModalRef = this.cmPageAuthorityModalRef(component, cmPageAuthority);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cmPageAuthorityModalRef(component, new CmPageAuthorityCm());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cmPageAuthorityModalRef(component: Component, cmPageAuthority: CmPageAuthorityCm): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cmPageAuthority = cmPageAuthority;
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
