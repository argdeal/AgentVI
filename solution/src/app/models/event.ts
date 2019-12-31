export const enum Description {
    Accident = "Accident",
    Congregation = "Congregation",
    Suspicious = "Suspicious"
}

export interface CamEvent {
    camera_id: number;
    title: string;
    time: Date;
    location: Array<number>;
    description: Description;
}