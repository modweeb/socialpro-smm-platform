// خادم API بسيط للتطوير المحلي
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-super-secret-key-for-development';

// Middleware
app.use(cors());
app.use(express.json());

// بيانات تجريبية
const users = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@socialpro.com',
    password: bcrypt.hashSync('123456', 10),
    balance: 1000.00,
    role: 'admin',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: '2',
    username: 'user',
    email: 'user@socialpro.com',
    password: bcrypt.hashSync('123456', 10),
    balance: 150.75,
    role: 'user',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: '3',
    username: 'testuser',
    email: 'test@socialpro.com',
    password: bcrypt.hashSync('123456', 10),
    balance: 89.25,
    role: 'user',
    createdAt: new Date().toISOString(),
    isActive: true
  }
];

const services = [
  {
    id: '1',
    name: 'متابعين إنستغرام عرب',
    category: 'متابعين',
    platform: 'instagram',
    pricePer1000: 3.00,
    minQuantity: 100,
    maxQuantity: 50000,
    description: 'متابعين حقيقيين وعرب بجودة عالية وضمان إعادة التعبئة',
    provider: 'FastProvider',
    isActive: true
  },
  {
    id: '2',
    name: 'مشاهدات يوتيوب',
    category: 'مشاهدات',
    platform: 'youtube',
    pricePer1000: 1.00,
    minQuantity: 100,
    maxQuantity: 500000,
    description: 'مشاهدات حقيقية لمقاطع يوتيوب لتحسين الترتيب',
    provider: 'YTProvider',
    isActive: true
  },
  {
    id: '3',
    name: 'متابعين تيك توك',
    category: 'متابعين',
    platform: 'tiktok',
    pricePer1000: 2.00,
    minQuantity: 100,
    maxQuantity: 50000,
    description: 'متابعين نشطين على تيك توك',
    provider: 'TTProvider',
    isActive: true
  }
];

const orders = [
  {
    id: '1',
    userId: '2',
    serviceId: '1',
    link: 'https://instagram.com/testuser',
    quantity: 1000,
    charge: 3.00,
    startCount: 15000,
    remains: 0,
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: '2',
    serviceId: '2',
    link: 'https://youtube.com/watch?v=abc123',
    quantity: 5000,
    charge: 5.00,
    startCount: 1000,
    remains: 2000,
    status: 'processing',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: '3',
    userId: '3',
    serviceId: '3',
    link: 'https://tiktok.com/@testuser',
    quantity: 500,
    charge: 1.00,
    startCount: 5000,
    remains: 500,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (users.find(u => u.username === username)) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: (users.length + 1).toString(),
      username,
      email,
      password: hashedPassword,
      balance: 0,
      role: 'user',
      createdAt: new Date().toISOString(),
      isActive: true
    };

    users.push(newUser);

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          balance: newUser.balance,
          role: newUser.role,
          createdAt: newUser.createdAt
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username || u.email === username);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          balance: user.balance,
          role: user.role,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        role: user.role,
        createdAt: user.createdAt
      }
    }
  });
});

// Services Routes
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    data: services.filter(s => s.isActive)
  });
});

// Orders Routes
app.post('/api/orders', authenticateToken, (req, res) => {
  try {
    const { serviceId, link, quantity } = req.body;

    const service = services.find(s => s.id === serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    if (quantity < service.minQuantity || quantity > service.maxQuantity) {
      return res.status(400).json({ success: false, message: 'Invalid quantity' });
    }

    const user = users.find(u => u.id === req.user.id);
    const charge = (service.pricePer1000 * quantity) / 1000;

    if (user.balance < charge) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    // Create order
    const newOrder = {
      id: (orders.length + 1).toString(),
      userId: user.id,
      serviceId: service.id,
      link,
      quantity,
      charge,
      startCount: Math.floor(Math.random() * 1000),
      remains: quantity,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.push(newOrder);

    // Deduct balance
    user.balance -= charge;

    res.status(201).json({
      success: true,
      data: newOrder,
      message: 'Order created successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/orders', authenticateToken, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  
  const ordersWithService = userOrders.map(order => ({
    ...order,
    service: services.find(s => s.id === order.serviceId)
  }));

  res.json({
    success: true,
    data: ordersWithService
  });
});

// Dashboard Routes
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  const userOrders = orders.filter(order => order.userId === req.user.id);

  const stats = {
    totalOrders: userOrders.length,
    totalSpent: userOrders.reduce((sum, order) => sum + order.charge, 0),
    activeOrders: userOrders.filter(order => order.status === 'processing' || order.status === 'pending').length,
    completedOrders: userOrders.filter(order => order.status === 'completed').length,
    balance: user.balance
  };

  res.json({
    success: true,
    data: stats
  });
});

// Admin Routes
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }

  const adminStats = {
    totalUsers: users.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.charge, 0),
    pendingOrders: orders.filter(order => order.status === 'pending').length,
    completedOrders: orders.filter(order => order.status === 'completed').length,
    activeServices: services.filter(s => s.isActive).length,
    todayRevenue: orders
      .filter(order => new Date(order.createdAt).toDateString() === new Date().toDateString())
      .reduce((sum, order) => sum + order.charge, 0)
  };

  res.json({
    success: true,
    data: adminStats
  });
});

app.get('/api/admin/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }

  const usersWithStats = users.map(user => {
    const userOrders = orders.filter(order => order.userId === user.id);
    return {
      ...user,
      totalSpent: userOrders.reduce((sum, order) => sum + order.charge, 0),
      ordersCount: userOrders.length
    };
  });

  res.json({
    success: true,
    data: usersWithStats
  });
});

app.get('/api/admin/orders', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }

  const ordersWithDetails = orders.map(order => ({
    ...order,
    user: users.find(u => u.id === order.userId),
    service: services.find(s => s.id === order.serviceId)
  }));

  res.json({
    success: true,
    data: ordersWithDetails
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SocialPro API server running on http://localhost:${PORT}`);
  console.log('📋 Available routes:');
  console.log('   POST /api/auth/register');
  console.log('   POST /api/auth/login');
  console.log('   GET  /api/auth/verify');
  console.log('   GET  /api/services');
  console.log('   POST /api/orders');
  console.log('   GET  /api/orders');
  console.log('   GET  /api/dashboard/stats');
  console.log('   GET  /api/admin/stats');
  console.log('   GET  /api/admin/users');
  console.log('   GET  /api/admin/orders');
  console.log('\n🔑 Test accounts:');
  console.log('   Admin: username=admin, password=123456');
  console.log('   User:  username=user, password=123456');
});