import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from 'rxjs';
import { Camera } from 'src/app/models/camera';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { resetEvents } from 'src/app/store/actions/events.action';

@Component({
  selector: "app-cam-events-list",
  templateUrl: "./camEventsList.component.html",
  styleUrls: ["./camEventsList.component.scss"]
})
export class CamEventsListComponent implements OnInit, OnDestroy {
  private selectedCamera$: Observable<Camera>;
  private stateEvents$: Observable<[]>;

  private selectedCam: Camera;
  private selectCamSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    ) {
    this.selectedCamera$ = this.store.pipe(
      select('selectedCamera')
    );    

    this.stateEvents$ = this.store.pipe(
      select('events'),
    );    
  }

  ngOnInit() {
    this.selectCamSubs = this.selectedCamera$.subscribe(state => {
      this.selectedCam = state['selectedCamera'];
      this.store.dispatch(resetEvents());
    });

  }

  ngOnDestroy() {
    if(this.selectCamSubs) {
      this.selectCamSubs.unsubscribe();
    }
  }  
}
