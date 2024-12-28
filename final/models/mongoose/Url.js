import mongoose from "mongoose";
const { Schema, model } = mongoose;

const urlSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    url: {
        type: String,
        required: true,
    },
    visits: {
        type: Number,
        default: 0,
    },
    create_time: {
        type: Date,
        default: Date.now,
    },
    expire_time: Date,
    type: {
        type: String,
        enum: ['Temporary', 'Permanent', 'One-time'],
        default: 'Permanent',
    },
    user_id: String,
    enabled: {
        type: Boolean,
        default: true,
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    }
});

const Url = model("Url", urlSchema);

export default Url;