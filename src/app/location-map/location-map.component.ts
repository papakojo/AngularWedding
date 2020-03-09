import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit, AfterViewInit {

  constructor() {
    this.mapOptions
  }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  @ViewChild(MapMarker) marker:MapMarker;
  @ViewChild('map') el:ElementRef;
 // @ViewChild(Map) map: GoogleMap;

  markerOptions = {
    draggable: false,
    icon: {
      url: "./assets/images/locationPin.svg",

      scaledSize: new google.maps.Size(65, 65), // scaled size
      // origin: new google.maps.Point(0,0), // origin
      // anchor: new google.maps.Point(0, 0) // anchor
    },
    infoWindow: this.infoWindow,
    title: "Hello World!"

  };

  center = { lat:  43.656336, lng: -79.380363 };
  mapOptions: google.maps.MapOptions = { mapTypeId: 'roadmap', zoomControl: true, zoom: 16, center: this.center,gestureHandling:'greedy' };


  //methods

  markerPositions: google.maps.LatLngLiteral[] = [this.center];

  zoom = 18;
  display?: google.maps.LatLngLiteral;


  items: google.maps.MapTypeStyle

  addMarker(event: google.maps.MouseEvent) {

  

    this.markerPositions.push(event.latLng.toJSON());

  }
  addOptions(mapOptions: google.maps.MapOptions) {
    mapOptions.backgroundColor = '#242f3e';

  }


  addStyles(st: google.maps.StyledMapType) {

  }


  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
  mapWindow = "<mat-card>Simple card</mat-card>"
windowOptions: google.maps.InfoWindowOptions={content:this.mapWindow}


  removeLastMarker() {
    this.markerPositions.pop();
  }




  ngOnInit(): void {
  
  }

  ngAfterViewInit(){
    this.openInfoWindow(this.marker)
   

  }




  

}
