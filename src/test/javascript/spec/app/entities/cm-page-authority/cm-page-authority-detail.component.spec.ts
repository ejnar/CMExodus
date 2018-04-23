/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageAuthorityDetailComponent } from '../../../../../../main/webapp/app/entities/cm-page-authority/cm-page-authority-detail.component';
import { CmPageAuthorityService } from '../../../../../../main/webapp/app/entities/cm-page-authority/cm-page-authority.service';
import { CmPageAuthority } from '../../../../../../main/webapp/app/entities/cm-page-authority/cm-page-authority.model';

describe('Component Tests', () => {

    describe('CmPageAuthority Management Detail Component', () => {
        let comp: CmPageAuthorityDetailComponent;
        let fixture: ComponentFixture<CmPageAuthorityDetailComponent>;
        let service: CmPageAuthorityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageAuthorityDetailComponent],
                providers: [
                    CmPageAuthorityService
                ]
            })
            .overrideTemplate(CmPageAuthorityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageAuthorityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageAuthorityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmPageAuthority(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmPageAuthority).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
