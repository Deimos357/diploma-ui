import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Route } from '../_model/route';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
  @Input('routes') _routes: Route[];
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  @Input()
  set routes(routes: Route[]) {
    this._routes = routes;
    this._routes.forEach(r => {
      let s = '';
  
      for (var i = 0; i < 3 && i < r.tickets.length; i++) {
        s = s + r.tickets[i].from.name + ' - ';
      }
      s = s + '...';

      r.stations = s;
    })
  }

  get routes(): Route[] {
    return this._routes;
  }

  click(r: Route) {
    this.router.navigate(['route', r.id]);
  }
}
