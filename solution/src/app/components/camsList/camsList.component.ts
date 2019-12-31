import { Component } from "@angular/core";
import { Camera } from "../../models/camera";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.state";
import { Observable } from "rxjs";
import { selectCamera } from "src/app/store/actions/selectedCamera.actions";

@Component({
  selector: "app-cams-list",
  templateUrl: "./camsList.component.html",
  styleUrls: ["./camsList.component.scss"]
})
export class CamsListComponent {
  private stateCameras$: Observable<Camera[]>;

  constructor(private store: Store<AppState>) {
    this.stateCameras$ = this.store.pipe(select("cameras"));
  }

  selectCamera(selectedCam) {
    this.store.dispatch(selectCamera({ selectedCam }));
  }
}
