import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { addNewCamera } from '../../store/actions/camera.actions';
import { Observable } from 'rxjs';
import { Camera } from 'src/app/models/camera';
import { AppState } from 'src/app/store/state/app.state';
import { CamEvent, Description } from 'src/app/models/event';
import { addNewEvent, resetEvents } from 'src/app/store/actions/events.action';

@Component({
  selector: 'app-ngrx-cameras-list',
  templateUrl: './ngrx-cameras-list.component.html',
  styleUrls: ['./ngrx-cameras-list.component.scss']
})
export class NgrxCamerasListComponent {
  stateCameras$: Observable<Camera[]>;
  stateEvents$: Observable<[]>;

  selectedCamera: Camera;
  private static counter = 1;

  constructor(private store: Store<AppState>) { 
    this.stateCameras$ = this.store.pipe(
      select('cameras'),
    );

    this.stateEvents$ = this.store.pipe(
      select('events'),
    );
  }

  addNewCamera() {
    const newCam: Camera = {
      id: 18,
      name: 'Regents Park',
      location: [51.532317, -0.156942]
    };

    this.selectedCamera = newCam;
    this.store.dispatch(addNewCamera({newCam}));
  }

  addNewEvent() {
    const newCamEvt: CamEvent = {
      camera_id: this.selectedCamera.id,
      title: `Event_${NgrxCamerasListComponent.counter++}`,
      time: new Date(),
      location: this.selectedCamera.location,
      description: Description.Accident
    }
    this.store.dispatch(addNewEvent({ newCamEvt }));
  }


  resetEvents() {
    this.store.dispatch(resetEvents());
  }


}
