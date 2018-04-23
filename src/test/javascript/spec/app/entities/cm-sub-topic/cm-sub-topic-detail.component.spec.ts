/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmSubTopicDetailComponent } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic-detail.component';
import { CmSubTopicService } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic.service';
import { CmSubTopic } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic.model';

describe('Component Tests', () => {

    describe('CmSubTopic Management Detail Component', () => {
        let comp: CmSubTopicDetailComponent;
        let fixture: ComponentFixture<CmSubTopicDetailComponent>;
        let service: CmSubTopicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmSubTopicDetailComponent],
                providers: [
                    CmSubTopicService
                ]
            })
            .overrideTemplate(CmSubTopicDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmSubTopicDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmSubTopicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmSubTopic(123)
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
