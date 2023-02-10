const router = require('express').Router();

const homepageRoutes = require('./homepage-routes');
const wishlistRoutes = require('./wishlist_routes');

router.use('/', homepageRoutes);
router.use('/users/wishlist', wishlistRoutes)

module.exports = router;