/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmImageComponent } from '../../../../../../main/webapp/app/entities/cm-image/cm-image.component';
import { CmImageService } from '../../../../../../main/webapp/app/entities/cm-image/cm-image.service';
import { CmImage } from '../../../../../../main/webapp/app/entities/cm-image/cm-image.model';

describe('Component Tests', () => {

    describe('CmImage Management Component', () => {
        let comp: CmImageComponent;
        let fixture: ComponentFixture<CmImageComponent>;
        let service: CmImageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmImageComponent],
                providers: [
                    CmImageService
                ]
            })
            .overrideTemplate(CmImageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmImageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmImageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmImage(123)],
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
