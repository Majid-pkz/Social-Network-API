const { User, Thought } = require('../models');

module.exports = {

     // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughtsData) => res.json(thoughtsData))
      .catch((err) => console.log(err))
    //   res.status(500).json(err));
  },

//   GET to get a single thought by its _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
         .select('-__v')       
        .then((thoughtsData) =>
            !thoughtsData
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thoughtsData)
        )
        .catch((err) => res.status(500).json(err));
    },

// POST to create a new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughtsData) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts:thoughtsData._id}},
                {new: true}
                
            );
        })
        
        .then((thoughtsData) =>
        !thoughtsData
        ? res.status(404).json({ message: 'thought created but no user found with this Id' })
        : res.json(thoughtsData)
    )
    .catch((err) => res.status(500).json(err));
  },

//PUT to update a thought by its _id
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$set:req.body})
        .select('-__v')  
        .then((thoughtsData) =>       
        !thoughtsData
        ? res.status(404).json({ message: 'no thought with this Id ' })
        : res.json(thoughtsData)
    )
    .catch((err) => res.status(500).json(err));
    },
// DELETE to remove a thought by its _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ message: 'thought  deleted!' })
        )
        
        .catch((err) => res.status(500).json(err));
    },


    //   /api/thoughts/thoughtId/reactions
    // POST to create a reaction stored in a single thought's reactions array field
    createReaction(req,res){       
       
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            // { $push: { reactions: req.body } },
            { $addToSet: { reactions: req.body } },
          
           
            // {  reactions: req.body.reaction },
            { new: true }
            )
            
        .then((thoughtsData) =>   {
            if(!thoughtsData){
               return res.status(404).json({ message: 'no thought with this Id ' })
            }
            res.json(thoughtsData)
        } )
    .catch((err) => console.log(err))
    // res.status(500).json(err));
    },


    



};