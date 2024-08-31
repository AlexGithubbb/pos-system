const fs = require('fs');
const path = require('path');

// 定义JSON文件路径
const activeBillsFilePath = path.join(__dirname, 'data.json'); // json1: 活跃账单
const auditBillsFilePath = path.join(__dirname, 'audit.json'); // json2: 结账账单

// 读取数据文件
const readData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// 写入数据文件
const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const resolvers = {
  Query: {
    // 获取所有菜单项
    getMenuItems: () => {
      const data = readData(activeBillsFilePath);
      return data.menuItems;
    },
    // 根据桌号获取账单
    getBill: (_, { tableNumber }) => {
      const data = readData(activeBillsFilePath);
      return data.bills.find((bill) => bill.tableNumber === tableNumber);
    },
  },
  Mutation: {
    // 创建新账单
    createBill: (_, { tableNumber }) => {
      console.log(tableNumber)
      const data = readData(activeBillsFilePath);

      // 检查是否已经存在活跃账单
      const existingBill = data.bills.find((bill) => bill.tableNumber === tableNumber);
      if (existingBill) {
        throw new Error(`Bill for table ${tableNumber} already exists.`);
      }

      const newBill = {
        id: Date.now().toString(),
        tableNumber,
        items: [],
        totalAmount: 0,
      };

      data.bills.push(newBill);
      writeData(activeBillsFilePath, data); // 将新账单写入json1

      return newBill;
    },
    // 更新账单
    updateBill: (_, { tableNumber, items }) => {
      const data = readData(activeBillsFilePath);
      console.log({tableNumber, items })

      const billIndex = data.bills.findIndex(
        (bill) => bill.tableNumber === tableNumber
      );
      if (billIndex === -1) {
        throw new Error('Bill not found');
      }

      items = items.filter((item) => item.quantity > 0);
      data.bills[billIndex].items = items;
      data.bills[billIndex].totalAmount = items.reduce(
        (total, item) => total + item.menuItem.price * item.quantity,
        0
      );

      writeData(activeBillsFilePath, data); // 将更新后的数据写回json1

      return data.bills[billIndex];
    },
    // 结账
    checkoutBill: (_, { tableNumber }) => {
      const activeData = readData(activeBillsFilePath);
      const auditData = readData(auditBillsFilePath);

      const billIndex = activeData.bills.findIndex(
        (bill) => bill.tableNumber === tableNumber
      );
      if (billIndex === -1) {
        throw new Error('Bill not found');
      }

      const billToCheckout = activeData.bills[billIndex];
      billToCheckout.timestamp = new Date().toISOString(); // 添加时间戳

      // 从活跃账单中移除
      activeData.bills.splice(billIndex, 1);
      writeData(activeBillsFilePath, activeData); // 更新json1

      // 添加到结账账单
      auditData.bills.push(billToCheckout);
      writeData(auditBillsFilePath, auditData); // 更新json2

      return billToCheckout;
    },
  },
};

module.exports = resolvers;