require('dotenv').config({path: ".env"})
const MY_ID = Number(process.env.MY_ID);
const {Telegraf} = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const {User} = require("./js/db")
const {find_lab, getInvoice, addUserLab, sendToMe, checkIfLabBought} = require('./js/functions');
const {
    options,
    paymentOptions,
    ProgOptions,
    againOptions,
    lab6paymentOptions,
    lab6IfVisualOptions,
    visualLab6Options,
    nonVisualLab6Options
} = require('./js/keyboards/options.js');

let NumberOfLab;

let friends = [];
let friends1 = Array(316816204, 821173837, 848279890, 471236927, 371534155, 259399114);

bot.telegram.setMyCommands([
    {command: '/labs', description: 'Клавиатура с выбором лаб'},
    {command: '/my_labs', description: 'Все твои лабы'},
    {command: '/start', description: 'Начать!'},
])

bot.start(async (ctx) => {
    console.log(ctx.from.username + " /start");
    await ctx.reply(
        `Привет, ${ctx.message.from.first_name}! \nЭто бот, который поможет тебе с обучением и всему тебя научит!\n` +
        `1) Напиши /labs и выбери лабораторную работу, с которой у тебя проблемы.\n` +
        `2) Напиши /отзыв и то, что ты хочешь сказать разработчику в том же сообщении (например, благодарность)`);

    const user = new User({
        userData: {
            name: ctx.from.first_name,
            surname: ctx.from.last_name,
            nickname: ctx.from.username
        },
        labs: [],
        _id: ctx.from.id,
    });

    await User.findOne({_id: `${ctx.from.id}`}, (err, res) => {
        if (res === null)
            user.save((err) => {
                if (err) return console.log(err);
                console.log("\nСоздан объект user", user);
            });
    });

    return ctx.replyWithSticker('https://tlgrm.ru/_/stickers/df4/f95/df4f9509-d0dd-4275-bc09-0784a16344de/3.webp');
});

bot.hears(/\/отзыв (.+)/, async (ctx) => {
    let review = ctx.message.text.split("/отзыв").pop();
    await bot.telegram.sendMessage(MY_ID, `НОВЫЙ ОТЗЫВ:${review}.\n\nАвтор отзыва - @${ctx.from.username}`);

    return ctx.reply("Спасибо за отзыв!");
});

bot.command("labs", async (ctx) => {
    async function answer() {
        return ctx.reply('Выбери предмет:', options);
    }

    setTimeout(answer, 1000); // чтобы бот не крашился при многократных запросах
});

// Если выбран предмет прога на всплывающей клавиатуре
bot.on('callback_query', async (ctx) => {

    switch (ctx.callbackQuery.data) {
        case "Прога":
            await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
            return ctx.reply('Лабы 2го сема:', ProgOptions);

        case "1":
            NumberOfLab = 1;
            await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора

            addUserLab(ctx, NumberOfLab);
            sendToMe(ctx, NumberOfLab);

            let path = "Programming/Lab1/";
            await ctx.replyWithDocument({source: `${path}Laba1.zip`});
            return ctx.reply("Хочешь остальные лабы?", againOptions);

        case "2":
            NumberOfLab = 2;
            return ProgReply(2, ctx);

        case "3":
            NumberOfLab = 3;
            return ProgReply(3, ctx);

        case "4":
            NumberOfLab = 4;
            return ProgReply(4, ctx);

        case "5":
            NumberOfLab = 5;
            return ProgReply(5, ctx);

        case "6":
            NumberOfLab = 6;
            return ProgReply(6, ctx);

        case "Алгосы":
            // await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
            return ctx.editMessageText('Алгосы пока не завезли');

        case "Купить":
            await ctx.deleteMessage(ctx.chat_id);

            User.findOne({_id: `${ctx.from.id}`}, async (err, res) => {
                if (err) return console.log(err);
                if (res.labs.includes(NumberOfLab))
                    await ctx.reply("Эта лаба у вас уже куплена!");
                else await ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab(NumberOfLab.toString(), ctx.from.id)));
            });

            break;

        case "Выйти":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.replyWithSticker('https://tlgrm.ru/_/stickers/840/5d2/8405d27b-2c91-300d-85cd-7dbd425a6e97/1.webp');

        case "Заново":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.reply('Выбери предмет:', options);

        case "Закончить работу":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.reply("Будем ждать тебя снова!");



        // ______________________ 6я лаба ______________________

        case "Купить 6ю":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.reply("С визуализацией или без?", lab6IfVisualOptions);

        case "Визуал":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.reply("На какой ОС вы хотите запустить лабу?", visualLab6Options);

        case "Без визуала":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.reply("Все лабы без визуализации запускаются на любых ОС. \nВыбери одну из трёх - они все рабочие," +
                " но если тебе понадиботся другая реализация, можешь быть уверен, что они отличаются друг от друга", nonVisualLab6Options);

        case "Винда/Убунту визуал":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab("6 visual windows/ubuntu", ctx.from.id)));

        case "МакОС визуал":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab("6 visual macos", ctx.from.id)));

        case "1я не визуал":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab("6_1 not visual", ctx.from.id)));

        case "2я не визуал":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab("6_2 not visual", ctx.from.id)));

        case "3я не визуал":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab("6_3 not visual", ctx.from.id)));
    }
});

async function ProgReply(NumberOfLab, ctx) {
    await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
    let path = `Programming/Lab${NumberOfLab}/`;
    if (friends.includes(ctx.from.id, 0) && ctx.from.id !== MY_ID) {
        await ctx.replyWithDocument({source: `${path}Laba${NumberOfLab}.zip`})
        sendToMe(ctx, NumberOfLab);
    } else {
        switch (NumberOfLab) {
            case 2:
            case 4:
            case 5:
                return ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)\n\n`
                    + `Хочешь купить ${NumberOfLab} лабу?`, paymentOptions);
            case 3:
                return ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)\n\n`
                    + `Хочешь купить ${NumberOfLab} лабу? \n\nРаботает на MacOS, Windows и Ubuntu.` +
                    ` Пособия о том, как запустить лабу - прилагаются!`, paymentOptions);
            case 6:
                return ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)\n\n`
                    + `Хочешь купить ${NumberOfLab} лабу? \n\nЕсть версия как для MacOS, так и для Windows и Ubuntu.` +
                    ` Пособия о том, как запустить лабу на той или иной платформе - прилагаются!`, lab6paymentOptions);
        }
    }
}

bot.on('pre_checkout_query', async (ctx) => { // ответ на предварительный запрос по оплате (сохраняем данные)
    await ctx.answerPreCheckoutQuery(true);
})

bot.on('successful_payment', async (ctx) => { // ответ в случае положительной оплаты

    addUserLab(ctx, NumberOfLab);

    await ctx.reply('С вами приятно иметь дело!');

    // await ctx.replyWithDocument({source: `Programming/Lab${NumberOfLab}/Laba${NumberOfLab}.zip`});
    await ctx.reply("*Тут должна быть лаба*");

    sendToMe(ctx, NumberOfLab);

    return ctx.reply("Продолжим?", againOptions);
})

bot.command("/my_labs", async (ctx) => {
    await User.findOne({_id: `${ctx.from.id}`}, (err, res) => {
        if (err) return console.log(err);

        ctx.reply(`${res.userData.name}, вот все лабы, которые ты купил: ${res.labs.sort()}`);
    })
})

bot.launch();

console.log("\nБот начал работу\n\nДействия:\n\n");