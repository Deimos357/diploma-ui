import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Ticket } from '../_model/ticket';
import { tick } from '@angular/core/src/render3';
import { RouteService } from '../_service/route.service';
import { Route } from '../_model/route';
import { ActivatedRoute, Router } from '@angular/router';
import { StationDraw } from '../_model/station-draw';
import { StationInRoute } from '../_model/station-in-route';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  route: Route;
  rebuild : boolean;
  replacingTicket : Ticket;
  altTickets : Ticket[];
  drawItems: any[];

  @ViewChild(ModalDirective) modal: ModalDirective;

  constructor(
    private routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.rebuild = false;
    this.altTickets = [];

    this.activatedRoute.params.subscribe(params => {
      this.routeService.getById(+params['id']).subscribe(r => {
        this.route = r;
        this.remakeDrawItems();
      })
    })
  }

  remakeDrawItems() {
    this.drawItems = [];

    let s = new StationDraw;
    s.name = this.route.tickets[0].from.name;
    s.id = this.route.tickets[0].from.id;
    this.drawItems.push(s);

    this.route.tickets.forEach(ticket => {
      this.drawItems.push(ticket);

      this.drawItems[this.drawItems.length - 2].dateDep = ticket.departureTime;

      let s = new StationDraw;
      s.name = ticket.to.name;
      s.id = ticket.to.id;
      s.dateAr = ticket.departureTime + ticket.duration;
      this.drawItems.push(s);
    });
  }

  showAlts(ticket : Ticket) {
    this.replacingTicket = ticket;

    this.routeService.getAlternarives(ticket.id).subscribe(ts => this.altTickets = ts[0]);

    this.modal.show();
  }

  choiceAlt(ticket : Ticket) {
    this.route.tickets[this.route.tickets.indexOf(this.replacingTicket)] = ticket;

    if (this.rebuild) {
      let ticks = [];
      let i = 0;
      while (this.route.tickets[i].id != ticket.id) {
        ticks.push(this.route.tickets[i]);
        i++;
      }
      ticks.push(ticket);

      let stationsToVisit = [];
      for (var j = 0; j < this.drawItems.length; j = j + 2) {
        let st = new StationInRoute;
        st.days = 0;
        st.stationId = this.drawItems[j].id;
        st.name = this.drawItems[j].name;

        if (!this.drawItems[j].dateDep || !this.drawItems[j].dateAr) {
          st.hours = 0;
        } else {
          st.hours = Math.round((this.drawItems[j].dateDep - this.drawItems[j].dateAr) / 3600000);
        }

        stationsToVisit.push(st);
      }

      this.routeService.editRoute(this.route.factor, this.route.tickets[0].departureTime, 
        this.route.tickets[0].from.id, stationsToVisit, 
        JSON.parse(this.route.transport), this.route.name, this.route.id, ticks)
        .subscribe(r => {
          this.route = r;
          this.remakeDrawItems();
          this.modal.hide();
        }, error => {
          alert('ffff');
        });
    } else {
      this.routeService.replaceTicket(this.route.id, this.route.tickets).subscribe(data => {
        this.remakeDrawItems();
        this.modal.hide();
      }, error => {
        alert('ffff');
      });
    }
  }

  switchFav() {
    this.routeService.switchFavorite(this.route.id).subscribe(response => {}, error => {})
    this.route.favorite = !this.route.favorite;
  }

  edit() {
    this.router.navigate(['route', this.route.id, 'edit']);
  }

  hideAlts($event: ModalDirective) { 
    this.altTickets = [];
    this.replacingTicket = null;
  }

  routeMap() {
    this.router.navigate(['route', this.route.id, 'map']);
  }
}
