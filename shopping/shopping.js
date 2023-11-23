const card = document.getElementsByClassName("card");
const btnekle = document.getElementsByClassName("ekle");
const btncart = document.querySelector(".btn-cart");
const cartlist = document.querySelector(".shopping-cart-list");

// Ürün listesini tutan dizi
let shoppingList = [];

class Shopping {
    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.image = image;
    }
}

class UI {
    addToCard(shopping) {
        const listItem = document.createElement("div");
        listItem.classList = "list-item";
        listItem.innerHTML += `
            <div class="row align-items-center text-white-50">
                <div class="col-md-3">
                    <img src="${shopping.image}" class="img-fluid">
                </div>
                <div class="col-md-5">
                    <div class="title">${shopping.title}</div>
                </div>
                <div class="col-md-2 ml-3">
                    <div class="price ml-3">${shopping.price} <br>
                    </div>
                </div>
                <div class="col-md-2 d-flex">
                    <button class="btn btn-delete text-bg-danger" data-index="${shoppingList.length}">sil</button>
                </div>
            </div>
        `;
        cartlist.appendChild(listItem);

        // Shopping listesine ekle
        shoppingList.push(shopping);

        // Ürün sayısını ve toplam tutarı güncelle
        this.updateCartInfo();

        // "Sil" butonlarına olay dinleyicisi ekle
        this.setupRemoveButtons();
    }

    updateCartInfo() {
        // Toplam tutarı ve ürün sayısını güncelle
        let total = 0;
        if (shoppingList.length > 0) {
            total = shoppingList.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
        }

        // Güncellenmiş değerleri ekrana yansıt
        // Örnek olarak:
        // totalAmount.textContent = `${total.toFixed(2)} ₺`;
        // itemCount.textContent = shoppingList.length;
    }

    setupRemoveButtons() {
        let btnremove = document.querySelectorAll(".btn-delete");

        for (let i = 0; i < btnremove.length; i++) {
            btnremove[i].addEventListener("click", (e) => {
                // data-index özelliği üzerinden hangi ürünün silindiğini belirle
                let index = e.target.dataset.index;
                if (index !== undefined) {
                    // Ürünü listeden kaldır
                    shoppingList.splice(index, 1);

                    // UI'yı güncelle
                    this.updateCartInfo();

                    // Listeden öğeyi kaldır
                    e.target.parentElement.parentElement.parentElement.remove();
                }
            });
        }
    }
}

// UI sınıfını oluştur
let ui = new UI();

for (let i = 0; i < card.length; i++) {
    btnekle[i].addEventListener("click", function (e) {
        let title = card[i].getElementsByClassName("card-title")[0].textContent;
        let price = card[i].getElementsByClassName("ücret")[0].textContent;
        let image = card[i].getElementsByClassName("card-img-top")[0].src;

        let shopping = new Shopping(title, price, image);
        ui.addToCard(shopping);

        e.preventDefault();
    });
}

function cartToggle() {
    btncart.addEventListener("click", function () {
        cartlist.classList.toggle("d-block");
    });
}
cartToggle();





    
