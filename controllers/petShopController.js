class PetShop {
    constructor() {
        this.animals = [];
        this.cats = [];
        this.expensive = [];
        this.fluffyOrWhite = [];
        this.cart = [];
        this.PetShopView = new PetShopView();
    }

    init() {
        fetch('https://api.jsonbin.io/b/5cd82271c059b662551d3ac9',
            {
                method: 'GET',
                headers: { 'secret-key': '$2a$10$mlpQded4G2YkJLS9U5/m.eDAMES2pDQgtY79Btaq/6FwrTowAnkYW' }
            })
            .then(response => response.json())
            .then(json => {
                this.animals = this.createAnimals(json);
                this.getListOfAnimals(this.animals);
                this.createListsOfAnimals();
                this.PetShopView.initClicks();
            })
            .catch(error => console.error(error));
    }

    getListOfAnimals(animals) {
        this.cats = this.getCats(animals);
        this.expensive = this.getExpensiveAnimals(animals);
        this.fluffyOrWhite = this.getfluffyOrWhiteAnimals(animals);
    }

    createListsOfAnimals() {
        this.PetShopView.createCatsList(this.cats);
        this.PetShopView.createExpensiveList(this.expensive);
        this.PetShopView.createfluffyOrWhiteList(this.fluffyOrWhite);
        this.PetShopView.createCartList(this.cart);
    }

    removeAnimalToCart(id) {
        let removeIndex = this.animals.map(animal => animal.id).indexOf(id);
        let removedAnimal = this.animals.splice(removeIndex, 1);

        this.cart.push(removedAnimal[0]);
        this.caclQuantity(this.cart);
        this.calcSum(this.cart);
        this.getListOfAnimals(this.animals);

        this.createListsOfAnimals();
        this.PetShopView.showConfirm();

    }

    delAnimalFromCart(id) {
        let removeIndex = this.cart.map(animal => animal.id).indexOf(id);
        let removedAnimal = this.cart.splice(removeIndex, 1)
        this.animals.push(removedAnimal[0]);
        this.caclQuantity(this.cart);
        this.calcSum(this.cart);
        this.getListOfAnimals(this.animals);
        this.createListsOfAnimals();
    }



    getCats(animals) {
        return animals.filter(animal => (animal instanceof Cat));
    }

    getExpensiveAnimals(animals) {
        let average = this.getAveragePrice(animals);
        if (animals.length === 1) return animals;
        return animals.filter(animal => parseInt(animal.price) > average);
    }
    getAveragePrice(animals) {
        let prices = animals.map(animal => animal.price);
        if (prices.length === 0) return;
        else {
            return prices.reduce((sum, curr) => parseInt(sum) + parseInt(curr)) / prices.length;
        }
    }

    getfluffyOrWhiteAnimals(animals) {
        return animals.filter(animal => animal.color === 'white' || animal.fluffy);
    }

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

    caclQuantity(cart) {
        let div = document.querySelector('.badge');
        div.textContent = cart.length;
    }

    calcSum(animals) {
        let div = document.querySelector('.cart__total > span');
        let cost = animals.map((animal) => animal.price);
        if (cost.length === 0) div.textContent = 0;
        else {
            div.textContent = cost.reduce((sum, curr) => parseInt(sum) + parseInt(curr));
        }
    }

    addAnimal() {
        this.addAnimalToShop(this.animals);
    }

    addAnimalToShop(animals) {
        let input = document.querySelectorAll('input');
        let select = document.querySelector('select').value;
        let name = input[0].value;
        let price = parseFloat(input[1].value);
        let color = input[2].value;
        let fluffy = input[3].checked;

        if (select === 'Cat')
            animals.push(new Cat('Cat '+ name, price, color, fluffy));

        else if (select === 'Dog')
            animals.push(new Dog('Dog '+ name, price, color, fluffy));

        else{
            animals.push(new Hamster(price, color, fluffy));
        }
        this.PetShopView.closeForm();
        this.PetShopView.clearForm();
        this.getListOfAnimals(this.animals);
        this.createListsOfAnimals();
    }
}























// fetch('https://api.jsonbin.io/b/5cd82271c059b662551d3ac9',
// {
//     method: 'PUT',
//     headers: { 'Content-type': 'application/json', 'secret-key': '$2a$10$mlpQded4G2YkJLS9U5/m.eDAMES2pDQgtY79Btaq/6FwrTowAnkYW' },
//     body: JSON.stringify(select)
// })
// .then(response => response.json())
// .then(json => console.log(json))
// .catch(error => console.error(error));
// fetch('https://api.jsonbin.io/b/5cd82271c059b662551d3ac9',
// {
//     method: 'GET',
//     headers: { 'secret-key': '$2a$10$mlpQded4G2YkJLS9U5/m.eDAMES2pDQgtY79Btaq/6FwrTowAnkYW' }
// })
// .then(response => response.json())
// .then(json => console.log(json))
// }