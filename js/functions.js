const {User} = require("./db")
const MY_ID = Number(process.env.MY_ID);
const {Telegraf} = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const {againOptions} = require("../js/keyboards/options")

const {
    Lab2,
    Lab3,
    Lab4,
    Lab5,
    Lab6_1_VisualMacOS,
    Lab6_2_VisualMacOS,
    Lab6_0_notVisual,
    Lab6_1_notVisual,
    Lab6_2_notVisual,
    Lab6_VisualWindows
} = require('./lab_objects/invoices.js');

module.exports = {

    find_lab: async (NumberOfLab, ctx) => {
        switch (NumberOfLab) {
            case "2":
                Lab2.chat_id = ctx.from.id;
                Lab2.unique_id = `${ctx.from.id}_${Number(new Date())}`
                return Lab2;

            case "3":
                Lab3.chat_id = ctx.from.id;
                Lab3.unique_id = `${ctx.from.id}_${Number(new Date())}`
                await module.exports.updateUserCurLabName(ctx, 3);
                return Lab3;

            case "4":
                Lab4.chat_id = ctx.from.id;
                Lab4.unique_id = `${ctx.from.id}_${Number(new Date())}`
                await module.exports.updateUserCurLabName(ctx, 4);
                return Lab4;

            case "5":
                Lab5.chat_id = ctx.from.id;
                Lab5.unique_id = `${ctx.from.id}_${Number(new Date())}`
                await module.exports.updateUserCurLabName(ctx, 5);
                return Lab5;

            case "Lab6_0_visual_macOS":
                Lab6_1_VisualMacOS.chat_id = ctx.from.id;
                Lab6_1_VisualMacOS.unique_id = `${ctx.from.id}_${Number(new Date())}`
                await module.exports.updateUserCurLabName(ctx, "Lab6_0_visual_macOS");
                return Lab6_1_VisualMacOS;

            case "Lab6_1_visual_macOS":
                Lab6_2_VisualMacOS.chat_id = ctx.from.id;
                Lab6_2_VisualMacOS.unique_id = `${ctx.from.id}_${Number(new Date())}`
                await module.exports.updateUserCurLabName(ctx, "Lab6_1_visual_macOS");
                return Lab6_2_VisualMacOS;

            case "Lab6_0_not_visual": // ???????? ??????????????????!!!
                Lab6_0_notVisual.chat_id = ctx.from.id;
                Lab6_0_notVisual.unique_id = `${ctx.from.id}_${Number(new Date())}`
                await module.exports.updateUserCurLabName(ctx, "Lab6_0_not_visual");
                return Lab6_0_notVisual;

            case "Lab6_1_not_visual": // ???????? ??????????????????!!!
                Lab6_1_notVisual.chat_id = ctx.from.id;
                Lab6_1_notVisual.unique_id = `${ctx.from.id}_${Number(new Date())}`
                await module.exports.updateUserCurLabName(ctx, "Lab6_1_not_visual");
                return Lab6_1_notVisual;

            case "Lab6_2_not_visual": // ???????? ??????????????????!!!
                Lab6_2_notVisual.chat_id = ctx.from.id;
                Lab6_2_notVisual.unique_id = `${ctx.from.id}_${Number(new Date())}`
                await module.exports.updateUserCurLabName(ctx, "Lab6_2_not_visual");
                return Lab6_2_notVisual;

            // ___________________________ ???????? ??????????????????!!! ___________________

            case "6 visual windows/ubuntu": // ???????? ??????????????????!!!
                Lab6_VisualWindows.chat_id = ctx.from.id;
                Lab6_VisualWindows.unique_id = `${ctx.from.id}_${Number(new Date())}`
                await module.exports.updateUserCurLabName(ctx, "6 visual windows/ubuntu");
                return Lab6_VisualWindows;
        }
    },

    getInvoice: (id, invoice) => {
        return invoice;
    },

    addUserLab: async (ctx, NumberOfLab) => {
        await User.findOneAndUpdate({_id: `${ctx.from.id}`}, {$addToSet: {labs: NumberOfLab}}, {new: true}, (err, res) => {
            if (err) return console.log(err);
            console.log("\n?????????????????? ???????? ?? user", res);
        })
    },

    addUserLabNameAndNum: async (ctx, NumberOfLab, nameOfLab) => {
        await User.findOneAndUpdate({_id: `${ctx.from.id}`}, {
            cur_lab_num: NumberOfLab,
            cur_lab_name: nameOfLab
        }, {new: true}, (err, res) => {
            if (err) return console.log(err);
            console.log("\n?????????????????? ?????????????????? ?????? ?????????????? user", res);
        })
    },

    updateUserCurLabName: async (ctx, NameOfLab) => {
        await User.findOneAndUpdate({_id: `${ctx.from.id}`}, {cur_lab_name: NameOfLab})

        return NameOfLab;
    },

    buyLab: async (ctx) => {
        await User.findOne({_id: `${ctx.from.id}`}, async (err, res) => {
            let lab = res.cur_lab_name;
            if (err) return console.log(err);
            if (res.labs.includes(`${lab}`))
                await ctx.reply("?????? ???????? ?? ?????? ?????? ??????????????!");
            else {
                await module.exports.updateUserCurLabName(ctx, lab);
                await ctx.replyWithInvoice(module.exports.getInvoice(ctx.from.id, await module.exports.find_lab(`${lab}`, ctx)));
            }
        });
    },

    sendLab: async (ctx) => {
        await User.findOne({_id: `${ctx.from.id}`}, async (err, res) => {
            let lab = res.cur_lab_name;

            await module.exports.addUserLab(ctx, lab);
            await module.exports.sendToMe(ctx, lab);
            await ctx.reply('?? ???????? ?????????????? ?????????? ????????!');

            if (await res.cur_lab_num === 6)
                await ctx.replyWithDocument({source: `labs/Programming/Lab${lab}/${lab}.zip`});
            else
                await ctx.replyWithDocument({source: `labs/Programming/Lab${lab}/${lab}.zip`});

            await ctx.reply("???????????????????", againOptions);
        })
    },

    sendToMe: async (ctx, NumberOfLab) => {
        if (ctx.from.id !== MY_ID)
            // ?????????????????? ???????? ?? ???? ????????????????
            await bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \n??????: " +
                ctx.from.first_name + "\n/labs" + ` ???????? ${NumberOfLab} ????????????\n`);
    }
}