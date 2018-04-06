/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemListCmComponent } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm.component';
import { CmItemListCmService } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm.service';
import { CmItemListCm } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm.model';

describe('Component Tests', () => {

    describe('CmItemListCm Management Component', () => {
        let comp: CmItemListCmComponent;
        let fixture: ComponentFixture<CmItemListCmComponent>;
        let service: CmItemListCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemListCmComponent],
                providers: [
                    CmItemListCmService
                ]
            })
            .overrideTemplate(CmItemListCmComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemListCmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemListCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmItemListCm(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmItemLists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
