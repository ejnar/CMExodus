/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmTextDetailComponent } from '../../../../../../main/webapp/app/entities/cm-text/cm-text-detail.component';
import { CmTextService } from '../../../../../../main/webapp/app/entities/cm-text/cm-text.service';
import { CmText } from '../../../../../../main/webapp/app/entities/cm-text/cm-text.model';

describe('Component Tests', () => {

    describe('CmText Management Detail Component', () => {
        let comp: CmTextDetailComponent;
        let fixture: ComponentFixture<CmTextDetailComponent>;
        let service: CmTextService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmTextDetailComponent],
                providers: [
                    CmTextService
                ]
            })
            .overrideTemplate(CmTextDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmTextDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmTextService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmText(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmText).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
