import { createAction, props } from '@ngrx/store';
import { Camera } from 'src/app/models/camera';

export const addNewCamera = createAction(
    '[add-new-camera Component] addNewCamera', 
    props<{newCam: Camera}>()
);