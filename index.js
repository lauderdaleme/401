const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟用户数据存储
let users = [
  { id: 1, username: 'john_doe', password: 'password123', smartHomeDevices: [] },
  // 添加更多用户数据...
];

// 处理获取用户智能家居设备数据的请求
app.get('/smart-home/:userId/devices', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ smartHomeDevices: user.smartHomeDevices });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理添加新智能家居设备的请求
app.post('/smart-home/:userId/add-device', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { deviceName, type, powerConsumption } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const newDevice = { id: user.smartHomeDevices.length + 1, deviceName, type, powerConsumption };
    user.smartHomeDevices.push(newDevice);
    res.json({ message: 'Smart home device added successfully', device: newDevice });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理分析能源消耗的请求（示例，实际应用中可能需要更复杂的逻辑）
app.get('/energy-analytics/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    // 示例：计算总能源消耗
    const totalPowerConsumption = user.smartHomeDevices.reduce((sum, device) => sum + device.powerConsumption, 0);

    res.json({ totalPowerConsumption });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
