class Inventory {
    constructor() {
      this.products = new Map();
    }
  
    addProduct(name, quantity, price) {
      if (this.products.has(name)) {
        alert(`${name} already exists.`);
        return;
      }
      this.products.set(name, { quantity, price });
    }
  
    updateStock(name, quantity) {
      if (!this.products.has(name)) {
        alert(`${name} not found.`);
        return;
      }
      const product = this.products.get(name);
      product.quantity = quantity;
    }
  
    removeProduct(name) {
      if (!this.products.has(name)) {
        alert(`${name} not found.`);
        return;
      }
      this.products.delete(name);
    }
  
    getInventoryValue() {
      let total = 0;
      for (const product of this.products.values()) {
        total += product.quantity * product.price;
      }
      return total.toFixed(2);
    }
  
    listProducts() {
      return Array.from(this.products.entries());
    }
  }
  
  const store = new Inventory();
  
  function addProduct() {
    const name = document.getElementById('productName').value;
    const qty = parseInt(document.getElementById('productQty').value);
    const price = parseFloat(document.getElementById('productPrice').value);
    if (name && qty && price) {
      store.addProduct(name, qty, price);
      render();
    }
  }
  
  function updateStock() {
    const name = document.getElementById('updateName').value;
    const qty = parseInt(document.getElementById('updateQty').value);
    if (name && qty) {
      store.updateStock(name, qty);
      render();
    }
  }
  
  function removeProduct() {
    const name = document.getElementById('removeName').value;
    if (name) {
      store.removeProduct(name);
      render();
    }
  }
  
  function render() {
    const list = document.getElementById('productList');
    list.innerHTML = '';
    const products = store.listProducts();
    products.forEach(([name, { quantity, price }]) => {
      const li = document.createElement('li');
      li.textContent = `${name} - ${quantity} units @ $${price}`;
      list.appendChild(li);
    });
    document.getElementById('inventoryValue').textContent = `Total Value: $${store.getInventoryValue()}`;
  }
  