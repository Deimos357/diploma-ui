import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RouteService } from '../_service/route.service';
import { Router } from '@angular/router';
import { Route } from '../_model/route';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
  @Input('typ') type: string;
  routes: Route[];
  hasNext: boolean;
  hasPrev: boolean;
  offset: number;
  loading: boolean;

  limit: number = 10;
  
  constructor(
    private router: Router,
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.loading = false;
  }

  @Input()
  set typ(typ: string) {
    this.type = typ;

    this.loadpage(0);
  }

  loadpage(offset) {
    this.loading = true;
    this.offset = offset;

    this.hasPrev = offset != 0;

    if (this.type == 'f') {
      this.routeService.getFavorites(offset).subscribe(r => {
        this.setRL(r);
      }, er => {
        this.loading = false;
      })
    } else {
      this.routeService.getHistory(offset).subscribe(r => {
        this.setRL(r);        
      },
    er => {
      this.loading = false;
    })
    }
  }

  setRL(newRL: Route[]) {
    if (newRL.length == 0) {
      this.hasNext = false;
      this.offset = this.offset - 1;
      this.hasPrev = this.offset != 0;
      return;
    }

    this.routes = newRL;

    this.routes.forEach(r => {
      let s = '';
  
      for (var i = 0; i < 3 && i < r.tickets.length; i++) {
        s = s + r.tickets[i].from.name + ' - ';
      }
      s = s + '...';

      r.stations = s;
    })

    this.hasNext = this.routes.length == this.limit;
    this.loading = false;
  }

  click(r: Route) {
    this.router.navigate(['route', r.id]);
  }
}
