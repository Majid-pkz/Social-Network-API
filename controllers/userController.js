const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thought')      
      .populate('friends')  //?????????????
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },


  //PUT to update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId },req.body)
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({ message: 'User and associated apps deleted!' })
      )
     
      .catch((err) => res.status(500).json(err));
  },

 // DELETE to remove user by its _id
 deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({ message: 'User and associated apps deleted!' })
      )
     
      .catch((err) => res.status(500).json(err));
  },

//-------------------------------------------------------------
//   BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId


// POST to add a new friend to a user's friend list


// DELETE to remove a friend from a user's friend lis
//-----------------------------------------------------------

};






  
