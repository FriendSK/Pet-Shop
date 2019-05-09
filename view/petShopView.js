class PetShopView {
    constructor(animals, cart) {
        this.animals = animals;
        this.cart = cart;
    }

    showListOfAnimals() {

        let cats = this.getCats(this.animals);
        let expensive = this.getExpensiveAnimals(this.animals);
        let fluffyOrWhite = this.getfluffyOrWhiteAnimals(this.animals);

        this.createCatsList(cats);
        this.createExpensiveList(expensive);
        this.createfluffyOrWhiteList(fluffyOrWhite);
        this.createCartList(this.cart);

    }
    createCatsList(animals) {
        this.createContent(animals, 0);
    }

    createExpensiveList(animals) {
        this.createContent(animals, 1);
    }

    createfluffyOrWhiteList(animals) {
        this.createContent(animals, 2);
    }


    getCats(animals) {
        let cats = animals.filter(animal => (animal instanceof Cat));
        return cats;
    }

    getExpensiveAnimals(animals) {
        let average = this.getAveragePrice(animals);
        let expensive = animals.filter(animal => parseInt(animal.price) > average);
        return expensive;
    }
    getAveragePrice(animals) {
        let prices = animals.map(animal => animal.price);
        let average = prices.reduce((sum, curr) => parseInt(sum) + parseInt(curr)) / prices.length;
        return average;
    }

    getfluffyOrWhiteAnimals(animals) {
        let fluffyOrWhite = animals.filter(animal => animal.color === 'white' || animal.fluffy);
        return fluffyOrWhite;
    }

    // creating list with content of animals from the cart
    createCartList(animals) {
        let cartList = document.querySelector('.cart-list');
        cartList.innerHTML = '';

        for (let i = 0; i < animals.length; i++) {

            let li = document.createElement('li');
            let btn = document.createElement('input');
            btn.type = 'button';
            btn.value = 'Delete';
            btn.addEventListener('click', () => myPetShop.delAnimalFromCart(animals[i].id));

            let name = animals[i].name ? animals[i].name : 'Hamster';
            li.innerHTML = `${name} - $${animals[i].price} `
            li.appendChild(btn);
            cartList.appendChild(li);
        }
    }

    //creating  list with content of animals
    createContent(animals, index) {
        let getAnimalsList = document.querySelectorAll('.list');
        getAnimalsList[index].innerHTML = '';

        for (let i = 0; i < animals.length; i++) {

            let li = document.createElement('li');
            let btn = document.createElement('input');
            btn.type = 'button';
            btn.value = 'Add to Cart';
            btn.addEventListener('click', () => myPetShop.removeAnimalToCart(animals[i].id));

            let name = animals[i].name ? animals[i].name : 'Hamster';
            li.innerHTML = `${name} - $${animals[i].price} `;
            li.appendChild(btn);
            getAnimalsList[index].appendChild(li);
        }
    }
}

