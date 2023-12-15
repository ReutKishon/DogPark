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
  imageUrl: string;
  ownerId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  dogs: Dog[];
  imageUrl: string;
}

export interface Park { }

// generic interface for Creation model the omits the id field
export type CreationData<T> = Omit<T, "id">;