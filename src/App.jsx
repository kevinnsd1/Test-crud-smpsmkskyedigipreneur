// src/App.jsx
import React, { useEffect, useState } from "react";
import { db } from "./backend/firebaseConfig"; // Import database
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState({ name: "", price: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsList = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsList);
  };

  // Add product
  const addProduct = async () => {
    if (!input.name || !input.price) return;
    await addDoc(collection(db, "products"), input);
    fetchProducts();
    setInput({ name: "", price: "", description: "" });
  };

  // Edit product
  const editProduct = (product) => {
    setInput(product);
    setIsEditing(true);
    setCurrentId(product.id);
  };

  // Update product
  const updateProduct = async () => {
    const productRef = doc(db, "products", currentId);
    await updateDoc(productRef, input);
    fetchProducts();
    setInput({ name: "", price: "", description: "" });
    setIsEditing(false);
    setCurrentId(null);
  };

  // Delete product
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        TES CRUD
      </h1>

      <div className="w-full max-w-xl mx-auto mb-6 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          className="border p-3 w-full rounded mb-4"
          placeholder="Nama Produk"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <input
          type="number"
          className="border p-3 w-full rounded mb-4"
          placeholder="Harga Produk"
          value={input.price}
          onChange={(e) => setInput({ ...input, price: e.target.value })}
        />
        <textarea
          className="border p-3 w-full rounded mb-4"
          placeholder="Deskripsi Produk"
          value={input.description}
          onChange={(e) => setInput({ ...input, description: e.target.value })}
        />

        {isEditing ? (
          <button
            onClick={updateProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
          >
            Update Produk
          </button>
        ) : (
          <button
            onClick={addProduct}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
          >
            Tambah Produk
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <img
              src={`https://via.placeholder.com/150?text=${product.name}`}
              alt={product.name}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">Rp {product.price}</p>
            <div className="flex justify-between">
              <button
                onClick={() => editProduct(product)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
