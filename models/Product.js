import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  description: { type: String },
  image: { type: String },
  images: [{ type: String }],
  inStock: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  variants: [{ name: String, options: [String] }],
  tags: [String],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
