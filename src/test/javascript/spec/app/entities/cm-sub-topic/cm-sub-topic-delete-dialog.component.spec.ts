/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmSubTopicDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic-delete-dialog.component';
import { CmSubTopicService } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic.service';

describe('Component Tests', () => {

    describe('CmSubTopic Management Delete Component', () => {
        let comp: CmSubTopicDeleteDialogComponent;
        let fixture: ComponentFixture<CmSubTopicDeleteDialogComponent>;
        let service: CmSubTopicService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmSubTopicDeleteDialogComponent],
                providers: [
                    CmSubTopicService
                ]
            })
            .overrideTemplate(CmSubTopicDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmSubTopicDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmSubTopicService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
