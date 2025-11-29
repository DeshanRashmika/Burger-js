function Home() {
    fetch("components/login/login.html").then(res => res.text()).then(data => {
        document.getElementById("root").innerHTML = data;
    });

    fetch("components/navbar/navbar.html").then(res => res.text()).then(data => {
        document.getElementById("root").innerHTML = data;
    });

    fetch("components/login/login.html").then(res => res.text()).then(data => {
        document.getElementById("root").innerHTML = data;
    });

}
fetch("components/footer/footer.html").then(res => res.text()).then(data => {
    document.getElementById("root").innerHTML += data;
});

Home();

function SignIn() {
    try { event && event.preventDefault(); } catch (e) {  }

    const emailEl = document.getElementById('floatingInput') || document.getElementById('email');
    const pwdEl = document.getElementById('floatingPassword') || document.getElementById('password');
    const email = emailEl ? (emailEl.value || '').trim() : '';
    const password = pwdEl ? (pwdEl.value || '') : '';

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    const customer = {
        id: Date.now(),
        email: email,
        password: password,
        loginTime: new Date().toISOString()
    };

    try {
        localStorage.setItem('customer', JSON.stringify(customer));

        let customers = JSON.parse(localStorage.getItem('customers') || '[]');
        customers.push(customer);
        localStorage.setItem('customers', JSON.stringify(customers));
        console.log('Saved login to localStorage (customers):', customers);
    } catch (err) {
        console.warn('Failed to save login to localStorage', err);
    }

    alert("You have successfully signed in!");


    try {
        fetch('http://localhost:3000/save-customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        }).then(r => r.json()).then(res => console.log('server saved customer:', res)).catch(e => console.log('no local save-server available', e));
    } catch (e) { }

    window.location.href = 'components/Home/Home.html';

}
fetch("components/Home/loginNewCustomer.html").then(res => res.text()).then(data => {
    document.getElementById("root").innerHTML += data;
});

function placeOrder() {

    if (cart.length === 0) return;

    const order = {
        id: Date.now(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toLocaleString(),
        status: 'Pending'
    };

    orders.push(order);
    cart = [];
    updateCart();
    updateOrders();

    alert('Order placed successfully!');
    document.getElementById('orders').scrollIntoView({ behavior: 'smooth' });


    fetch("components/placeOrder/place_order.html").then(res => res.text()).then(data => {
        document.getElementById("root").innerHTML = data;
    });
}
function saveCustomer() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const customer = {
        first_name: firstName,
        last_name: lastName
    };

    localStorage.setItem('customer', JSON.stringify(customer));
    alert('Customer information saved!');
}


navigator.geolocation.getCurrentPosition(getCurrentPosition)
function getCurrentPosition(possition) {
    console.log(possition);
} 
