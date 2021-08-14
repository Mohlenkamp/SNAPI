const { ObjectId } = require('bson');
const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');  //because it's part of the requirements

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId
        },
        reactionBody:{
            type: String,
            required: 'The reaction must no be empty',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'A username is required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => dateFormat(createdAtValue)
        }
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You must include a thoughtText for this thought',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => dateFormat(createdAtValue)   
        },
        username: {
            type: String,
            required: 'You must include a username for this thought.'
        },
        reactions: [reactionSchema]
    },
    {   toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;