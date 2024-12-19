const products = [
  {
      id: 1,
      name: "iPhone X 64GB",
      category: "electronics",
      rarity: "common",
      image: "https://cache3.youla.io/files/images/780_780/5e/52/5e5273b8cf689a7d124e2dc6.jpg",
      description: "Отличный смартфон с хорошей камерой и производительностью. Идеален для повседневного использования.",
      contact: "john.doe@example.com",
      phone: "+79001234567"
  },
  {
      id: 2,
      name: "Куртка-бомбер Ferгari",
      category: "clothing",
      rarity: "rare",
      image: "https://i.etsystatic.com/32347205/r/il/1d518a/3589329336/il_570xN.3589329336_9j0w.jpg",
      description: "Стильная куртка-бомбер от Ferrari, отличное состояние, подойдет для любого случая.",
      contact: "jane.smith@example.com",
      phone: "+79112345678"
  },
  {
      id: 3,
      name: "Преступление и наказание",
      category: "books",
      rarity: "common",
      image: "https://cache3.youla.io/files/images/780_780/5a/67/5a67949e9380001d2559e5f3.jpg",
      description: "Классическое произведение Ф.М. Достоевского. Погрузитесь в мир философских размышлений и психологических переживаний.",
      contact: "booklover@example.com",
      phone: "+79223456789"
  },
  {
      id: 4,
      name: "Винтажное колье",
      category: "other",
      rarity: "unique",
      image: "https://cs2.livemaster.ru/storage/e1/99/d015cfd86bea8f12ea75bf93cb6f--vintazh-kole-1928-jewelry-prekrasnaya-meri.jpg",
      description: "Уникальное винтажное колье, изысканный аксессуар для особого случая.",
      contact: "vintagestyle@example.com",
      phone: "+79334567890"
  },
  {
      id: 5,
      name: "Наушники Marshall Major IV",
      category: "electronics",
      rarity: "common",
      image: "https://doctorhead.ru/upload/resize_cache/iblock/0c9/676_560_1/Marshall_major_4_1.jpg",
      description: "Качественные наушники с отличным звуком и удобной конструкцией. Наслаждайтесь любимой музыкой в любое время.",
      contact: "musicfan@example.com",
      phone: "+79445678901"
  },
  {
      id: 6,
      name: "Гитара Gretsch G6122-1962",
      category: "electronics",
      rarity: "unique",
      image: "https://rvb-img.reverb.com/image/upload/s--9US3mJhH--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1441136037/erfdprvvozdx9xck5qgd.jpg",
      description: "Легендарная гитара Gretsch G6122-1962. Идеально подойдет для коллекционеров и профессиональных музыкантов. Состояние отличное.",
      contact: "guitarcollector@example.com",
      phone: "+79556789012"
  },
  {
      id: 7,
      name: "Arctic Monkeys виниловая пластинка",
      category: "other",
      rarity: "rare",
      image: "https://avatars.mds.yandex.net/get-mpic/4322217/img_id474137855597279637.png/orig",
      description: "Редкая виниловая пластинка группы Arctic Monkeys, для ценителей аналогового звука и коллекционеров.",
      contact: "vinylfan@example.com",
      phone: "+79667890123"
  },
  {
      id: 8,
      name: "Кроссовки женские 38 размер",
      category: "clothing",
      rarity: "common",
      image: "https://modof.club/uploads/posts/2023-03/1680221042_modof-club-p-modnie-krossovki-2018-zhenskie-8.jpg",
      description: "Стильные кроссовки для повседневного использования и занятий спортом. Легкие и удобные.",
      contact: "shoeslover@example.com",
      phone: "+79778901234"
  },
  {
      id: 9,
      name: "Подарочная книга Сунь Цзы. Искусство войны",
      category: "books",
      rarity: "rare",
      image: "https://www.lavka-podarkov.ru/upload/iblock/a1c/DSC_6467.JPG",
      description: "Подарочное издание знаменитого трактата Сунь Цзы. Искусство войны. Станет прекрасным подарком для ценителей мудрости и стратегии.",
      contact: "bookseller@example.com",
      phone: "+79889012345"
  }
];

function displayProducts(productsToDisplay) {
  const productGrid = document.getElementById('product-grid');
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

      const favoriteButton = document.createElement('button');
      favoriteButton.textContent = 'В избранное';
      favoriteButton.classList.add('favorite-button');

      favoriteButton.addEventListener('click', (event) => {
          event.preventDefault();
          addToFavorites(product);
          window.location.href = 'k.html';
      });

      imageContainer.appendChild(imageElement);
      productContent.appendChild(imageContainer);
      productContent.appendChild(nameElement);
      productContent.appendChild(categoryElement);
      productContent.appendChild(rarityElement);
      productContent.appendChild(favoriteButton);
      productElement.appendChild(productContent);
      productLink.appendChild(productElement);
      productGrid.appendChild(productLink);
  });
}

function addToFavorites(product) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(product);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

document.addEventListener('DOMContentLoaded', () => {
  displayProducts(products);

  const applyFiltersButton = document.getElementById('apply-filters');
  applyFiltersButton.addEventListener('click', () => {
      const selectedCategory = document.getElementById('category').value;
      const selectedRarity = document.getElementById('rarity').value;

      const filteredProducts = products.filter(product => {
          const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
          const rarityMatch = selectedRarity === '' || product.rarity === selectedRarity;

          return categoryMatch && rarityMatch;
      });

      displayProducts(filteredProducts);
  });

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm)
      );
      displayProducts(filteredProducts);
  });
});
