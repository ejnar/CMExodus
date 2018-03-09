/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmSubTopicCmDetailComponent } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm-detail.component';
import { CmSubTopicCmService } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm.service';
import { CmSubTopicCm } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm.model';

describe('Component Tests', () => {

    describe('CmSubTopicCm Management Detail Component', () => {
        let comp: CmSubTopicCmDetailComponent;
        let fixture: ComponentFixture<CmSubTopicCmDetailComponent>;
        let service: CmSubTopicCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmSubTopicCmDetailComponent],
                providers: [
                    CmSubTopicCmService
                ]
            })
            .overrideTemplate(CmSubTopicCmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmSubTopicCmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmSubTopicCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmSubTopicCm(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmSubTopic).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
