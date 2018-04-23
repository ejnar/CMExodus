/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmImageDetailComponent } from '../../../../../../main/webapp/app/entities/cm-image/cm-image-detail.component';
import { CmImageService } from '../../../../../../main/webapp/app/entities/cm-image/cm-image.service';
import { CmImage } from '../../../../../../main/webapp/app/entities/cm-image/cm-image.model';

describe('Component Tests', () => {

    describe('CmImage Management Detail Component', () => {
        let comp: CmImageDetailComponent;
        let fixture: ComponentFixture<CmImageDetailComponent>;
        let service: CmImageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmImageDetailComponent],
                providers: [
                    CmImageService
                ]
            })
            .overrideTemplate(CmImageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmImageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmImageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmImage(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmImage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
