const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,deleteUser,updateUser,
} = require('../../controllers/userController');

// /api/users  // GET all users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

module.exports = router;