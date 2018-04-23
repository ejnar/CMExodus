/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmTopicComponent } from '../../../../../../main/webapp/app/entities/cm-topic/cm-topic.component';
import { CmTopicService } from '../../../../../../main/webapp/app/entities/cm-topic/cm-topic.service';
import { CmTopic } from '../../../../../../main/webapp/app/entities/cm-topic/cm-topic.model';

describe('Component Tests', () => {

    describe('CmTopic Management Component', () => {
        let comp: CmTopicComponent;
        let fixture: ComponentFixture<CmTopicComponent>;
        let service: CmTopicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmTopicComponent],
                providers: [
                    CmTopicService
                ]
            })
            .overrideTemplate(CmTopicComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmTopicComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmTopicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmTopic(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmTopics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
