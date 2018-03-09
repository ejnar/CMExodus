/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmModuleCmDetailComponent } from '../../../../../../main/webapp/app/entities/cm-module-cm/cm-module-cm-detail.component';
import { CmModuleCmService } from '../../../../../../main/webapp/app/entities/cm-module-cm/cm-module-cm.service';
import { CmModuleCm } from '../../../../../../main/webapp/app/entities/cm-module-cm/cm-module-cm.model';

describe('Component Tests', () => {

    describe('CmModuleCm Management Detail Component', () => {
        let comp: CmModuleCmDetailComponent;
        let fixture: ComponentFixture<CmModuleCmDetailComponent>;
        let service: CmModuleCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmModuleCmDetailComponent],
                providers: [
                    CmModuleCmService
                ]
            })
            .overrideTemplate(CmModuleCmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmModuleCmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmModuleCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmModuleCm(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmModule).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
