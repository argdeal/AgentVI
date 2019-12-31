import { createReducer, on } from "@ngrx/store";
import { initializeState } from "../state/app.state";
import { selectCamera } from "../actions/selectedCamera.actions";

export const initialState = initializeState();

const _selectedCameraReducer = createReducer(
  initialState,
  on(selectCamera, (state, { selectedCam }) => ({
    ...state, 
    selectedCamera: selectedCam
  }))
);

export function selectedCameraReducer(state, action) {
  return _selectedCameraReducer(state, action);
}