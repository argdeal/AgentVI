import { createAction, props } from '@ngrx/store';
import { CamEvent } from 'src/app/models/event';

export const resetEvents = createAction('[map component] resetEvents')
export const addNewEvent = createAction(
    '[add-new-event Component] addNewEvent', 
    props<{newCamEvt: CamEvent}>()
);