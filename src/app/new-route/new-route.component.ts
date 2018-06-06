import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Station } from '../_model/station';
import { RouteService } from '../_service/route.service';
import { StationInRoute } from '../_model/station-in-route';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.css']
})
export class NewRouteComponent implements OnInit {
  auto: boolean;
  fly: boolean;
  train: boolean;
  routeForm: FormGroup;
  stations: Station[];
  selectedStations: StationInRoute[] = [];

  wrongNewStation: boolean;
  wrongStartStation: boolean;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private routeService: RouteService) { }

  ngOnInit() {
    this.wrongNewStation = false;

    this.auto = true;
    this.fly = true;
    this.train = true;

    this.getStations();

    this.routeForm = this.formBuilder.group({
      start: ['', [Validators.required]],
      name: ['', Validators.required],
      factor: [''],
      date: ['', Validators.required],
      addStName: [''],
      addStDays: [''],
      addStHours: ['']
    });

    this.f.addStDays.setValue('0');
    this.f.addStHours.setValue('0');
    this.f.factor.setValue(0.5);
  }

  get f() { return this.routeForm.controls; }

  onSubmit() {
    let list = this.stations.filter(x => x.name == this.f.start.value);

    if (list.length == 0) {
      this.wrongStartStation = true;
      return;
    }

    this.wrongStartStation = false;

    let transport = [];
    if (this.auto) {
      transport.push(1);
    }
    if (this.fly) {
      transport.push(2);
    }
    if (this.train) {
      transport.push(3);
    }

    let cloned = this.selectedStations.map(x => Object.assign({}, x));
    cloned.forEach(c => c.hours = c.hours + c.days * 24)

    this.loading = true;
    this.routeService.createRoute(this.f.factor.value, new Date(this.f.date.value).getTime(), list[0].id, cloned, transport, this.f.name.value)
      .subscribe(
        data => {
          this.router.navigate(['/route/' + data.id]);
        }, error => {
          this.loading = false;
          // TODO
        });
  }

  addStation() {
    this.wrongNewStation = false;
    this.wrongStartStation = false;

    let list = this.stations.filter(x => x.name == this.f.addStName.value);

    if (list.length == 0) {
      this.wrongNewStation = true;
    } else {
      let s = new StationInRoute;
      s.days = this.f.addStDays.value;
      s.hours = this.f.addStHours.value;
      s.stationId = list[0].id;
      s.name = list[0].name;
      this.selectedStations.push(s);

      this.f.addStDays.setValue('0');
      this.f.addStHours.setValue('0');
      this.f.addStName.setValue('');

      this.stations.splice(this.stations.indexOf(list[0]), 1);
    }
  }

  getStations() {
    this.routeService.getStations().subscribe(st => this.stations = st);
  }

  removeStation(st) {
    var index = this.selectedStations.indexOf(st);
    if (index > -1) {
      this.selectedStations.splice(index, 1);
    }
  }
}
