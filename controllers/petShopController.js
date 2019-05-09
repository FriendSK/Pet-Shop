class PetShop {
    constructor() {
        this.animals = [];
        this.cart = [];
        this.PetShopView = {};
    }

    render() {
        fetch('https://api.myjson.com/bins/119o7u')
            .then(response => response.json())
            .then(json => {
                this.animals = this.parseData(json);
                this.PetShopView = new PetShopView(this.animals, this.cart);
                this.PetShopView.showListOfAnimals();
            })
            .catch(error => console.error(error));
    }

    removeAnimalToCart(id) {
        let removeIndex = this.animals.map(item => item.id).indexOf(id);
        let removedAnimal = this.animals.splice(removeIndex, 1);
        this.cart.push(removedAnimal[0]);

        this.PetShopView.showListOfAnimals();
    }

    delAnimalFromCart(id) {
        let removeIndex = this.cart.map(item => item.id).indexOf(id);
        let removedAnimal = this.cart.splice(removeIndex, 1);
        this.animals.push(removedAnimal[0]);

        this.PetShopView.showListOfAnimals();
    }
    //parsing data from json and create instances of animals
    parseData(data) {
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
}



