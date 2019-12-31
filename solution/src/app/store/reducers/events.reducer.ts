import { createReducer, on } from "@ngrx/store";
import { initializeState } from "../state/app.state";
import { resetEvents, addNewEvent } from '../actions/events.action';

export const initialState = initializeState();

const _eventsReducer = createReducer(
  initialState,
  on(addNewEvent, (state, { newCamEvt }) => ({ 
      cameras: [...state.cameras],
      events: [...state.events, newCamEvt]
    })),
    on(resetEvents, state => ({
        cameras: [...state.cameras],
        events: []      
    }))
);

export function eventsReducer(state, action) {
  return _eventsReducer(state, action);
}