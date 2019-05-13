class PetShopView {

    createCatsList(animals) {
        this.createContent(animals, '.catList');
    }

    createExpensiveList(animals) {
        this.createContent(animals, '.expensiveList');
    }

    createfluffyOrWhiteList(animals) {
        this.createContent(animals, '.flufOrWhiteList');
    }

    // creating list with content of animals from the cart
    createCartList(animals) {
        let cartWrapper = document.querySelector('.cart__wrapper')
        cartWrapper.innerHTML = '';

        animals.forEach((animal) => {

            let div = document.createElement('div');
            let btn = document.createElement('input');
            btn.type = 'button';
            btn.value = 'X';
            btn.addEventListener('click', () => myPetShop.delAnimalFromCart(animal.id));
            let name = animal.name ? animal.name : 'Hamster';
            div.innerHTML = `${name} - $${animal.price}`
            div.appendChild(btn);
            cartWrapper.appendChild(div);
        })
    }

    //creating  list with content of animals
    createContent(animals, classSelector) {
        let ul = document.querySelector(classSelector);
        ul.innerHTML = '';

        animals.forEach((animal) => {

            let li = document.createElement('li');
            let btn = document.createElement('button');
            btn.value = 'Buy me';
            btn.addEventListener('click', () => myPetShop.removeAnimalToCart(animal.id));

            let name = animal.name ? animal.name : 'Hamster';
            let fluffy = animal.fluffy ? 'fluffy' : 'not fluffy';
            li.innerHTML = `${name} <br/> Cost: $${animal.price} <br/>
                            Color: ${animal.color} <br/> ${fluffy} `;
            li.appendChild(btn);
            ul.appendChild(li);
        })
    }

    //hanging listeners on elements

    initClicks() {
        let cart = document.querySelector('.nav_cart');
        cart.addEventListener('click', this.openCart);
        let closeCart = document.querySelector('.cart__close');
        closeCart.addEventListener('click', this.closeCart);
        let addForm = document.querySelector('.add_animal');
        addForm.addEventListener('click', this.openForm);
        let closeForm = document.querySelector('.form-close');
        closeForm.addEventListener('click', this.closeForm);
    }

    openCart() {
        let cart = document.querySelector('.cart__body');
        cart.style.display = 'block';
    };

    closeCart() {
        let cart = document.querySelector('.cart__body');
        cart.style.display = 'none';
    };

    openForm() {
        let form = document.querySelector('form');
        form.style.display = 'block';
    }

    closeForm() {
        let form = document.querySelector('form');
        form.style.display = 'none';
    }

    clearForm() {
        let input = document.querySelectorAll('input');
        input[0].value = '';
        input[1].value = '';
        input[2].value = '';
        input[3].checked = '';
    }

    //show animation of cart

    showConfirm() {
        let confirm = document.querySelector('.confirm');
        confirm.style.display = 'block';
        let counter = 100;
        const timerId = setInterval(frame, 0.6);
        function frame() {
            if (counter == 10) {
                clearInterval(timerId);
                confirm.style.display = 'none';
            } else {
                counter--;
                confirm.style.transform = `translateY(-${counter}px)`;
                confirm.style.opacity = '.' + counter;
            };
        };
    };
}

