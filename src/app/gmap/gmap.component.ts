import { Component, OnInit } from '@angular/core';
import { RouteService } from '../_service/route.service';
import { Route } from '../_model/route';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
  route: Route;
  zoom: number = 3;
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.routeService.getById(+params['id']).subscribe(r => {
        this.route = r;
      })
    })
  }

}
