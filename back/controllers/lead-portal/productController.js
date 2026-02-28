const Product = require("../../models/lead-portal/product");

/**
 * @desc    Add Product
 * @route   POST /api/products
 * @access  Public / Admin
 */
const addProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name and price are required",
            });
        }

        // Check duplicate name
        const existingProduct = await Product.findOne({ name: name.trim() });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: "Product with this name already exists",
            });
        }

        const product = await Product.create({
            name: name.trim(),
            description,
            price,
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Get All Products
 * @route   GET /api/products
 */
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Get Product By ID
 * @route   GET /api/products/:id
 */
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Invalid product ID",
        });
    }
};

/**
 * @desc    Update Product
 * @route   PUT /api/products/:id
 */

const updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Check duplicate name (if updating name)
        if (name && name !== product.name) {
            const existingProduct = await Product.findOne({ name: name.trim() });
            if (existingProduct) {
                return res.status(400).json({
                    success: false,
                    message: "Another product with this name already exists",
                });
            }
        }

        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Delete Product
 * @route   DELETE /api/products/:id
 */

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Invalid product ID",
        });
    }
};


module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
