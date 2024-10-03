// Mengambil semua produk dari API
async function fetchProducts() {
    const response = await fetch("/products");
    const products = await response.json();

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price}`;
        productList.appendChild(li);
    });
}

// Membuat produk baru menggunakan API
document.getElementById("product-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const newProduct = {
        name: document.getElementById("name").value,
        price: parseInt(document.getElementById("price").value),
        description: document.getElementById("description").value,
        image: document.getElementById("image").value,
    };

    console.log(JSON.stringify(newProduct))

    await fetch("/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        // req conver object ke json + jadi ke body
        body: JSON.stringify(newProduct)
    });

    // Setelah produk baru dibuat, refresh daftar produk
    fetchProducts();
});

// Memuat produk ketika halaman dimuat
window.onload = () => {
    // fetchProducts();
};
