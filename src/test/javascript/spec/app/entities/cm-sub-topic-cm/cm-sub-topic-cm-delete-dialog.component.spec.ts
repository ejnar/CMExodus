/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmSubTopicCmDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm-delete-dialog.component';
import { CmSubTopicCmService } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm.service';

describe('Component Tests', () => {

    describe('CmSubTopicCm Management Delete Component', () => {
        let comp: CmSubTopicCmDeleteDialogComponent;
        let fixture: ComponentFixture<CmSubTopicCmDeleteDialogComponent>;
        let service: CmSubTopicCmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmSubTopicCmDeleteDialogComponent],
                providers: [
                    CmSubTopicCmService
                ]
            })
            .overrideTemplate(CmSubTopicCmDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmSubTopicCmDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmSubTopicCmService);
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
