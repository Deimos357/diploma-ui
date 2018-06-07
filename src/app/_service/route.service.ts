import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../app-settings';

@Injectable()
export class RouteService {
  constructor(private http: HttpClient) { }

  createRoute(factor, startDate, startStation, stationsToVisit, transportTypes, name) {
    return this.http.post<any>(AppSettings.host + '/core/v1/routes', {
      "factor" : factor,
      "startDate" : startDate,
      "startStation" : startStation,
      "stationsToVisit" : stationsToVisit,
      "transportTypes" : transportTypes,
      "name" : name
    })
    .pipe(map(response => {
      return response.data
    }));
  }

  getFavorites() {
    return this.http.get<any>(AppSettings.host + '/core/v1/routes/favorites')
    .pipe(map(response => {
      return response.data
    }));
  }

  getHistory() {
    return this.http.get<any>(AppSettings.host + '/core/v1/routes/history')
    .pipe(map(response => {
      return response.data
    }));
  }

  getStations() {
    return this.http.get<any>(AppSettings.host + '/core/v1/routes/stations')
    .pipe(map(response => {
      return response.data
    }));
  }

  getAlternarives(id) {
    return this.http.get<any>(AppSettings.host + '/core/v1/routes/ticket/' + id + '/alternatives')
    .pipe(map(response => {
      return response.data
    }));
  }

  getById(id) {
    return this.http.get<any>(AppSettings.host + '/core/v1/routes/' + id)
    .pipe(map(response => {
      return response.data
    }));
  }

  // tickets is optional, stations must be in right order!
  editRoute(factor, startDate, startStation, stationsToVisit, transportTypes, name, id, tickets) {
    return this.http.put<any>(AppSettings.host + '/core/v1/routes/' + id, {
      "factor" : factor,
      "startDate" : startDate,
      "startStation" : startStation,
      "stationsToVisit" : stationsToVisit,
      "transportTypes" : transportTypes,
      "name" : name,
      "tickets" : tickets
    })
    .pipe(map(response => {
      return response.data
    }));
  }

  switchFavorite(id : number) {
    return this.http.put<any>(AppSettings.host + '/core/v1/routes/' + id + '/favorite', {})
    .pipe(map(response => {
      return response.data
    }));
  }

  replaceTicket(id, tickets) {
    return this.http.put<any>(AppSettings.host + '/core/v1/routes/' + id + '/ticket', {
      "tickets" : tickets
    })
    .pipe(map(response => {
      return response.data
    }));
  }
}
