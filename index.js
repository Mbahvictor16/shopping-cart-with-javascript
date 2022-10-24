
let likeEmoji = document.querySelectorAll('.fa-heart')
let likeCount = document.querySelectorAll('.like-count')
let btn = document.querySelectorAll('.cart-button')
let product = document.querySelectorAll('.product-name')
let price = document.querySelectorAll('.price')
let remove = document.querySelectorAll('.remove')
let shopIcon = document.querySelector('.shop-icon')
let closeCartPage = document.querySelector('#close-cart-page')
let purchase = document.querySelector('#purchase')
let quantityValue = document.querySelectorAll('.quantity-input')

for(var i = 0; i < likeEmoji.length; i++) {
    var emoji = likeEmoji[i]
    emoji.addEventListener('click', likeCounter)
}

for(var i = 0; i < btn.length; i++) {
    var cartBtn = btn[i]
    cartBtn.addEventListener('click', addToCart)
}

for (var i = 0; i < remove.length; i++) {
    var removeBtn = remove[i]
    removeBtn.addEventListener('click', removecartItem)
}

for (var i = 0; i < quantityValue.length; i++) {
    var quantity = quantityValue[i]
    quantity.addEventListener('change', cartTotal)
    quantity.addEventListener('blur', quantityInput)
}

shopIcon.addEventListener('click', showCartPage)
closeCartPage.addEventListener('click', hideCartpage)
purchase.addEventListener('click',purchaseItem)

function likeCounter() {
    var emojiCount = event.target
    var emojiParent = emojiCount.parentElement
    emojiCount.classList.toggle('red')
}

function addToCart() {
    var addBtn = event.target
    var btnParent = addBtn.parentElement.parentElement.parentElement

    var productName = btnParent.querySelectorAll('.product-name')[0].innerText
    var productImg = btnParent.querySelectorAll('img')[0].src
    var productPrice = btnParent.querySelectorAll('.price')[0].innerText
    addItemToCart(productImg, productName, productPrice)
}

function addItemToCart(productImg, productName, productPrice) {
    var tableRow = document.createElement('div')
    tableRow.className = 'table-row'
    var cartProductName = document.querySelectorAll('.cart-product-name')
    for(var i = 0; i < cartProductName.length; i++) {
        if (cartProductName[i].innerText === productName) {
            alert('This item has been added')
            return
        }
    }
    var tableData = `
        <div class="product"><img src="${productImg}"> <span class="cart-product-name">${productName}</span></div>
        <div class="item">${productPrice}</div>
        <div class="quantity"><input class="quantity-input" type="number" value="1"> <button class="remove">Remove</button></div>`

    tableRow.innerHTML = tableData
    var cartTable = document.getElementsByClassName('table-body')[0]
    cartTable.appendChild(tableRow)
    cartCountAdd(tableRow)
    cartTotal()
    var removeBtn = tableRow.querySelector('.remove')
    removeBtn.addEventListener('click', removecartItem)
    tableRow.querySelector('.quantity-input').addEventListener('change', cartTotal)
    tableRow.querySelector('.quantity-input').addEventListener('blur', quantityInput)
}

function removecartItem() {
    var removeItem = event.target
    removeItem.parentElement.parentElement.remove()
    var tableBody = document.querySelector('.table-body')
    var shopCart = document.querySelector('.fa-shopping-cart')
    shopCart.setAttribute('data-cart-count', tableBody.childElementCount)
    cartTotal()
}

function showCartPage() {
    document.querySelector('.table').classList.add('show')
    document.querySelector('.cart-table').classList.add('show')
    document.body.classList.add('static')
}

function hideCartpage() {
    document.querySelector('.table').classList.remove('show')
    document.querySelector('.cart-table').classList.remove('show')
    document.body.classList.remove('static')
}

function cartCountAdd(tableRow) {
    var cartTable = tableRow.parentElement
    var shopCart = document.querySelector('.fa-shopping-cart')
    shopCart.setAttribute('data-cart-count', cartTable.childElementCount)
}

function cartTotal() {
    var total = 0
    var cartItems = document.querySelector('.table-body')
    var cartRows = cartItems.querySelectorAll('.table-row')
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var cartPrice = cartRow.querySelector('.item')
        var price = parseFloat(cartPrice.innerText.replace('$',''))
        var cartQuantity = cartRow.querySelector('.quantity-input')
        var quantity = cartQuantity.value
        total = total + (price * quantity)
    }
    total = Math.round((total*100))/100
    document.querySelector('#total').innerText = `$${total}`
}

function quantityInput() {
    var quantityValue = event.target
    if(isNaN(quantityValue.value) || quantityValue.value <= 0) {
        quantityValue.value = 1
    }
    cartTotal()
}

function purchaseItem() {
    var confirmCheck = confirm('You are about to make purchase')
    if (confirmCheck == true) {
        alert('Your purchase has been successful')
    }
    var tableBody = document.querySelector('.table-body')
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild)
    }
    cartTotal()
    var shopCart = document.querySelector('.fa-shopping-cart')
    shopCart.setAttribute('data-cart-count', tableBody.childElementCount)
}