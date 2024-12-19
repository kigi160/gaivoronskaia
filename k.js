function addToFavorites(product) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(product);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function checkIfFavorite(product, favoriteButton) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.some(favorite => favorite.id === product.id)) {
        favoriteButton.textContent = 'Добавлено';
        favoriteButton.disabled = true;
    }
}

function displayProducts(productsToDisplay, containerId) {
    const productGrid = document.getElementById(containerId);
    productGrid.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productLink = document.createElement('a');
        productLink.href = `dop.html?id=${product.id}`;

        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const productContent = document.createElement('div');
        productContent.classList.add('product-content');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-image-container');

        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        imageElement.alt = product.name;

        const nameElement = document.createElement('h3');
        nameElement.textContent = product.name;

        const categoryElement = document.createElement('p');
        categoryElement.textContent = `Category: ${product.category}`;

        const rarityElement = document.createElement('p');
        rarityElement.textContent = `Rarity: ${product.rarity}`;

        imageContainer.appendChild(imageElement);
        productContent.appendChild(imageContainer);
        productContent.appendChild(nameElement);
        productContent.appendChild(categoryElement);
        productContent.appendChild(rarityElement);

        productElement.appendChild(productContent);
        productLink.appendChild(productElement);
        productGrid.appendChild(productLink);
    });
}

if (document.querySelector('body').id === 'index-page') {
    document.addEventListener('DOMContentLoaded', () => {
        displayProducts(products, 'product-grid');

        document.getElementById('apply-filters').addEventListener('click', () => {
            const selectedCategory = document.getElementById('category').value;
            const selectedRarity = document.getElementById('rarity').value;

            const filteredProducts = products.filter(product => {
                const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
                const rarityMatch = selectedRarity === '' || product.rarity === selectedRarity;
                return categoryMatch && rarityMatch;
            });

            displayProducts(filteredProducts, 'product-grid');
        });

        document.getElementById('search-input').addEventListener('input', () => {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts, 'product-grid');
        });
    });
}

if (document.querySelector('body').id === 'dop-page') {
    document.addEventListener('DOMContentLoaded', () => {
        const productDetailsContainer = document.getElementById('product-details');
        const productId = parseInt(new URLSearchParams(window.location.search).get('id'));

        function getProductById(id) {
            return products.find(product => product.id === id);
        }

        const product = getProductById(productId);

        if (product) {
            displayProductDetails(product);
        } else {
            productDetailsContainer.textContent = 'Товар не найден';
        }

        function displayProductDetails(product) {
            const productContent = document.createElement('div');
            productContent.classList.add('product-details-content');

            const imageElement = document.createElement('img');
            imageElement.src = product.image;
            imageElement.alt = product.name;
            imageElement.classList.add('dop-page-image');

            const nameElement = document.createElement('h2');
            nameElement.textContent = product.name;

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = product.description;

            const categoryElement = document.createElement('p');
            categoryElement.textContent = `Category: ${product.category}`;

            const rarityElement = document.createElement('p');
            rarityElement.textContent = `Rarity: ${product.rarity}`;

            const contactElement = document.createElement('p');
            contactElement.textContent = `Contact: ${product.contact}`;

            const phoneElement = document.createElement('p');
            phoneElement.textContent = `Phone: ${product.phone}`;

            const favoriteButton = document.createElement('button');
            favoriteButton.textContent = 'В избранное';
            favoriteButton.classList.add('favorite-button');

            favoriteButton.addEventListener('click', (event) => {
                event.preventDefault();
                addToFavorites(product);
                favoriteButton.textContent = 'Добавлено';
                favoriteButton.disabled = true;
            });

            productContent.appendChild(imageElement);
            productContent.appendChild(nameElement);
            productContent.appendChild(categoryElement);
            productContent.appendChild(rarityElement);
            productContent.appendChild(descriptionElement);
            productContent.appendChild(contactElement);
            productContent.appendChild(phoneElement);
            productContent.appendChild(favoriteButton);

            productDetailsContainer.appendChild(productContent);
            checkIfFavorite(product, favoriteButton);
        }
    });
}

if (document.querySelector('body').id === 'k-page') {
    document.addEventListener('DOMContentLoaded', () => {
        const favoriteItemsContainer = document.getElementById('favorite-items');
        const clearFavoriteButton = document.getElementById('clear-favorite-button');

        function displayFavorites() {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            displayProducts(favorites, 'favorite-items');
        }

        displayFavorites();

        clearFavoriteButton.addEventListener('click', () => {
            localStorage.removeItem('favorites');
            favoriteItemsContainer.innerHTML = '';
        });
    });
}
