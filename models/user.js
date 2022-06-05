const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


//USER SCHEMA
const UserSchema = new Schema({
    // userID: {
    //     type: Schema.Types.ObjectId,
    //     default: () => new Types.ObjectId() 
    // },
    username: {
        type: String,
        required: 'You must provide a username',
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: 'You must provide an email',
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    ],
    _id: false
},

    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;