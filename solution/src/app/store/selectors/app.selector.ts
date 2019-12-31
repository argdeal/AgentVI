import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const selectCameras = (state: AppState) => state.cameras;
export const selectSelectedCamera = (state: AppState) => state.selectedCamera;
export const selectEvents = (state: AppState) => state.events;

export const getCameras = createSelector(selectCameras, () => {});
export const getSelectedCamera = createSelector(selectSelectedCamera, () => {});
export const getEvents = createSelector(selectEvents, () => {});