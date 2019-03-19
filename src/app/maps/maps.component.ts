import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { } from 'googlemaps';

import { MarkerService, AlertService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
@Injectable()
export class MapsComponent implements OnInit {

  constructor(private http: HttpClient,
              private markerService: MarkerService,
              private alertService: AlertService) {}

  private _markersURL = 'https://wvapp-user-registration.herokuapp.com/users/5be4321ef3212b2274d55e62';
  
  private latitude: any;
  private longitude: any;
  private isHidden = false;
  private placesCount: any;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  
  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

  ngOnInit() {
    this.loadUserLocations();
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._markersURL)
  }

  loadUserLocations(){
      this.getJSON().subscribe(result => {
        this.placesCount = result.markerList.length;
        result.markerList.forEach(
          marker => this.putMarkerOnMap({latitude : marker.latitude, longitude: marker.longitude }, marker.content)
        );
    });
  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
  }

   setCurrentLocation(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    });
   }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  ngAfterContentInit() {

    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      zoom: 12
    });

    google.maps.event.addListener(this.map, "click", (e) => {
      let markerPosition = {
        "latitude" : e.latLng.lat(),
        "longitude" : e.latLng.lng()
      }
      let visitDate = this.formatDate(new Date());
      let visitInfo = { content : visitDate }
      this.saveMarker(markerPosition, visitInfo);
      this.placesCount++;
    });

    this.setCurrentLocation();
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  
  saveMarker(pos,visitInfo){
    const dbMarker = {
      latitude : pos.latitude,
      longitude : pos.longitude,
      content : visitInfo.content
    }; 

    this.markerService.register(dbMarker)
    .pipe(first()) 
        .subscribe(
          data => {
              this.putMarkerOnMap(pos, dbMarker.content);
              this.alertService.success('Success adding marker', true);
          },
          err => {
              this.alertService.error(err.error);
          });
  }

  putMarkerOnMap(pos, visitInfo){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(pos.latitude, pos.longitude)
    });
    this.addInfoWindow(marker, visitInfo);
  }

  //Change map view style(terrain/satellite/roadmap)
  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  toggleMap() {
    this.isHidden = !this.isHidden;
    this.gmapElement.nativeElement.hidden = this.isHidden;
  }
 
}
