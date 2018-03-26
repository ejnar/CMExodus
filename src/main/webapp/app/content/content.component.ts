import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';

@Component({
  selector: 'jhi-content',
  templateUrl: './content.component.html',
  styles: []
})
export class ContentComponent implements OnInit {
  pageParam: String;

  constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        console.log('HomeComponent.constructor');
        router.events.subscribe((data) => {
            if (data instanceof ActivationEnd) {
                this.pageParam = data.snapshot.queryParams.page;
            }
        } );
        this.route.queryParams.subscribe( (params) => console.log('Testing.queryParams: ' + params));
  }

  ngOnInit() {
  }

}
