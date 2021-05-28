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
        },
        used_my_labs: {
            type: Date,
        },
        cur_lab_num: {
            type: String
        },
        cur_lab_name: {
            type: String
        },


    }, {versionKey: false})

}