const { Schema } = require('mongoose');
const { format_date } = require('../utils/helpers');


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
            get:timestamp=>format_date(timestamp)
          },
        
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
//   const Reaction = model('reaction', reactionSchema);
  
  module.exports = reactionSchema;