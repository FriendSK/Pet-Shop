class PetShopModel {

    //create instances of animals
    createAnimals(data) {
        let animals = [];
        //make array of animals
        data.dogs.map(item => {
            animals.push(new Dog(item.name, item.price, item.color));
        });
        data.cats.map(item => {
            animals.push(new Cat(item.name, item.price, item.color, item.fluffy));
        });
        data.hamsters.map(item => {
            animals.push(new Hamster(item.price, item.color, item.fluffy));
        });
        return animals;
    }

    //create a new added pet
    createNewAnimal(animals, option, name, price, color, fluffy) {

        if (option === 'Cat')
            animals.push(new Cat('Cat ' + name, price, color, fluffy));

        else if (option === 'Dog')
            animals.push(new Dog('Dog ' + name, price, color, fluffy));

        else {
            animals.push(new Hamster(price, color, fluffy));
        }
        return animals;
    }
}