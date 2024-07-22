
// gender enum
export enum DogGender {
  Male = "Male",
  Female = "Female",
}

export enum LifeStage {
  Puppy = "Puppy",
  Adult = "Adult",
}
export interface Dog {
  id: string;
  name: string;
  age: number;
  lifeStage: LifeStage;
  gender: DogGender;
  imageName: string;
  user_id: string;
  current_parkId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

export interface Park {
  placeId: string;
  name: string;
  locationCoords: LocationCoords;
  address: string;
  distance: number;
  dogsInPark: Dog[];
}

export interface DogParkPair {
  dogId: string;
  parkId: string;
}

export interface LocationCoords {
  longitude: number;
  latitude: number;
}

export type CreationData<T> = Omit<T, "id">;
