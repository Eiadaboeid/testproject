const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { authenticateToken, requireAdmin, requireBusinessOrAdmin } = require('../middleware/auth');

const router = express.Router();

// In-memory storage (replace with database in production)
let drivers = [];
let favorites = {};
let ratings = {};

// Get all drivers
router.get('/', (req, res) => {
  const search = req.query.search;
  let filteredDrivers = drivers;

  if (search) {
    filteredDrivers = drivers.filter(driver =>
      driver.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filteredDrivers);
});

// Get driver by ID
router.get('/:id', (req, res) => {
  const driver = drivers.find(d => d.id === req.params.id);
  if (!driver) {
    return res.status(404).json({ message: 'Driver not found' });
  }
  res.json(driver);
});

// Create driver (requires business or admin)
router.post('/', authenticateToken, requireBusinessOrAdmin, (req, res) => {
  try {
    const { name, description, image, phone } = req.body;

    if (!name || !description || !image || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const driver = {
      id: uuidv4(),
      name,
      description,
      image,
      phone,
      createdBy: req.user.id,
      createdAt: new Date()
    };

    drivers.push(driver);
    res.status(201).json(driver);
  } catch (error) {
    console.error('Create driver error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update driver (requires business or admin, or creator)
router.put('/:id', authenticateToken, requireBusinessOrAdmin, (req, res) => {
  const driverIndex = drivers.findIndex(d => d.id === req.params.id);
  if (driverIndex === -1) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  const driver = drivers[driverIndex];
  // Allow update if user is admin or created the driver
  if (req.user.userType !== 'admin' && req.user.email !== 'admin@gmail.com' && driver.createdBy !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized to update this driver' });
  }

  const { name, description, image, phone } = req.body;
  if (name) driver.name = name;
  if (description) driver.description = description;
  if (image) driver.image = image;
  if (phone) driver.phone = phone;

  res.json(driver);
});

// Delete driver (requires admin)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const driverIndex = drivers.findIndex(d => d.id === req.params.id);
  if (driverIndex === -1) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  drivers.splice(driverIndex, 1);

  // Remove from favorites and ratings
  Object.keys(favorites).forEach(userId => {
    if (favorites[userId].includes(req.params.id)) {
      favorites[userId] = favorites[userId].filter(id => id !== req.params.id);
    }
  });
  delete ratings[req.params.id];

  res.json({ message: 'Driver deleted successfully' });
});

// Get user favorites
router.get('/favorites/:userId', authenticateToken, (req, res) => {
  if (req.user.id !== req.params.userId && req.user.userType !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const userFavorites = favorites[req.params.userId] || [];
  const favoriteDrivers = drivers.filter(driver => userFavorites.includes(driver.id));
  res.json(favoriteDrivers);
});

// Add/remove favorite
router.post('/:id/favorite', authenticateToken, (req, res) => {
  const driverId = req.params.id;
  const userId = req.user.id;

  if (!favorites[userId]) {
    favorites[userId] = [];
  }

  const index = favorites[userId].indexOf(driverId);
  if (index > -1) {
    // Remove favorite
    favorites[userId].splice(index, 1);
    res.json({ message: 'Removed from favorites' });
  } else {
    // Add favorite
    favorites[userId].push(driverId);
    res.json({ message: 'Added to favorites' });
  }
});

// Rate driver
router.post('/:id/rate', authenticateToken, (req, res) => {
  const { rating } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  if (!ratings[req.params.id]) {
    ratings[req.params.id] = {};
  }

  ratings[req.params.id][req.user.id] = rating;
  res.json({ message: 'Rating submitted' });
});

// Get driver rating
router.get('/:id/rating', (req, res) => {
  const driverRatings = ratings[req.params.id] || {};
  const ratingsArray = Object.values(driverRatings);
  const averageRating = ratingsArray.length > 0
    ? ratingsArray.reduce((sum, r) => sum + r, 0) / ratingsArray.length
    : 0;

  res.json({
    averageRating: Math.round(averageRating * 10) / 10,
    totalRatings: ratingsArray.length,
    userRating: req.user ? driverRatings[req.user.id] : null
  });
});

module.exports = router;
