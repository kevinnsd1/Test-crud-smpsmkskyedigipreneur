import express from "express";
import productRouter from "./routes/Product.js"; // Pastikan nama file yang benar

const app = express();
const port = 5000;

app.use(express.json()); // Middleware untuk parsing JSON

// Rute untuk produk
app.use("/api/products", productRouter);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
