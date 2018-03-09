/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmTextCmComponent } from '../../../../../../main/webapp/app/entities/cm-text-cm/cm-text-cm.component';
import { CmTextCmService } from '../../../../../../main/webapp/app/entities/cm-text-cm/cm-text-cm.service';
import { CmTextCm } from '../../../../../../main/webapp/app/entities/cm-text-cm/cm-text-cm.model';

describe('Component Tests', () => {

    describe('CmTextCm Management Component', () => {
        let comp: CmTextCmComponent;
        let fixture: ComponentFixture<CmTextCmComponent>;
        let service: CmTextCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmTextCmComponent],
                providers: [
                    CmTextCmService
                ]
            })
            .overrideTemplate(CmTextCmComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmTextCmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmTextCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmTextCm(123)],
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
