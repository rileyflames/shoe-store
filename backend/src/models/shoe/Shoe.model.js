import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: [true, "Color is required"],
    trim: true
  },
  size: {
    type: String,
    required: [true, "Size is required"]
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    min: [0, "Stock cannot be negative"]
  }
}, { _id: false }); // prevent _id in subdocs

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Image URL is required"]
  },
  alt: String,
  isPrimary: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const shoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Shoe name is required"],
    trim: true,
    maxlength: 100
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
    trim: true,
    maxlength: 50
  },
  model: {
    type: String,
    required: [true, "Model is required"],
    trim: true,
    maxlength: 50
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ['sneakers', 'boots', 'dress', 'casual', 'athletic', 'sandals', 'heels'],
    lowercase: true
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ['men', 'women', 'unisex'],
    lowercase: true
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be positive"]
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  variants: [variantSchema],
  images: [imageSchema],
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: 1000
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Shoe = mongoose.model('Shoe', shoeSchema);

export default Shoe;
