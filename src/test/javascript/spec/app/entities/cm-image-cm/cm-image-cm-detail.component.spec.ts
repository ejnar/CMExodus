/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmImageCmDetailComponent } from '../../../../../../main/webapp/app/entities/cm-image-cm/cm-image-cm-detail.component';
import { CmImageCmService } from '../../../../../../main/webapp/app/entities/cm-image-cm/cm-image-cm.service';
import { CmImageCm } from '../../../../../../main/webapp/app/entities/cm-image-cm/cm-image-cm.model';

describe('Component Tests', () => {

    describe('CmImageCm Management Detail Component', () => {
        let comp: CmImageCmDetailComponent;
        let fixture: ComponentFixture<CmImageCmDetailComponent>;
        let service: CmImageCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmImageCmDetailComponent],
                providers: [
                    CmImageCmService
                ]
            })
            .overrideTemplate(CmImageCmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmImageCmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmImageCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmImageCm(123)
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
