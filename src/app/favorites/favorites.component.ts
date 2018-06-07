import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from '../_service/route.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  routes: Route[];

  constructor(
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.routeService.getFavorites().subscribe(r => this.routes = r);
  }
}
