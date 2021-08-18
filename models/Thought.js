const { ObjectId } = require('bson');
const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');  //because it's part of the requirements

const reactionSchema = new Schema(
    {
        reactionBody:{
            type: String,
            trim: true,
            required: 'The reaction must not be empty',
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            trim: true,
            required: 'A username is required',
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => dateFormat(createdAtValue)  
        }
    },
    {   toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            tgrim: true,
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
            trim: true,
            minlength: 1,
            required: 'You must include a username for this thought.'
        },
        userId: {
            type: Schema.Types.ObjectId
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

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;