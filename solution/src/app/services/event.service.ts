import { Injectable } from '@angular/core';
import { CamEvent, Description } from '../models/event.js';
import { Camera } from '../models/camera.js';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state.js';
import { addNewEvent } from '../store/actions/events.action.js';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly EVENT_DESCRIPTIONS = [
    Description.Accident, 
    Description.Congregation, 
    Description.Suspicious
  ];
  private intervalId = null;
  private _eventNotifier = new Subject<{camera:Camera, event:CamEvent}>();
  public eventNotification = this._eventNotifier.asObservable();

  private static eventCounter = 1;

  constructor(private store: Store<AppState>) { }

  generateEvents(camera: Camera, ms = 20000) {
    // clear previous events
    this.clearPrevEvents();

    // start generating new events
    this.intervalId = window.setInterval(() => {

      // create new event near the camera and notify subscribers
      const newEvt = this.createEvent(camera);

      // for update map circles structures 
      this._eventNotifier.next({
        camera: camera,
        event: newEvt
      });
    }, ms)
  }

  private createEvent(camera: Camera) {
    const newCamEvt: CamEvent = {
      camera_id: camera.id,
      title: `${camera.name}_${EventService.eventCounter++}`,
      time: new Date(),
      location: this._generateRandEventLocation(camera),
      description: this._generateRandEventDescription()
    };
    this.store.dispatch(addNewEvent({ newCamEvt }));
    return newCamEvt;
  }

  private clearPrevEvents() {
    EventService.eventCounter = 1;
    if(this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  private _generateRandEventLocation(camera: Camera) {
    return [
      +camera.location[0] + Math.random() * 0.002 - 0.001,
      +camera.location[1] + Math.random() * 0.002 - 0.001
    ]
  }

  private _generateRandEventDescription() {
    const idx = Math.floor(Math.random() * 3);
    return this.EVENT_DESCRIPTIONS[idx];
  }

}
