const token = "1659667430:AAGB1JMPmWvgl1iY5bBmuq5NCNeI5KpDqr0";
const token_sber = "401643678:TEST:6361568d-ea79-4543-955e-14c573a7fba2";
const fetch = require("node-fetch");
const {Telegraf} = require('telegraf');
const bot = new Telegraf(token);
const MY_ID = 316816204


require("dotenv").config();

let friends = Array(316816204, 821173837, 848279890, 471236927, 371534155, 259399114);

bot.start((ctx) => {

    console.log(ctx.from.username + " /start");
    return ctx.reply(
        `Привет, ${ctx.message.from.first_name}! Это бот, который поможет тебе с обучением и всему научит!` +
    `Напиши /labs и выбери лабораторную работу, с которой у тебя проблемы.`);
});

bot.hears(/\/отзыв (.+)/, async (ctx) => {
    let review = ctx.message.text.split("/отзыв").pop();
    await bot.telegram.sendMessage(MY_ID, `НОВЫЙ ОТЗЫВ:${review}.\n\nАвтор отзыва - @${ctx.from.username}`);

    await ctx.reply("Спасибо за отзыв!");
});

let NumberOfLab;

let options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Прога', callback_data: 'Прога'}],
            [{text: 'Алгосы (пока не работает)', callback_data: 'Алгосы'}],
        ]
    })
};

let paymentOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Купить лабу', callback_data: 'Купить'}],
            [{text: 'Выйти', callback_data: 'Выйти'}],
        ]
    })
};

let ProgOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1я лаба (фигуры)', callback_data: '1'}],
            [{text: '2я лаба (полином)', callback_data: '2'}],
            [{text: '3я лаба (парсер)', callback_data: '3'}],
            [{text: '4я лаба (шаблоны)', callback_data: '4'}],
            [{text: '5я лаба (кольцевой буффер)', callback_data: '5'}],
            [{text: '6я лаба (кубик)', callback_data: '6'}],
        ]
    })
};

bot.command("labs", async (ctx) => {
    function answer() {
        ctx.reply('Выбери предмет:', options);
    }

    setTimeout(answer, 1000); // чтобы бот не крашился при многократных запросах
});

// Если выбран предмет прога на всплывающей клавиатуре
bot.on('callback_query', async (ctx) => {

    switch (ctx.callbackQuery.data) {
        case "Прога":
            await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
            ctx.reply('Лабы 2го сема:', ProgOptions);
            break;
        case "1":
            NumberOfLab = 1;
            await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
            let path = "Programming/Lab1/";
            await ctx.replyWithDocument({source: `${path}Laba1.zip`});

            // Отправляю себе в лс действие
            await bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \nИмя: " + ctx.from.first_name + "\n/labs" + ` лаба 1 выдана\n`);
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
        case "Купить":
            ctx.deleteMessage(ctx.chat_id);

            await ctx.replyWithInvoice(getInvoice(ctx.from.id, invoiceFactory(ctx.from.id, `Лаба №${NumberOfLab}`, `Лабораторная работа №${NumberOfLab}`, 2000 * 100, 'https://pngimg.com/uploads/rubik_cube/rubik_cube_PNG36.png')));
            break;
        case "Алгосы":
            // await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
            await ctx.editMessageText('Алгосы пока не завезли');
            break;
        case "Выйти":
            await ctx.editMessageText('Будем ждать тебя позже)');
            break;
    }
});

async function ProgReply(NumberOfLab, ctx) {
    ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
    let path = `Programming/Lab${NumberOfLab}/`;
    if (friends.includes(ctx.from.id, 0) && ctx.from.id !== MY_ID) {
        await ctx.replyWithDocument({source: `${path}Laba${NumberOfLab}.zip`})
        if (ctx.from.id !== MY_ID)
            // Отправляю себе в лс действие
            await bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \nИмя: " + ctx.from.first_name + "\n/labs" + ` лаба ${NumberOfLab} выдана\n`);
    } else {
        await ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)`);

        // Отправляю себе в лс действие
        if (ctx.from.id !== MY_ID)
            await bot.telegram.sendMessage(MY_ID, ctx.from.username + ", ID: " + ctx.from.id + " \nИмя: " + ctx.from.first_name + "\n/labs" + ` лаба ${NumberOfLab} НЕ выдана\n`);

        await ctx.reply(`Хочешь купить ${NumberOfLab} лабу?`, paymentOptions);
    }
}

let invoiceFactory = function (id, title, label, amount, url) {

    // создаем новый временный объект
    const invoice = {
        chat_id: id,
        start_parameter: 'get_access',
        provider_token: token_sber,
        title: title, // Название продукта, 1-32 символа
        description: 'Лучшая лаба', // Описание продукта, 1-255 знаков
        currency: 'RUB', // Трехбуквенный код валюты ISO 4217
        prices: [{label: label, amount: amount}], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
        photo_url: url, // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги. Людям больше нравится, когда они видят, за что платят.
        photo_width: 600, // Ширина фото
        photo_height: 600, // Длина фото
        payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: token_sber
        }
    };

    return invoice;
};

const getInvoice = (id, invoice) => { return invoice; }

bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true)) // ответ на предварительный запрос по оплате

bot.on('successful_payment', async (ctx, next) => { // ответ в случае положительной оплаты
    await ctx.reply('С вами приятно иметь дело!');
    await ctx.replyWithDocument({source: `Programming/Lab${NumberOfLab}/Laba${NumberOfLab}.zip`});
})

bot.launch();

console.log("\nБот начал работу\n\nДействия:\n\n");