const { Schema, model } = require('mongoose');
import { isEmail } from 'validator/lib/isEmail';

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [isEmail, 'invalid email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectID,
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

//get total count of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.reduce(
        (total, friend) => total + friends.length + 1,
        0
    );
});

const User = model('User', UserSchema);

module.exports = User;