const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,deleteUser,updateUser, createFriend,deleteFriend
} = require('../../controllers/userController');

// /api/users  // GET all users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// POST to add a new friend to a user's friend list
// /api/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId').post(createFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend)

module.exports = router;