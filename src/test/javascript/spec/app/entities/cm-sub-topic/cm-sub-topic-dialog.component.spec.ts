/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmSubTopicDialogComponent } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic-dialog.component';
import { CmSubTopicService } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic.service';
import { CmSubTopic } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic.model';
import { CmTopicService } from '../../../../../../main/webapp/app/entities/cm-topic';
import { CmPageService } from '../../../../../../main/webapp/app/entities/cm-page';

describe('Component Tests', () => {

    describe('CmSubTopic Management Dialog Component', () => {
        let comp: CmSubTopicDialogComponent;
        let fixture: ComponentFixture<CmSubTopicDialogComponent>;
        let service: CmSubTopicService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmSubTopicDialogComponent],
                providers: [
                    CmTopicService,
                    CmPageService,
                    CmSubTopicService
                ]
            })
            .overrideTemplate(CmSubTopicDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmSubTopicDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmSubTopicService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmSubTopic(123);
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
                        const entity = new CmSubTopic();
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
