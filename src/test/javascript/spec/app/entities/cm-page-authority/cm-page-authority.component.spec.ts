/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageAuthorityComponent } from '../../../../../../main/webapp/app/entities/cm-page-authority/cm-page-authority.component';
import { CmPageAuthorityService } from '../../../../../../main/webapp/app/entities/cm-page-authority/cm-page-authority.service';
import { CmPageAuthority } from '../../../../../../main/webapp/app/entities/cm-page-authority/cm-page-authority.model';

describe('Component Tests', () => {

    describe('CmPageAuthority Management Component', () => {
        let comp: CmPageAuthorityComponent;
        let fixture: ComponentFixture<CmPageAuthorityComponent>;
        let service: CmPageAuthorityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageAuthorityComponent],
                providers: [
                    CmPageAuthorityService
                ]
            })
            .overrideTemplate(CmPageAuthorityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageAuthorityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageAuthorityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmPageAuthority(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmPageAuthorities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
