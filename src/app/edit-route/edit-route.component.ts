import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Station } from '../_model/station';
import { RouteService } from '../_service/route.service';
import { StationInRoute } from '../_model/station-in-route';
import { Route } from '../_model/route';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {
  route: Route;

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
    private activatedRoute: ActivatedRoute,
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.wrongNewStation = false;

    this.routeService.getStations().subscribe(st => {
      this.stations = st;

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

      this.activatedRoute.params.subscribe(params => {
        this.routeService.getById(+params['id']).subscribe(r => {
          this.route = r;
          this.fillPage();
        })
      })
    });
  }

  fillPage() {
    this.f.factor.setValue(this.route.factor);
    let t: number[] = JSON.parse(this.route.transport);

    this.auto = t.includes(1);
    this.fly = t.includes(2);
    this.train = t.includes(3);

    this.f.name.setValue(this.route.name);
    this.f.start.setValue(this.route.tickets[0].from.name);

    this.f.date.setValue(new DatePipe('en-US').transform(this.route.tickets[0].departureTime, "yyyy-MM-dd"));

    for (var j = 0; j < this.route.tickets.length - 1; j++) {
      let st = new StationInRoute;

      let hours = Math.round((this.route.tickets[j + 1].departureTime
        - (this.route.tickets[j].departureTime + this.route.tickets[j].duration)) / 3600000);

      st.stationId = this.route.tickets[j].to.id;
      st.name = this.route.tickets[j].to.name;
      st.hours = hours % 24;
      st.days = Math.trunc(hours / 24);

      this.selectedStations.push(st);

      let list = this.stations.filter(x => x.name == st.name);
      this.stations.splice(this.stations.indexOf(list[0]), 1);
    }
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
    this.routeService.editRoute(this.f.factor.value, new Date(this.f.date.value).getTime(),
      list[0].id, cloned, transport, this.f.name.value, this.route.id, null)
      .subscribe(
        data => {
          this.router.navigate(['/route', this.route.id]);
        }, error => {
          this.loading = false;
          alert('ffff');
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

  removeStation(st : StationInRoute) {
    var index = this.selectedStations.indexOf(st);
    if (index > -1) {
      this.selectedStations.splice(index, 1);

      let s = new Station;
      s.id = st.stationId;
      s.name = st.name;
      this.stations.push(s);
    }
  }

  back() {
    this.router.navigate(['/route', this.route.id]);
  }
}
