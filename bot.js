require('dotenv').config({path: ".env"})
const MY_ID = Number(process.env.MY_ID);
const {Telegraf} = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const {User} = require("./js/db")
const {find_lab, getInvoice, addUserLab, sendToMe} = require('./js/functions');
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
    async function answer() {
        console.log(ctx.from.username + " /start");
        await ctx.reply(
            `Привет, ${ctx.message.from.first_name}! \nЭто бот, который поможет тебе с обучением и всему тебя научит!\n` +
            `1) Напиши /labs и выбери лабораторную работу, с которой у тебя проблемы.\n` +
            `2) Напиши /отзыв и то, что ты хочешь передать разработчику в том же сообщении (например, благодарность)`);

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
            if (err) console.log(err)
            if (res === null)
                user.save((err) => {
                    if (err) return console.log(err);
                    console.log("\nСоздан объект user", user);
                });
        });

        await ctx.replyWithSticker('https://tlgrm.ru/_/stickers/df4/f95/df4f9509-d0dd-4275-bc09-0784a16344de/3.webp');
    }

    setTimeout(answer, 1000);
});

bot.hears(/\/отзыв (.+)/, async (ctx) => {
    let review = ctx.message.text.split("/отзыв").pop();
    await bot.telegram.sendMessage(MY_ID, `НОВЫЙ ОТЗЫВ:${review}.\n\nАвтор отзыва - @${ctx.from.username}`);

    await ctx.reply("Спасибо за отзыв!");
});

bot.command("labs", async (ctx) => {
    async function answer() {
        await ctx.reply('Выбери предмет:', options);
    }

    setTimeout(answer, 1000); // чтобы бот не крашился при многократных запросах
});

// Если выбран предмет прога на всплывающей клавиатуре
bot.on('callback_query', async (ctx) => {

    switch (ctx.callbackQuery.data) {
        case "Прога":
            await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
            await ctx.reply('Лабы 2го сема:', ProgOptions);
            break;

        case "1":
            NumberOfLab = 1;
            await ProgReply(1, ctx);
            break;

        case "2":
            NumberOfLab = 2;
            await ProgReply(2, ctx);
            break;

        case "3":
            NumberOfLab = 3;
            await ProgReply(3, ctx);
            break;

        case "4":
            NumberOfLab = 4;
            await ProgReply(4, ctx);
            break;

        case "5":
            NumberOfLab = 5;
            await ProgReply(5, ctx);
            break;

        case "6":
            NumberOfLab = 6;
            await ProgReply(6, ctx);
            break;

        case "Алгосы":
            // await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
            await ctx.editMessageText('Алгосы пока не завезли');
            break;

        case "Купить":
            await ctx.deleteMessage(ctx.chat_id);

            User.findOne({_id: `${ctx.from.id}`}, async (err, res) => {
                if (err) return console.log(err);
                if (res.labs.includes(NumberOfLab))
                    await ctx.reply("Эта лаба у вас уже куплена!");
                else
                    await ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab(NumberOfLab.toString(), ctx.from.id)));
            });

            break;

        case "Выйти":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.replyWithSticker('https://tlgrm.ru/_/stickers/840/5d2/8405d27b-2c91-300d-85cd-7dbd425a6e97/1.webp');
            break;

        case "Заново":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.reply('Выбери предмет:', options);
            break;

        case "Закончить работу":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.reply("Будем ждать тебя снова!");
            break;



        // ______________________ 6я лаба ______________________

        case "Купить 6ю":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.reply("С визуализацией или без?", lab6IfVisualOptions);
            break;

        case "Визуал":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.reply("На какой ОС вы хотите запустить лабу?", visualLab6Options);
            break;

        case "Без визуала":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.reply("Все лабы без визуализации запускаются на любых ОС. \nВыбери одну из трёх - они все рабочие," +
                " но если тебе понадиботся другая реализация, можешь быть уверен, что они отличаются друг от друга", nonVisualLab6Options);
            break;

        case "Винда/Убунту визуал":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab("6 visual windows/ubuntu", ctx.from.id)));
            break;

        case "МакОС визуал":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab("6 visual macos", ctx.from.id)));
            break;

        case "1я не визуал":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab("6_1 not visual", ctx.from.id)));
            break;

        case "2я не визуал":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab("6_2 not visual", ctx.from.id)));
            break;

        case "3я не визуал":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab("6_3 not visual", ctx.from.id)));
            break;
    }
});

async function ProgReply(NumberOfLab, ctx) {
    await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
    let path = `labs/Programming/Lab${NumberOfLab}/`;
    if (friends.includes(ctx.from.id, 0) && ctx.from.id !== MY_ID) {
        await ctx.replyWithDocument({source: `${path}Laba${NumberOfLab}.zip`})
        await sendToMe(ctx, NumberOfLab);
    } else {
        switch (NumberOfLab) {
            case 1:
                User.findOne({_id: `${ctx.from.id}`}, async (err, res) => {
                    if (err) return console.log(err);
                    if (res.labs.includes(NumberOfLab))
                        await ctx.reply("Эта лаба у вас уже куплена!");
                    else {
                        await addUserLab(ctx, NumberOfLab);
                        await sendToMe(ctx, NumberOfLab);

                        let path = "labs/Programming/Lab1/";
                        await ctx.replyWithDocument({source: `${path}Laba1.zip`});
                        await ctx.reply("Хочешь остальные лабы?", againOptions);
                    }
                });
                break;

            case 2:
            case 4:
            case 5:
                await ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)\n\n`
                    + `Хочешь купить ${NumberOfLab} лабу?`, paymentOptions);
                break;

            case 3:
                await ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)\n\n`
                    + `Хочешь купить ${NumberOfLab} лабу? \n\nРаботает на MacOS, Windows и Ubuntu.` +
                    ` Пособия о том, как запустить лабу - прилагаются!`, paymentOptions);
                break;

            case 6:
                await ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)\n\n`
                    + `Хочешь купить ${NumberOfLab} лабу? \n\nЕсть версия как для MacOS, так и для Windows и Ubuntu.` +
                    ` Пособия о том, как запустить лабу на той или иной платформе - прилагаются!`, lab6paymentOptions);
                break;
        }
    }
}

bot.on('pre_checkout_query', async (ctx) => { // ответ на предварительный запрос по оплате (сохраняем данные)
    await ctx.answerPreCheckoutQuery(true);
})

bot.on('successful_payment', async (ctx) => { // ответ в случае положительной оплаты

    await addUserLab(ctx, NumberOfLab);

    await ctx.reply('С вами приятно иметь дело!');

    // await ctx.replyWithDocument({source: `Programming/Lab${NumberOfLab}/Laba${NumberOfLab}.zip`});
    await ctx.reply("*Тут должна быть лаба*");

    await sendToMe(ctx, NumberOfLab);

    await ctx.reply("Продолжим?", againOptions);
})

bot.command("/my_labs", async (ctx) => {
    async function answer() {
        await User.findOne({_id: `${ctx.from.id}`}, (err, res) => {
            if (err) return console.log(err);
            ctx.reply(`${res.userData.name}, вот все лабы, которые ты купил: ${res.labs.sort()}`);
        })
    }
    setTimeout(answer, 1000);
})

bot.launch();

console.log("\nБот начал работу\n\nДействия:\n\n");