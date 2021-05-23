const token = "1659667430:AAGB1JMPmWvgl1iY5bBmuq5NCNeI5KpDqr0";
const token_sber = "401643678:TEST:67a0ddff-2651-4c09-8a13-43b56e3dea54";
const fetch = require("node-fetch");
const {Telegraf} = require('telegraf');
const {options, paymentOptions, ProgOptions, againOptions} = require('./keyboards/options.js');
const bot = new Telegraf(token);
const MY_ID = 316816204

require("dotenv").config();
const {Lab2, Lab3, Lab4, Lab5, Lab6} = require('./lab_objects/invoices.js');

let NumberOfLab;

let friends = Array(316816204, 821173837, 848279890, 471236927, 371534155, 259399114);

bot.telegram.setMyCommands([
    {command: '/labs', description: 'Клавиатура с выбором лаб'},
    {command: '/start', description: 'Начало работы с ботом'},
])

bot.start(async (ctx) => {
    console.log(ctx.from.username + " /start");
    await ctx.reply(
        `Привет, ${ctx.message.from.first_name}! \nЭто бот, который поможет тебе с обучением и всему научит!\n` +
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
            let path = "Programming/Lab1/";
            await ctx.replyWithDocument({source: `${path}Laba1.zip`});

            // Отправляю себе в лс действие
            return bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \nИмя: " + ctx.from.first_name + "\n/labs" + ` лаба 1 выдана\n`);
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
            return ctx.replyWithInvoice(getInvoice(ctx.from.id, find_lab(NumberOfLab)));
        case "Выйти":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.replyWithSticker('https://tlgrm.ru/_/stickers/840/5d2/8405d27b-2c91-300d-85cd-7dbd425a6e97/1.webp');
        case "Заново":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.reply('Выбери предмет:', options);
        case "Закончить работу":
            await ctx.deleteMessage(ctx.chat_id);
            return ctx.reply("Будем ждать тебя снова!");

    }
});

async function ProgReply(NumberOfLab, ctx) {
    await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
    let path = `Programming/Lab${NumberOfLab}/`;
    if (friends.includes(ctx.from.id, 0) && ctx.from.id !== MY_ID) {
        await ctx.replyWithDocument({source: `${path}Laba${NumberOfLab}.zip`})
        if (ctx.from.id !== MY_ID)
            // Отправляю себе в лс действие
            return bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \nИмя: " + ctx.from.first_name + "\n/labs" + ` лаба ${NumberOfLab} выдана\n`);
    } else {

        // Отправляю себе в лс действие
        if (ctx.from.id !== MY_ID)
            await bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \nИмя: " + ctx.from.first_name + "\n/labs" + ` лаба ${NumberOfLab} НЕ выдана\n`);

        return ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)\n`
            + `Хочешь купить ${NumberOfLab} лабу?`, paymentOptions);
    }
}

bot.on('pre_checkout_query', async (ctx) => await ctx.answerPreCheckoutQuery(true)) // ответ на предварительный запрос по оплате

bot.on('successful_payment', async (ctx, next) => { // ответ в случае положительной оплаты
    await ctx.reply('С вами приятно иметь дело!');
    await ctx.replyWithDocument({source: `Programming/Lab${NumberOfLab}/Laba${NumberOfLab}.zip`});
    return ctx.reply("Продолжим?", againOptions);
})

function getInvoice(id, invoice) {
    return invoice;
}

function find_lab(NumberOfLab) {
    switch (NumberOfLab) {
        case 2:
            return Lab2;
        case 3:
            return Lab3;
        case 4:
            return Lab4;
        case 5:
            return Lab5;
        case 6:
            return Lab6;
    }
}

bot.launch();

console.log("\nБот начал работу\n\nДействия:\n\n");