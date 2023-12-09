// gender enum
enum DogGender {
  Male = "Male",
  Female = "Female",
}

interface Dog {
  name: string;
  age: number;
  gender: DogGender;
  imageUrl: string;
}

interface User {
  name: string;
  email: string;
  dogs: Dog[];
}

interface Park {}
