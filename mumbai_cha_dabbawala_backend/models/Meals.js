const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: "",
    },
    // category used by the frontend filter. Store as string ('0','1','2','3')
    category: {
        type: String,
        default: '0'
    }
});
module.exports = mongoose.model("meals", UserSchema);