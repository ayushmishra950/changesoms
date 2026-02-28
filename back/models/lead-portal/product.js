const mongoose = require("mongoose");

// Define the schema
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },
    },
    { timestamps: true } // createdAt and updatedAt
);

// Export the model
module.exports = mongoose.model("Product", productSchema);