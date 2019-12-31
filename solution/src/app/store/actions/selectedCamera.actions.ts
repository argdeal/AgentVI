import { createAction, props } from '@ngrx/store';
import { Camera } from 'src/app/models/camera';

export const selectCamera = createAction(
    '[Camera List Component] selectCamera', 
    props<{selectedCam: Camera}>()
);
