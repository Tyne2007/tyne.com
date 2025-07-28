// Navegación móvil
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Funcionalidad del carrito

// Actualizar contador del carrito
function updateCartCounter() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const counterElements = document.querySelectorAll('#cart-counter, #mobile-cart-counter');

    counterElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'flex' : 'none';
        if (totalItems > 0) {
            el.classList.add('bounce');
            setTimeout(() => el.classList.remove('bounce'), 500);
        }
    });
}

// Mostrar productos en carrito
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');

    let subtotal = 0;
    let html = '';

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        html += `
            <tr>
                <td><a href="#" onclick="removeItem(${index}); return false;"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.size}</td>
                <td>${item.name}</td>
                <td>Bs. ${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
                <td>Bs. ${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    cartContainer.innerHTML = html || '<tr><td colspan="7">Tu carrito está vacío</td></tr>';
    subtotalElement.textContent = `Bs. ${subtotal.toFixed(2)}`;
    totalElement.textContent = `Bs. ${subtotal.toFixed(2)}`;
}

// Agregar producto desde listado
function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productEl = this.closest('.pro');
            const product = {
                id: parseInt(productEl.dataset.id),
                name: productEl.querySelector('h5').innerText,
                price: parseFloat(productEl.querySelector('h4').textContent.replace('Bs. ', '')),
                quantity: 1,
                image: productEl.querySelector('img').src,
                size: productEl.querySelector('select')?.value || 'M'
            };

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find(item => item.id === product.id && item.size === product.size);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push(product);
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCounter();

            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Añadido!';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1500);
        });
    });
}

// Agregar producto desde sproduct.html
function setupSingleProductAddToCart() {
    const button = document.querySelector('#prodetails .normal');
    if (!button) return;

    button.addEventListener('click', function () {
        const product = {
            id: parseInt(document.querySelector('#prodetails').dataset.id),
            name: document.querySelector('#prodetails h4').textContent,
            price: parseFloat(document.querySelector('#prodetails h2').textContent.replace('Bs. ', '')),
            quantity: parseInt(document.querySelector('#prodetails input[type="number"]').value),
            size: document.querySelector('#prodetails select').value,
            image: document.querySelector('#MainImg').src
        };

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(item => item.id === product.id && item.size === product.size);

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cartItems.push(product);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCounter();
        button.textContent = '✓ Añadido!';
        setTimeout(() => {
            button.textContent = 'Añadir al Carrito';
        }, 2000);
    });
}

// Eliminar producto
function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
    updateCartCounter();
}

// Cambiar cantidad
function updateQuantity(index, newQuantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (newQuantity > 0) {
        cartItems[index].quantity = parseInt(newQuantity);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems();
        updateCartCounter();
    }
}

// Newsletter
function setupNewsletter() {
    document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const messageElement = document.getElementById('message');

        if (!email) return showMessage('Por favor, completa todos los campos.', 'error');
        if (!validateEmail(email)) return showMessage('Por favor, ingresa un correo electrónico válido.', 'error');

        showMessage('¡Gracias! Te has suscrito exitosamente.', 'success');
        this.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = 'message ' + type;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

// Inicializar al cargar
window.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    setupAddToCartButtons();
    setupSingleProductAddToCart();
    if (document.getElementById('cart-items')) displayCartItems();
    setupNewsletter();
});
