/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmTopicCmComponent } from '../../../../../../main/webapp/app/entities/cm-topic-cm/cm-topic-cm.component';
import { CmTopicCmService } from '../../../../../../main/webapp/app/entities/cm-topic-cm/cm-topic-cm.service';
import { CmTopicCm } from '../../../../../../main/webapp/app/entities/cm-topic-cm/cm-topic-cm.model';

describe('Component Tests', () => {

    describe('CmTopicCm Management Component', () => {
        let comp: CmTopicCmComponent;
        let fixture: ComponentFixture<CmTopicCmComponent>;
        let service: CmTopicCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmTopicCmComponent],
                providers: [
                    CmTopicCmService
                ]
            })
            .overrideTemplate(CmTopicCmComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmTopicCmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmTopicCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmTopicCm(123)],
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
