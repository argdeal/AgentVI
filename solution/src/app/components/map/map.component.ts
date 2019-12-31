import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { EventService } from "src/app/services/event.service";
import { Camera } from "src/app/models/camera";
import { CamEvent } from "src/app/models/event";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.state";
declare let L;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit, OnDestroy {
  private stateCameras$: Observable<Camera[]>;
  private selectedCamera$: Observable<Camera>;

  private readonly initZoom = [[51.505, -0.11], 13];
  private map; // Leaflet map object

  private mapMarkers = new Map();
  private mapEventsCircles = new Map();

  private camsSubs: Subscription;
  private selectCamSubs: Subscription;
  private camsNotifySubs: Subscription;
  private eventNotifySubs: Subscription;

  private prevSelectedCamera: Camera;

  constructor(
    private store: Store<AppState>,
    private eventService: EventService
  ) {
    this.stateCameras$ = this.store.pipe(select("cameras"));
    this.selectedCamera$ = this.store.pipe(select("selectedCamera"));

    // subscribe to event notifications to draw circles
    this.eventNotifySubs = this.eventService.eventNotification.subscribe(
      data => {
        this.addEventCircle(data.camera, data.event);
      }
    );
  }

  ngOnInit() {
    this.map = L.map("map").setView(...this.initZoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      this.map
    );

    // set markers
    this.camsSubs = this.stateCameras$.subscribe(camsData => {
      camsData["cameras"].forEach(cam => {
        const marker = L.marker(cam.location).addTo(this.map);
        this.mapMarkers.set(cam.name, marker);
      });
    });

    this.selectCamSubs = this.selectedCamera$.subscribe(state => {
      const camera = state["selectedCamera"];
      if (camera) {
        if (this.prevSelectedCamera) {
          this.removePrevCamCirclesFromMap();
        }
        // create for selected cam NEW array of events
        this.mapEventsCircles.set(camera.name, []);

        //zoom map;
        this.zoomCam(camera);

        // emphasize marker
        this.emphasizeMarker(camera.name);

        // update prev camera
        this.prevSelectedCamera = camera;

        // start generating events
        this.eventService.generateEvents(camera, 5000);
      }
    });
  }

  private zoomCam(camera: Camera) {
    this.map.setView(camera.location, 14);
  }

  ngOnDestroy() {
    if (this.camsSubs) {
      this.camsSubs.unsubscribe();
    }

    if (this.selectCamSubs) {
      this.selectCamSubs.unsubscribe();
    }

    if (this.camsNotifySubs) {
      this.camsNotifySubs.unsubscribe();
    }

    if (this.eventNotifySubs) {
      this.eventNotifySubs.unsubscribe();
    }
  }

  addMarker(camera: Camera) {
    const marker = L.marker(camera.location).addTo(this.map);
    this.mapMarkers.set(camera.name, marker);
  }

  private addEventCircle(camera: Camera, evt: CamEvent) {
    // create circle and put it to the Leaflet Map
    const evtCircle = L.circle(evt.location, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 100
    }).addTo(this.map);

    // update camera Map objects
    this.mapEventsCircles.get(camera.name).push(evtCircle);
  }

  private createPopupContent(content) {
    if (content) {
      return `<strong>${content}</strong>`;
    } else {
      return "";
    }
  }

  private emphasizeMarker(camName) {
    const popupContent = this.createPopupContent(camName);
    this.mapMarkers.forEach((value, key) => {
      let marker = this.mapMarkers.get(key);
      if (key === camName) {
        marker.bindPopup(popupContent).openPopup();
      } else {
        marker.bindPopup("");
      }
    });
  }

  private removePrevCamCirclesFromMap() {
    // remove all circles from real map
    const arrCircles = this.mapEventsCircles.get(this.prevSelectedCamera.name);
    arrCircles.forEach(circle => {
      this.map.removeLayer(circle);
    });

    // empty this array of circles
    arrCircles.length = 0;
  }
}
