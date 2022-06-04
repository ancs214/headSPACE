const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // UNCOMMENT WHEN FORMATDATE FUNC IS COMPLETE
        //get: createdAtVal => dateFormat(createdAtVal) 
    },
    _id: false
},
    {
        toJSON: { getters: true }
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //  UNCOMMENT AFTER CREATING DATEFORMAT FUNCTIONS
        //get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionsSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionsCount').get(function () {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);


module.exports = Thought;