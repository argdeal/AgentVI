import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CamsListComponent } from './components/camsList/camsList.component';
import { MapComponent } from './components/map/map.component';
import { CamEventsListComponent } from './components/camEventsList/camEventsList.component';
import { AddCameraComponent } from './components/add-camera/add-camera.component';
import { cameraReducer } from './store/reducers/camera.reducer';
import { eventsReducer } from './store/reducers/events.reducer';
import { selectedCameraReducer } from './store/reducers/selectedCamera.reducer';
import { NgrxCamerasListComponent } from './components/ngrx-cameras-list/ngrx-cameras-list.component'

@NgModule({
  declarations: [
    AppComponent,
    CamsListComponent,
    MapComponent,
    CamEventsListComponent,
    AddCameraComponent,
    NgrxCamerasListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      'cameras': cameraReducer,
      'events': eventsReducer,
      'selectedCamera': selectedCameraReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
