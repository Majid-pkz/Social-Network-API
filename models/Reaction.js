const { Schema, model } = require('mongoose');


//schema to create reaction model

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
          },
          username: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            //??? Use a getter method to format the timestamp on query
          },
        
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  const Reaction = model('reaction', reactionSchema);
  
  module.exports = Reaction;