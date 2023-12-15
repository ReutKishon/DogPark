// gender enum
export enum DogGender {
  Male = "Male",
  Female = "Female",
}

export interface Dog {
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

export interface Park {}
