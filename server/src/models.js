const mongoose = require('mongoose');

// 定义 MenuItem Schema
const MenuItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
});

// 定义 Bill Schema
const BillSchema = new mongoose.Schema({
  id: String,
  tableNumber: Number,
  items: [{ 
    menuItem: {
      id: String,
      name: String,
      price: Number,
    },
    quantity: Number
  }],
  totalAmount: Number,
});

// 创建模型
const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
const Bill = mongoose.model('Bill', BillSchema);

module.exports = { MenuItem, Bill };
