/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmSubTopicComponent } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic.component';
import { CmSubTopicService } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic.service';
import { CmSubTopic } from '../../../../../../main/webapp/app/entities/cm-sub-topic/cm-sub-topic.model';

describe('Component Tests', () => {

    describe('CmSubTopic Management Component', () => {
        let comp: CmSubTopicComponent;
        let fixture: ComponentFixture<CmSubTopicComponent>;
        let service: CmSubTopicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmSubTopicComponent],
                providers: [
                    CmSubTopicService
                ]
            })
            .overrideTemplate(CmSubTopicComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmSubTopicComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmSubTopicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmSubTopic(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmSubTopics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
