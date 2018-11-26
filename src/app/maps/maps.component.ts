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

  //private _markersURL = 'assets/markers.json';
  private _markersURL = 'http://localhost:8080/users/5bf6b281f3212b5d49f877a8';
  
  private _markers: any;
  private latitude: any;
  private longitude: any;
  private isHidden = false;

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
        result.markerList.forEach(
          marker => this.putMarkerOnMap({latitude : marker.latitude, longitude: marker.longitude }, marker.content)
        );
        this._markers = result.markers;
    });
  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
    let item = {
      position: {latitude : this.latitude, longitude : this.longitude},
      visitInfo: {content: "conteudo pesquisado"}
    };
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
    
    navigator.geolocation.getCurrentPosition(function(position) {
      let options = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      console.log(options.center);
    })
    
    // Renderiza map e define eventos default
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: {lat: -27.5973, lng: -48.5499},
      zoom: 12
    });
   
    google.maps.event.addListener(this.map, "click", (e) => {
      let markerPosition = {
        "latitude" : e.latLng.lat(),
        "longitude" : e.latLng.lng()
      }
      let visitInfo = { content : "Clicado" }
      this.saveMarker(markerPosition, visitInfo);
    });
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
