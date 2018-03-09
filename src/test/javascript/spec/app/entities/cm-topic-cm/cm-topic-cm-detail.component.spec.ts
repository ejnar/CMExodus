/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmTopicCmDetailComponent } from '../../../../../../main/webapp/app/entities/cm-topic-cm/cm-topic-cm-detail.component';
import { CmTopicCmService } from '../../../../../../main/webapp/app/entities/cm-topic-cm/cm-topic-cm.service';
import { CmTopicCm } from '../../../../../../main/webapp/app/entities/cm-topic-cm/cm-topic-cm.model';

describe('Component Tests', () => {

    describe('CmTopicCm Management Detail Component', () => {
        let comp: CmTopicCmDetailComponent;
        let fixture: ComponentFixture<CmTopicCmDetailComponent>;
        let service: CmTopicCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmTopicCmDetailComponent],
                providers: [
                    CmTopicCmService
                ]
            })
            .overrideTemplate(CmTopicCmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmTopicCmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmTopicCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmTopicCm(123)
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
