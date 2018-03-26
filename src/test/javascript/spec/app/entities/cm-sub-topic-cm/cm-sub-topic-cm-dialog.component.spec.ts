/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmSubTopicCmDialogComponent } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm-dialog.component';
import { CmSubTopicCmService } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm.service';
import { CmSubTopicCm } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm.model';
import { CmTopicCmService } from '../../../../../../main/webapp/app/entities/cm-topic-cm';
import { CmPageCmService } from '../../../../../../main/webapp/app/entities/cm-page-cm';

describe('Component Tests', () => {

    describe('CmSubTopicCm Management Dialog Component', () => {
        let comp: CmSubTopicCmDialogComponent;
        let fixture: ComponentFixture<CmSubTopicCmDialogComponent>;
        let service: CmSubTopicCmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmSubTopicCmDialogComponent],
                providers: [
                    CmTopicCmService,
                    CmPageCmService,
                    CmSubTopicCmService
                ]
            })
            .overrideTemplate(CmSubTopicCmDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmSubTopicCmDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmSubTopicCmService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmSubTopicCm(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmSubTopic = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmSubTopicListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmSubTopicCm();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmSubTopic = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmSubTopicListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
