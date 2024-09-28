// cart.js

document.addEventListener('DOMContentLoaded', () => {
    // Sample cart items
    const cartItems = [
        { id: 1, name: 'Fresh Organic Vegetables', price: 10.00, quantity: 2 },
        { id: 2, name: 'Smart Refrigerator', price: 499.99, quantity: 1 },
        { id: 3, name: 'Latest Smartphone', price: 699.99, quantity: 1 }
    ];

    function updateCart() {
        const cartTableBody = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        let totalPrice = 0;

        cartTableBody.innerHTML = cartItems.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeItem(${item.id})">Remove</button></td>
            </tr>
        `).join('');

        totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }

    window.updateQuantity = function(id, quantity) {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            item.quantity = parseInt(quantity, 10);
            updateCart();
        }
    };

    window.removeItem = function(id) {
        const index = cartItems.findIndex(item => item.id === id);
        if (index > -1) {
            cartItems.splice(index, 1);
            updateCart();
        }
    };

    updateCart();
});
