class Dog {
  constructor(dogData) {
    this.id = dogData.dog_id;
    this.name = dogData.name;
    this.ownerId = dogData.user_id;
    this.age = dogData.age;
    this.lifeStage = dogData.lifeStage;
    this.gender = dogData.gender;
  }
}

export default Dog;
