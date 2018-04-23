/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmTextComponent } from '../../../../../../main/webapp/app/entities/cm-text/cm-text.component';
import { CmTextService } from '../../../../../../main/webapp/app/entities/cm-text/cm-text.service';
import { CmText } from '../../../../../../main/webapp/app/entities/cm-text/cm-text.model';

describe('Component Tests', () => {

    describe('CmText Management Component', () => {
        let comp: CmTextComponent;
        let fixture: ComponentFixture<CmTextComponent>;
        let service: CmTextService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmTextComponent],
                providers: [
                    CmTextService
                ]
            })
            .overrideTemplate(CmTextComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmTextComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmTextService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmText(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmTexts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
