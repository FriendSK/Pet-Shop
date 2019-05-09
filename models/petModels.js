class Pet  {
    constructor (price, color) {
        this.id = Math.floor(Math.random() * 1000);
        this.price = price;
        this.color = color;
    }
}

class Dog extends Pet {
    constructor(name, price, color){
        super(price, color);
        this.name = name;
    }
}

class Cat extends Pet {
    constructor(name, price, color, fluffy){
        super(price, color);
        this.name = name;
        this.fluffy = fluffy;
    }
}

class Hamster extends Pet {
    constructor(price, color, fluffy){
        super(price, color);
        this.fluffy = fluffy;
    }
}