/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageCmDialogComponent } from '../../../../../../main/webapp/app/entities/cm-page-cm/cm-page-cm-dialog.component';
import { CmPageCmService } from '../../../../../../main/webapp/app/entities/cm-page-cm/cm-page-cm.service';
import { CmPageCm } from '../../../../../../main/webapp/app/entities/cm-page-cm/cm-page-cm.model';
import { CmModuleCmService } from '../../../../../../main/webapp/app/entities/cm-module-cm';

describe('Component Tests', () => {

    describe('CmPageCm Management Dialog Component', () => {
        let comp: CmPageCmDialogComponent;
        let fixture: ComponentFixture<CmPageCmDialogComponent>;
        let service: CmPageCmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageCmDialogComponent],
                providers: [
                    CmModuleCmService,
                    CmPageCmService
                ]
            })
            .overrideTemplate(CmPageCmDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageCmDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageCmService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmPageCm(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmPage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmPageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmPageCm();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmPage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmPageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
