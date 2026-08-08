import express from "express"
import { createProduct, deleteProduct, getAllproducts, getproductByID, searchProducts, updateProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get("/", getAllproducts)

productRouter.get("/trnding",(req, res)=>{
    res.json(
        {message :"Trending products encpoint"}
    )
})

productRouter.post("/",createProduct)

productRouter.get("/search/:query", searchProducts)

productRouter.get("/:productID", getproductByID)

productRouter.delete("/:productID",deleteProduct)

productRouter.put("/:productID",updateProduct) 

export default productRouter