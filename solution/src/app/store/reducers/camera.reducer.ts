import { createReducer, on } from "@ngrx/store";
import { initializeState } from "../state/app.state";
import { addNewCamera } from "../actions/camera.actions";

export const initialState = initializeState();

const _cameraReducer = createReducer(
  initialState,
  on(addNewCamera, (state, { newCam }) => ({ 
    ...state,
    cameras: [...state.cameras, {...newCam, id: state.cameras.length + 1 } ]
  })),
);

export function cameraReducer(state, action) {
  return _cameraReducer(state, action);
}


