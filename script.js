// ===== ADMIN LOGIN =====
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

function adminLogin() {
    if (adminUser.value === ADMIN_USER && adminPass.value === ADMIN_PASS) {
        alert("Admin Login Success");
        location.href = "admin.html";
    } else alert("Invalid Admin");
}

// ===== USER AUTH =====
function register() {
    localStorage.setItem("user", regUser.value);
    localStorage.setItem("pass", regPass.value);
    alert("Registered");
    location.href = "index.html";
}

function login() {
    if (loginUser.value === localStorage.getItem("user") &&
        loginPass.value === localStorage.getItem("pass")) {
        location.href = "products.html";
    } else alert("Invalid");
}

// ===== PRODUCTS =====
let productList = JSON.parse(localStorage.getItem("products")) || [
    {id:1,name:"Shoes",price:1000,img:"download.jpg"},
    {id:2,name:"Watch",price:2000,img:"https://via.placeholder.com/150"},
    {id:3,name:"Phone",price:10000,img:"https://via.placeholder.com/150"}
];

// ===== CART =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadProducts(){
    let p=document.getElementById("products");
    if(!p) return;
    p.innerHTML="";
    productList.forEach(x=>{
        p.innerHTML+=`
        <div class="product">
        <h3>${x.name}</h3>
        <p>₹${x.price}</p>
        <button onclick="addToCart(${x.id})">Cart</button>
        <button onclick="addToWishlist(${x.id})">❤️</button>
        </div>`;
    });
}

function addToCart(id){
    let item=cart.find(x=>x.id===id);
    if(item) item.qty++;
    else cart.push({...productList.find(x=>x.id===id),qty:1});
    localStorage.setItem("cart",JSON.stringify(cart));
}

function loadCart(){
    let c=document.getElementById("cartItems");
    let t=document.getElementById("total");
    if(!c) return;
    c.innerHTML=""; let sum=0;
    cart.forEach(i=>{
        sum+=i.price*i.qty;
        c.innerHTML+=`<li>${i.name} x${i.qty} = ₹${i.price*i.qty}</li>`;
    });
    t.innerText=sum;
}

// ===== WISHLIST =====
let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];

function addToWishlist(id){
    wishlist.push(productList.find(x=>x.id===id));
    localStorage.setItem("wishlist",JSON.stringify(wishlist));
}

function loadWishlist(){
    let w=document.getElementById("wishlistItems");
    if(!w) return;
    w.innerHTML="";
    wishlist.forEach(i=>{
        w.innerHTML+=`<li>${i.name}</li>`;
    });
}

// ===== ORDER =====
let orders=JSON.parse(localStorage.getItem("orders"))||[];

function placeOrder(){
    let method=document.getElementById("paymentMethod").value;
    orders.push({items:cart,method,status:"Placed"});
    localStorage.setItem("orders",JSON.stringify(orders));
    localStorage.removeItem("cart");
    alert("Order Placed");
    location.href="orders.html";
}

function loadOrders(){
    let o=document.getElementById("ordersList");
    if(!o) return;
    o.innerHTML="";
    orders.forEach((ord,i)=>{
        o.innerHTML+=`<li>Order ${i+1} - ${ord.status} (${ord.method})</li>`;
    });
}

// ===== ADMIN =====
function addProduct(){
    productList.push({
        id:Date.now(),
        name:pname.value,
        price:Number(pprice.value)
    });
    localStorage.setItem("products",JSON.stringify(productList));
    alert("Added");
    loadAdminProducts();
}

function loadAdminProducts(){
    let a=document.getElementById("adminProducts");
    if(!a) return;
    a.innerHTML="";
    productList.forEach(p=>{
        a.innerHTML+=`<li>${p.name} - ₹${p.price}</li>`;
    });
}

function loadAdminOrders(){
    let a=document.getElementById("adminOrders");
    if(!a) return;
    a.innerHTML="";
    orders.forEach((o,i)=>{
        let items=o.items.map(x=>`${x.name} x${x.qty}`).join(", ");
        a.innerHTML+=`
        <li>
        Order ${i+1}<br>
        Items: ${items}<br>
        Payment: ${o.method}<br>
        Status: ${o.status}
        </li><br>`;
    });
}

// ===== LOAD =====
document.addEventListener("DOMContentLoaded",()=>{
    loadProducts();
    loadCart();
    loadWishlist();
    loadOrders();
    loadAdminProducts();
    loadAdminOrders();
    
    function loadProducts(){
    let p=document.getElementById("products");
    if(!p) return;
    p.innerHTML="";

    productList.forEach(x=>{
        p.innerHTML+=`
        <div class="product">
        <img src="${x.img}" width="100%" height="150">
        <h3>${x.name}</h3>
        <p>₹${x.price}</p>
        <button onclick="addToCart(${x.id})">Cart</button>
        <button onclick="addToWishlist(${x.id})">❤️</button>
        </div>`;
    });
}
});