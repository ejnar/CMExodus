/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmSubTopicCmComponent } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm.component';
import { CmSubTopicCmService } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm.service';
import { CmSubTopicCm } from '../../../../../../main/webapp/app/entities/cm-sub-topic-cm/cm-sub-topic-cm.model';

describe('Component Tests', () => {

    describe('CmSubTopicCm Management Component', () => {
        let comp: CmSubTopicCmComponent;
        let fixture: ComponentFixture<CmSubTopicCmComponent>;
        let service: CmSubTopicCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmSubTopicCmComponent],
                providers: [
                    CmSubTopicCmService
                ]
            })
            .overrideTemplate(CmSubTopicCmComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmSubTopicCmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmSubTopicCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmSubTopicCm(123)],
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
