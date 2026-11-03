// Массив для хранения товаров в корзине
let cart = [];

// Функция для сохранения корзины в LocalStorage
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Функция для подсчёта общей стоимости товаров
const calculateTotal = () => {

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    return total;
};

// Функция для отображения корзины
const renderCart = () => {

    const cartItems = document.querySelector("#cart-items");
    const totalElement = document.querySelector("#total-price");

    // Очищаем старое содержимое корзины
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        // Создаём элемент для товара
        const productElement = document.createElement("p");

        productElement.textContent =
            item.name + " — " +
            item.price + " руб. × " +
            item.quantity + " = " +
            (item.price * item.quantity) + " руб.";

        // Создаём кнопку удаления
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Удалить";

        // Добавляем обработчик нажатия
        deleteButton.addEventListener("click", () => {

            // Удаляем товар из массива
            cart.splice(index, 1);

            saveCart();

            // Обновляем корзину
            renderCart();

        });

        // Добавляем товар и кнопку на страницу
        cartItems.appendChild(productElement);
        cartItems.appendChild(deleteButton);

    });

    // Обновляем общую стоимость
    const total = calculateTotal();

    totalElement.textContent = "Итого: " + total + " руб.";
};

// Находим все кнопки добавления товаров в корзину
const buttons = document.querySelectorAll(".add-to-cart");

// Перебираем все найденные кнопки
buttons.forEach(button => {

    button.addEventListener("click", function () {

        const product = button.closest(".product");

        const name = product.dataset.name;
        const price = Number(product.dataset.price);
        const category = product.dataset.category;

        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                category: category,
                quantity: 1
            });
        }

        saveCart();
        renderCart();

    });

});

// Находим кнопку очистки корзины
const clearButton = document.querySelector("#clear-cart");

// Добавляем обработчик нажатия
clearButton.addEventListener("click", () => {

    // Очищаем массив товаров
    cart = [];

    // Сохраняем пустую корзину
    saveCart();

    // Обновляем отображение корзины
    renderCart();

});

// Находим кнопку оплаты
const payButton = document.querySelector("#pay-button");

// Добавляем обработчик нажатия
payButton.addEventListener("click", () => {

    // Проверяем, пуста ли корзина
    if (cart.length === 0) {

        alert("Корзина пуста! Добавьте товары перед оплатой.");

    } else {

        alert("Оплата успешно выполнена! Спасибо за покупку.");

        // Очищаем корзину
        cart = [];

        saveCart();

        // Обновляем отображение корзины
        renderCart();

    }

});

// Находим выпадающий список категорий
const categoryFilter = document.querySelector("#category-filter");

// Находим все карточки товаров
const products = document.querySelectorAll(".product");

// Добавляем обработчик изменения категории
categoryFilter.addEventListener("change", () => {

    // Получаем выбранную категорию
    const selectedCategory = categoryFilter.value;

    // Перебираем все товары
    products.forEach(product => {

        // Получаем категорию текущего товара
        const category = product.dataset.category;

        // Проверяем, подходит ли товар под фильтр
        if (selectedCategory === "all" || category === selectedCategory) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

});

// Загружаем сохранённую корзину из LocalStorage
const savedCart = localStorage.getItem("cart");

if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
}