// gender enum
export enum DogGender {
  Male = "Male",
  Female = "Female",
}

interface Dog {
  id: string;
  name: string;
  age: number;
  gender: DogGender;
  imageUri: string;
  owner: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  dogs: Dog[];
  imageUri: string;
}

interface Park {}
