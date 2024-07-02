import { LocationObject } from "expo-location";

// gender enum
export enum DogGender {
  Male = "Male",
  Female = "Female",
}

export interface Dog {
  id: string;
  name: string;
  age: number;
  gender: DogGender;
  imageName: string;
  user_id: string;
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
