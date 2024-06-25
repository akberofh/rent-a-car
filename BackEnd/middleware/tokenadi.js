const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Example route to add product to basket
app.post('/api/products/products', authenticateToken, (req, res) => {
  const { product_id, user_id } = req.body;
  if (user_id !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized user' });
  }

  // Sepete ekleme işlemleri burada yapılır
  // Örneğin, user_id ve product_id kullanarak bir ürün ekleme işlemi gerçekleştirin
  console.log(`Kullanıcı ${user_id}, ürün ${product_id} ekledi.`);
  
  res.json({ message: 'Ürün sepete eklendi' });
});

// Example server setup
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
