const router = require('express').Router();

const userRoutes = require('./apiRoutes/userRoutes');
const thoughtRoutes = require('./apiRoutes/thoughtRoutes');

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
