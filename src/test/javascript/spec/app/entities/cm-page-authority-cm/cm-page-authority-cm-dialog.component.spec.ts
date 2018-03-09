/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageAuthorityCmDialogComponent } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm-dialog.component';
import { CmPageAuthorityCmService } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm.service';
import { CmPageAuthorityCm } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm.model';
import { CmPageCmService } from '../../../../../../main/webapp/app/entities/cm-page-cm';

describe('Component Tests', () => {

    describe('CmPageAuthorityCm Management Dialog Component', () => {
        let comp: CmPageAuthorityCmDialogComponent;
        let fixture: ComponentFixture<CmPageAuthorityCmDialogComponent>;
        let service: CmPageAuthorityCmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageAuthorityCmDialogComponent],
                providers: [
                    CmPageCmService,
                    CmPageAuthorityCmService
                ]
            })
            .overrideTemplate(CmPageAuthorityCmDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageAuthorityCmDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageAuthorityCmService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmPageAuthorityCm(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmPageAuthority = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmPageAuthorityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmPageAuthorityCm();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmPageAuthority = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmPageAuthorityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
