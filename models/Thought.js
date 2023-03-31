const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


//schema to create thought model

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
            // get:timestamp=>dateFormat(timestamp)
        },
        username:{
            type: String,
            required: true,
        },

        reactions:[reactionSchema],

    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id:false,
    }
  );
  //Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  const Thought = model('thought', thoughtSchema);
  
  module.exports = Thought;