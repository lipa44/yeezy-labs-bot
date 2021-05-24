const token = "1659667430:AAGB1JMPmWvgl1iY5bBmuq5NCNeI5KpDqr0";
const fetch = require("node-fetch");
const {Telegraf} = require('telegraf');
const {User} = require("./db")
const bot = new Telegraf(token);

const MY_ID = 316816204

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

const {
    options,
    paymentOptions,
    ProgOptions,
    againOptions,
    lab6paymentOptions,
    lab6IfVisualOptions,
    visualLab6Options,
    nonVisualLab6Options
} = require('./keyboards/options.js');

let NumberOfLab;

let friends = [];
let friends1 = Array(316816204, 821173837, 848279890, 471236927, 371534155, 259399114);

bot.telegram.setMyCommands([
    {command: '/labs', description: 'Клавиатура с выбором лаб'},
    {command: '/myLabs', description: 'Все твои лабы'},
    {command: '/start', description: 'Начать!'},
])

bot.start(async (ctx) => {
    console.log(ctx.from.username + " /start");
    await ctx.reply(
        `Привет, ${ctx.message.from.first_name}! \nЭто бот, который поможет тебе с обучением и всему тебя научит!\n` +
        `1) Напиши /labs и выбери лабораторную работу, с которой у тебя проблемы.\n` +
        `2) Напиши /отзыв и то, что ты хочешь сказать разработчику в том же сообщении (например, благодарность)`);
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

            if (ctx.from.id !== MY_ID)
                // Отправляю себе в лс действие
                await bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \nИмя: " +
                    ctx.from.first_name + "\n/labs" + `Лаба 1 выдана\n`);

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
            return ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab(NumberOfLab.toString(), ctx.from.id)));

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
        if (ctx.from.id !== MY_ID)
            // Отправляю себе в лс действие
            return bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \nИмя: " +
                ctx.from.first_name + "\n/labs" + `Лаба ${NumberOfLab} выдана (он - друг)\n`);
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

bot.on('successful_payment', async (ctx, next) => { // ответ в случае положительной оплаты
    const user = new User({
        userData: {
            name: ctx.from.first_name,
            surname: ctx.from.last_name,
            nickname: ctx.from.username
        },
        labs: [NumberOfLab],
        _id: ctx.from.id,
    });

    await User.findOneAndUpdate({_id: `${ctx.from.id}`}, {$addToSet: {labs: NumberOfLab}}, {new: true}, function (err, res) {

        if (res === null) {
            if (NumberOfLab !== null) {
                user.save(function (err) {

                    if (err) return console.log(err);
                    console.log("\nСоздан объект user", user);
                });
            }

        } else {
            res.labs = res.labs.sort();
            if (err) return console.log(err);
            console.log("\nОбновлён объект user", res);
        }
    });

    await ctx.reply('С вами приятно иметь дело!');
    // await ctx.replyWithDocument({source: `Programming/Lab${NumberOfLab}/Laba${NumberOfLab}.zip`});
    await ctx.reply("Лабу я не дам)");

    if (ctx.from.id !== MY_ID)
        await bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \nИмя: " +
            ctx.from.first_name + "\n" + ` лаба ${NumberOfLab} выдана!\n`);

    return ctx.reply("Продолжим?", againOptions);
})

bot.command("/myLabs", async (ctx) => {
    await User.findOne({_id: `${ctx.from.id}`}, function (err, res) {
        if (err) return console.log(err);

        ctx.reply(`${res.userData.name}, вот все лабы, которые ты купил: ${res.labs.sort()}`);
    })
})

function getInvoice(id, invoice) {
    return invoice;
}

function find_lab(NumberOfLab, id) {
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
}

bot.launch();

console.log("\nБот начал работу\n\nДействия:\n\n");