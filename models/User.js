const { Schema, model } = require('mongoose');


//schema to create user model

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique:true,
        trim:true
      },
      email: {
        type: String,
        required: true,
        unique:true,
        //Regex to match email format
        match: /^\S+@\S+\.\S+$/,
      },
     
      thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
     // self-reference
      friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    },
    {
      toJSON: {
        // getters: true,
        virtuals: true,
      },
      id: false,
    }
  );


  //Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

  const User = model('user', userSchema);
  
  module.exports = User;