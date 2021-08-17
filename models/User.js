const { truncate } = require('fs');
const {Schema,model} = require('mongoose');
const {isEmail} = require('validator');  // Adding this to validate email address

// User Model //
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'A username is requried'],
            unique: true,
            trim: true,  
            minlength: 1
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'A valid email address is required'],
            validate: [isEmail, 'Invalid email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
            id: false
        }
);

// get total count of friends for virtual
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);
module.exports = User;
