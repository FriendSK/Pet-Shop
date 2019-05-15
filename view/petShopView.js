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
        let cartWrapper = document.querySelector('.cart_wrapper')
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
            let btn = document.createElement('input');
            btn.className = "btn btn-info";
            btn.value = 'Buy me';
            btn.addEventListener('click', () => myPetShop.addAnimalToCart(animal.id));

            let name = animal.name ? animal.name : 'Hamster';
            let fluffy = animal.fluffy ? 'fluffy' : 'not fluffy';
            li.innerHTML = `${name} <br/> Cost: $${animal.price} <br/>
                            Color: ${animal.color} <br/> ${fluffy} `;
            li.appendChild(btn);
            ul.appendChild(li);
        })
    }

    openCart() {
        let cart = document.querySelector('.cart');
        cart.style.display = 'block';
        document.body.style.overflow = 'auto';
    };

    closeCart() {
        let cart = document.querySelector('.cart');
        cart.style.display = 'none';
        document.body.style.overflow = '';
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
        input[0].classList.remove("is-invalid");
        input[1].classList.remove("is-invalid");
    }

    //show animation of cart
    showConfirm() {
        let confirm = document.querySelector('.confirm');
        confirm.style.display = 'block';
        let counter = 100;
        const timerId = setInterval(frame, 6);
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

