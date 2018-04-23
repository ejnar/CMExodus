/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmTopicDetailComponent } from '../../../../../../main/webapp/app/entities/cm-topic/cm-topic-detail.component';
import { CmTopicService } from '../../../../../../main/webapp/app/entities/cm-topic/cm-topic.service';
import { CmTopic } from '../../../../../../main/webapp/app/entities/cm-topic/cm-topic.model';

describe('Component Tests', () => {

    describe('CmTopic Management Detail Component', () => {
        let comp: CmTopicDetailComponent;
        let fixture: ComponentFixture<CmTopicDetailComponent>;
        let service: CmTopicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmTopicDetailComponent],
                providers: [
                    CmTopicService
                ]
            })
            .overrideTemplate(CmTopicDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmTopicDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmTopicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmTopic(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmTopic).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
