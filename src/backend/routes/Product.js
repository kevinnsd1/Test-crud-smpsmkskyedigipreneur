// src/backend/routes/products.js
import express from "express";
import { db } from "../firebaseConfig.js"; // Pastikan Anda mengimpor db dari firebaseConfig
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil produk" });
  }
});

// Get a single product
router.get("/:id", async (req, res) => {
  try {
    const docRef = doc(db, "products", req.params.id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }
    res.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil produk" });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const { nama, harga, deskripsi } = req.body;
    const docRef = await addDoc(collection(db, "products"), {
      nama,
      harga,
      deskripsi,
    });
    res.status(201).json({ id: docRef.id, nama, harga, deskripsi });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menambahkan produk" });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const { nama, harga, deskripsi } = req.body;
    const docRef = doc(db, "products", req.params.id);
    await updateDoc(docRef, { nama, harga, deskripsi });
    res.json({ id: req.params.id, nama, harga, deskripsi });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui produk" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const docRef = doc(db, "products", req.params.id);
    await deleteDoc(docRef);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus produk" });
  }
});

export default router;
