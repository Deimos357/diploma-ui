import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from '../_service/route.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  routes: Route[];

  constructor(
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.routeService.getHistory().subscribe(r => this.routes = r);
  }
}
