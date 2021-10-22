import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import MarkerClusterer from '@google/markerclustererplus';
import {Locations} from '../../data';

@Component({
  selector: 'app-farm-view',
  templateUrl: './farm-view.component.html',
  styleUrls: ['./farm-view.component.css'],
})
export class FarmViewComponent implements AfterViewInit {
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  @ViewChild('mavericks', {static: true}) ngPartial: ElementRef;

  map: google.maps.Map;
  center = new google.maps.LatLng(15, 77);
  marker: google.maps.Marker;
  mapMarkers: any = [];
  markerCluster: any;

  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    disableDefaultUI: true,
  };

  infoWindow: google.maps.InfoWindow;

  ngAfterViewInit() {
    this.mapInit();
  }

  mapInit() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    this.infoWindow = new google.maps.InfoWindow();

    for (let location of Locations) {
      const tempMarker = new google.maps.Marker({
        position: {lat: location.lat, lng: location.lng},
        map: this.map,
        title: 'Hello World!',
        icon: `assets/images/${location.type}.png`,
        label: {
          text: location.asset.toString(),
          color: 'black',
          fontSize: '12',
        },
      });
      tempMarker.addListener(
        'click',
        ((tempMarker, map, infoWindow) => {
          return () => {
            infoWindow.setContent(`
            <div  style="width: 150px; box-shadow: 3px 5px 15px grey; padding:2px 7px">
              <h3 style="text-decoration:underline">
                Plant Details
              </h3>
              <p>
                <b>Type:</b> ${location.type.toUpperCase()} Plant
              </p>
              <p>
                <b>Assets:</b> ${location.asset}
              </p>
              </div>
            `);
            infoWindow.open(map, tempMarker);
          };
        })(tempMarker, this.map, this.infoWindow),
      );
      this.mapMarkers.push(tempMarker);
    }
    this.markerCluster = new MarkerClusterer(this.map, this.mapMarkers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    });
  }
}
