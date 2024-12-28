import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: String,
    surname: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
    },
    create_time: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    }
});

const User = model('User', userSchema);

export default User;
