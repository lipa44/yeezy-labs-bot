const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {

    userScheme: new Schema({
        userData: {
            name: {
                type: String,
                required: true
            },
            surname: {
                type: String
            },
            nickname: {
                type: String,
                required: true
            }
        },
        labs: {
            type: Array
        },
        _id: {
            type: String,
            required: true
        }

    }, { versionKey: false }),
}