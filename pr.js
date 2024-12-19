document.addEventListener('DOMContentLoaded', function () {
    const profileDisplay = document.getElementById('profile-display');
    const profileForm = document.getElementById('profile-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const editProfileButton = document.getElementById('edit-profile-button');
    const cancelEditButton = document.getElementById('cancel-edit-button');
    const displayName = document.getElementById('display-name');
    const displayEmail = document.getElementById('display-email');
    const displayPhone = document.getElementById('display-phone');

    loadProfileData();

    editProfileButton.addEventListener('click', function () {
        profileDisplay.style.display = 'none';
        profileForm.style.display = 'block';
        nameInput.value = displayName.textContent;
        emailInput.value = displayEmail.textContent;
        phoneInput.value = displayPhone.textContent;
    });

    cancelEditButton.addEventListener('click', function () {
        profileForm.style.display = 'none';
        profileDisplay.style.display = 'block';
    });

    profileForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newName = nameInput.value;
        const newEmail = emailInput.value;
        const newPhone = phoneInput.value;

        displayName.textContent = newName;
        displayEmail.textContent = newEmail;
        displayPhone.textContent = newPhone;

        saveProfileData(newName, newEmail, newPhone);

        profileForm.style.display = 'none';
        profileDisplay.style.display = 'block';
    });


    const addProductButton = document.getElementById('add-product-button');
    const addProductFormContainer = document.getElementById('add-product-form-container');
    const productForm = document.getElementById('add-product-form');
    const cancelAddProductButton = document.getElementById('cancel-add-product-button');
    const removeProductImageButton = document.getElementById('remove-product-image');
    const productImageInput = document.getElementById('product-image');

    addProductButton.addEventListener('click', function () {
        addProductFormContainer.style.display = 'block';
    });

    cancelAddProductButton.addEventListener('click', function () {
        addProductFormContainer.style.display = 'none';
    });

    removeProductImageButton.addEventListener('click', function() {
         productImageInput.value = '';
    });



    productForm.addEventListener('submit', function (event) {
        event.preventDefault();
         const productCategory = document.getElementById('product-category').value;
         const productRarity = document.getElementById('product-rarity').value;
         const productDescription = document.getElementById('product-description').value;
        const file = productImageInput.files[0];
         let productData = {
            category: productCategory,
            rarity: productRarity,
            description: productDescription,
        };
        if (file) {
            const reader = new FileReader();
                reader.onload = function (e) {
                    productData.image = e.target.result;
                   sendProductData(productData);
                   addProductFormContainer.style.display = 'none';
                }
                reader.readAsDataURL(file);
        } else {
                sendProductData(productData);
                addProductFormContainer.style.display = 'none';
        }

    });

   function sendProductData(productData) {
  
        console.log('Данные товара для администрации:', productData);
        alert('Товар отправлен на обработку администрации!')
    }

    function saveProfileData(name, email, phone) {
        const profileData = {
            name: name,
            email: email,
            phone: phone,
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));
    }

    function loadProfileData() {
        const storedProfileData = localStorage.getItem('profileData');
        if (storedProfileData) {
            try {
                const profileData = JSON.parse(storedProfileData);
                if (profileData && profileData.name && profileData.email && profileData.phone) {
                    displayName.textContent = profileData.name;
                    displayEmail.textContent = profileData.email;
                    displayPhone.textContent = profileData.phone;
                }
            } catch (e) {
                console.error('Error parsing profile data from localStorage:', e);
            }
        }
    }
});
function sendProductData(productData) {
    fetch('http://127.0.0.1:5000/send-product-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else {
            alert('Ошибка: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка при отправке товара.');
    });
}
