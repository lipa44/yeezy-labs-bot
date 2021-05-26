const {User} = require("./db")
const MY_ID = Number(process.env.MY_ID);
const {Telegraf} = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const {
    Lab2,
    Lab3,
    Lab4,
    Lab5,
    Lab6_VisualMacOS,
    Lab6_1_notVisual,
    Lab6_2_notVisual,
    Lab6_3_notVisual,
    Lab6_VisualWindows
} = require('./lab_objects/invoices.js');

module.exports = {

    find_lab: (NumberOfLab, id) => {
        switch (NumberOfLab) {
            case "2":
                Lab2.chat_id = id;
                Lab2.unique_id = `${id}_${Number(new Date())}`
                return Lab2;

            case "3":
                Lab3.chat_id = id;
                Lab3.unique_id = `${id}_${Number(new Date())}`
                return Lab3;

            case "4":
                Lab4.chat_id = id;
                Lab4.unique_id = `${id}_${Number(new Date())}`
                return Lab4;

            case "5":
                Lab5.chat_id = id;
                Lab5.unique_id = `${id}_${Number(new Date())}`
                return Lab5;

            case "6 visual macos":
                Lab6_VisualMacOS.chat_id = id;
                Lab6_VisualMacOS.unique_id = `${id}_${Number(new Date())}`
                return Lab6_VisualMacOS;

            case "6_1 not visual": // надо исправить!!!
                Lab6_1_notVisual.chat_id = id;
                Lab6_1_notVisual.unique_id = `${id}_${Number(new Date())}`
                return Lab6_1_notVisual;



            // ___________________________ НАДО ИСПРАВИТЬ!!! ___________________

            case "6 visual windows/ubuntu": // надо исправить!!!
                Lab6_VisualWindows.chat_id = id;
                Lab6_VisualWindows.unique_id = `${id}_${Number(new Date())}`
                return Lab6_VisualWindows;

            case "6_2 not visual": // надо исправить!!!
                Lab6_2_notVisual.chat_id = id;
                Lab6_2_notVisual.unique_id = `${id}_${Number(new Date())}`
                return Lab6_2_notVisual;

            case "6_3 not visual": // надо исправить!!!
                Lab6_3_notVisual.chat_id = id;
                Lab6_3_notVisual.unique_id = `${id}_${Number(new Date())}`
                return Lab6_3_notVisual;
        }
    },

    getInvoice: (id, invoice) => {
        return invoice;
    },

    addUserLab: async (ctx, NumberOfLab) => {
        await User.findOneAndUpdate({_id: `${ctx.from.id}`}, {$addToSet: {labs: NumberOfLab}}, {new: true}, (err, res) => {
            if (err) return console.log(err);
            console.log("\nОбновлён объект user", res);
        })
    },

    sendToMe: async (ctx, NumberOfLab) => {
        if (ctx.from.id !== MY_ID)
            // Отправляю себе в лс действие
            await bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \nИмя: " +
                ctx.from.first_name + "\n/labs" + ` Лаба ${NumberOfLab} выдана\n`);
    }
}