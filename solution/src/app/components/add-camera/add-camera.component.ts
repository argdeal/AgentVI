import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Camera } from 'src/app/models/camera';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { addNewCamera } from '../../store/actions/camera.actions';

@Component({
  selector: 'app-add-camera',
  templateUrl: './add-camera.component.html',
  styleUrls: ['./add-camera.component.scss']
})
export class AddCameraComponent {

  form = this.fb.group({
    name: new FormControl('Regents Park', Validators.required),
    latitude: new FormControl('51.532317', [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]),
    longitude: new FormControl('-0.156942', [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  onSubmit() {
    const newCam: Camera = {
      id: 0,
      name: this.form.value.name,
      location: [ +this.form.value.latitude, +this.form.value.longitude ]
    };
    this.store.dispatch(addNewCamera({newCam}));
  }

}
