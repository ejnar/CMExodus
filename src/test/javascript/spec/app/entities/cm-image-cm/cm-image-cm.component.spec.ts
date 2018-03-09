/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmImageCmComponent } from '../../../../../../main/webapp/app/entities/cm-image-cm/cm-image-cm.component';
import { CmImageCmService } from '../../../../../../main/webapp/app/entities/cm-image-cm/cm-image-cm.service';
import { CmImageCm } from '../../../../../../main/webapp/app/entities/cm-image-cm/cm-image-cm.model';

describe('Component Tests', () => {

    describe('CmImageCm Management Component', () => {
        let comp: CmImageCmComponent;
        let fixture: ComponentFixture<CmImageCmComponent>;
        let service: CmImageCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmImageCmComponent],
                providers: [
                    CmImageCmService
                ]
            })
            .overrideTemplate(CmImageCmComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmImageCmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmImageCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmImageCm(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmImages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
