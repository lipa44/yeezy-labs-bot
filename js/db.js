const mongoose = require("mongoose");
const {userScheme} = require("./lab_objects/scheme")
const url = 'mongodb+srv://lipa:440825@cluster0.dmnvf.mongodb.net/yeezy-labs-bot?retryWrites=true&w=majority\n'

let start = async () => {
    mongoose.connect(url, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
        .then(() => console.log("Подключение прошло успешно!"))
        .catch((e) => console.log(e))
}

start();

module.exports = {
    User: mongoose.model("User", userScheme)
}