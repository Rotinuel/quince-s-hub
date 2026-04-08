import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  }],
  total: Number,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
  },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
