import { Camera } from 'src/app/models/camera';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const camerasKey = 'cameras';
export const selectedCameraKey = 'selectedCamera';
export const eventsKey = 'events';

export interface AppState {
    cameras: Camera[],
    selectedCamera: Camera;
    events: []
}

export const initializeState = () : AppState => {
    return ({
        cameras: [
            { 
                "id": 1,
                "name": "Big Ben Tower",
                "location": [51.5, -0.124658]
            },
            { 
                "id": 2,
                "name": "Westminster Abbey",
                "location": [51.49, -0.127585]
            },
            { 
                "id": 3,
                "name": "Tower Bridge",
                "location": [51.5, -0.075335]
            },
            { 
                "id": 4,
                "name": "London Bridge",
                "location": [51.507, -0.087823]
            },
            { 
                "id": 5,
                "name": "Hide Park",
                "location": [51.507, -0.165838]
            },
            { 
                "id": 6,
                "name": "Buckingham Palace",
                "location": [51.501, -0.141911]
            },
            { 
                "id": 7,
                "name": "Trafalgar Square",
                "location": [51.508, -0.128076]
            }    
        ],
        selectedCamera: null,
        events: []
    });
}
