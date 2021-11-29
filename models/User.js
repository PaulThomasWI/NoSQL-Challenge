const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String
      , unique: [true, 'The username must be unique.']
      , required: [true, 'The username is required.']
      , trim: true
    },
    email: {
      type: String
      , unique: [true, 'The email must be unique.']
      , required: [true, 'email is required.']
      , match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.']

    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId
        , ref: 'User'
      }    
    ]
  },
  { toJSON: { virtuals: true }, id: false }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;