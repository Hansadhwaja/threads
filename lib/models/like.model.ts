import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    threadId: {
        type: String,
        required: true
    },
    currentUserId: {
        type: String,
        required: true
    }
});

const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);

export default Like;