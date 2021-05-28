require('dotenv').config({path: ".env"})
const MY_ID = Number(process.env.MY_ID);
const {Telegraf} = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const {User} = require("./js/db")

const {
    sendToMe,
    addUserLabNameAndNum,
    buyLab,
    sendLab,
    addUserLab
} = require('./js/functions');

const {
    options,
    paymentOptions,
    ProgOptions,
    againOptions,
    lab6paymentOptions,
    lab6IfVisualOptions,
    visualLab6Options,
    nonVisualLab6Options,
    visualLab6macOSOptions
} = require('./js/keyboards/options.js');

let friends = [];
let friends1 = Array(316816204, 821173837, 848279890, 471236927, 371534155, 259399114);

bot.telegram.setMyCommands([
    {command: '/labs', description: 'Клавиатура с выбором лаб'},
    {command: '/my_labs', description: 'Все твои лабы'},
    {command: '/start', description: 'Начать!'},
])

bot.command("/delete", async (ctx) => {
    await User.findOneAndDelete({_id: MY_ID});
    await ctx.reply("Я тебя удалил");
})

bot.start(async (ctx) => {
    setTimeout(async () => {
        console.log(ctx.from.username + " /start");
        await ctx.reply(
            `Привет, ${ctx.message.from.first_name}! \nЭто бот, который поможет тебе с обучением и всему тебя научит!\n` +
            `1) Напиши /labs и выбери лабораторную работу, с которой у тебя проблемы.\n` +
            `2) Напиши /my_labs и получи весь список своих лаб (доступно раз в день)\n` +
            `3) Напиши /отзыв и то, что ты хочешь передать разработчику в том же сообщении (например, благодарность)\n\n` +
            `Никакие данные пользоватей (ваши данные) не передаются сторонним лицам, ваша информация конфиденциальна`);

        const user = new User({
            userData: {
                name: ctx.from.first_name,
                surname: ctx.from.last_name,
                nickname: ctx.from.username
            },
            labs: [],
            _id: ctx.from.id,
            used_my_labs: 0
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
    }, 1000);
});

bot.hears(/\/отзыв (.+)/, async (ctx) => {
    let review = ctx.message.text.split("/отзыв").pop();
    await bot.telegram.sendMessage(MY_ID, `НОВЫЙ ОТЗЫВ:${review}.\n\nАвтор отзыва - @${ctx.from.username}`);

    await ctx.reply("Спасибо за отзыв!");
});

bot.command("labs", async (ctx) => {
    setTimeout(async () => {
        await ctx.reply('Выбери предмет:', options);
    }, 1000);
});

// Если выбран предмет прога на всплывающей клавиатуре
bot.on('callback_query', async (ctx) => {

    switch (ctx.callbackQuery.data) {
        case "Прога":
            await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
            await ctx.reply('Лабы 2го сема:', ProgOptions);
            break;

        case "1":
            await addUserLabNameAndNum(ctx, "1", 1);
            await ProgReply(1, ctx);
            break;

        case "2":
            await addUserLabNameAndNum(ctx, "2", 2);
            await ProgReply(2, ctx);
            break;

        case "3":
            await addUserLabNameAndNum(ctx, "3", 3);
            await ProgReply(3, ctx);
            break;

        case "4":
            await addUserLabNameAndNum(ctx, "4", 4);
            await ProgReply(4, ctx);
            break;

        case "5":
            await addUserLabNameAndNum(ctx, "5", 5);
            await ProgReply(5, ctx);
            break;

        case "6":
            await addUserLabNameAndNum(ctx, "6", 6);
            await ProgReply(6, ctx);
            break;

        case "Алгосы":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.reply('Алгосы пока не завезли');
            break;

        case "Купить":
            await ctx.deleteMessage(ctx.chat_id);
            await buyLab(ctx);
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

        case "Купить кубик":
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
            await ctx.reply("Эту лабу ещё не завезли(");
            break;

        case "МакОС визуал":
            await ctx.deleteMessage(ctx.chat_id);
            await ctx.reply("Выбери одну из двух - они все рабочие," +
                " но если тебе понадиботся другая реализация, можешь быть уверен, что они отличаются друг от друга", visualLab6macOSOptions)
            break;

        case "МакОС визуал 1":
            await ctx.deleteMessage(ctx.chat_id);
            await addUserLabNameAndNum(ctx, "6v1 macOS + OpenGL", "Lab6_0_visual_macOS")
            await buyLab(ctx);
            break;

        case "МакОС визуал 2":
            await ctx.deleteMessage(ctx.chat_id);
            await addUserLabNameAndNum(ctx, "6v2 macOS + OpenGL", "Lab6_1_visual_macOS")
            await buyLab(ctx);
            break;

        case "1я не визуал":
            await ctx.deleteMessage(ctx.chat_id);
            await addUserLabNameAndNum(ctx, "6v1", "Lab6_0_not_visual")
            await buyLab(ctx);
            break;

        case "2я не визуал":
            await ctx.deleteMessage(ctx.chat_id);
            await addUserLabNameAndNum(ctx, "6v2", "Lab6_1_not_visual")
            await buyLab(ctx);
            break;

        case "3я не визуал":
            await ctx.deleteMessage(ctx.chat_id);
            await addUserLabNameAndNum(ctx, "6v3", "Lab6_2_not_visual")
            await buyLab(ctx);
            break;
    }
});

async function ProgReply(NumberOfCurLab, ctx) {
    await ctx.deleteMessage(ctx.chat_id); // удаляем  клавиатуру выбора
    let path = `labs/Programming/Lab${NumberOfCurLab}/`;
    if (friends.includes(ctx.from.id, 0) && ctx.from.id !== MY_ID) {
        await ctx.replyWithDocument({source: `${path}Laba${NumberOfCurLab}.zip`})
        await sendToMe(ctx, NumberOfCurLab);

    } else {
        switch (NumberOfCurLab) {
            case 1:
                await User.findOne({_id: `${ctx.from.id}`}, async (err, res) => {
                    if (err) return console.log(err);
                    if (res.labs.includes(`${NumberOfCurLab}`))
                        await ctx.reply("Эта лаба у вам уже выдана!");
                    else {
                        await addUserLabNameAndNum(ctx, "1", "1");
                        await addUserLab(ctx, "1");
                        await sendToMe(ctx, NumberOfCurLab);

                        let path = "labs/Programming/Lab1/";
                        await ctx.replyWithDocument({source: `${path}1.zip`});
                        await ctx.reply("Хочешь остальные лабы?", againOptions);
                    }
                });
                break;

            case 2:
            case 4:
            case 5:
                await ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)\n\n`
                    + `Хочешь купить ${NumberOfCurLab} лабу?`, paymentOptions);
                break;

            case 3:
                await ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)\n\n`
                    + `Хочешь купить ${NumberOfCurLab} лабу? \n\nРаботает на MacOS, Windows и Ubuntu.` +
                    ` Пособия о том, как запустить лабу - прилагаются!`, paymentOptions);
                break;

            case 6:
                await ctx.reply(`${ctx.from.first_name}, демо-версия распространяется только на первую лабу)\n\n`
                    + `Хочешь купить ${NumberOfCurLab} лабу? \n\nЕсть версия как для MacOS, так и для Windows и Ubuntu.` +
                    ` Пособия о том, как запустить лабу на той или иной платформе - прилагаются!`, lab6paymentOptions);
                break;
        }
    }
}

bot.on('pre_checkout_query', async (ctx) => { // ответ на предварительный запрос по оплате (сохраняем данные)
    await ctx.answerPreCheckoutQuery(true);
})

bot.on('successful_payment', async (ctx) => { // ответ в случае положительной оплаты
    await sendLab(ctx);
})

const millisecondsInDay = 86400000;

bot.command("/my_labs", async (ctx) => {
    setTimeout(async () => {
        await User.findOne({_id: `${ctx.from.id}`}, async (err, res) => {
            if (err) return console.log(err);

            if (Date.now() - res.used_my_labs >= millisecondsInDay || ctx.from.id === MY_ID) {
                await User.findOneAndUpdate({_id: `${ctx.from.id}`}, {used_my_labs: new Date()});

                res.labs = res.labs.sort();

                if (res.labs.length !== 0) {
                    await ctx.reply(`${res.userData.name}, вот все лабы, которые ты купил: ${res.labs.sort().join(' / ')}`);
                    for (const labNum of res.labs)
                        await ctx.replyWithDocument({source: `labs/Programming/Lab${labNum}/${labNum}.zip`});

                } else
                    await ctx.reply(`${res.userData.name}, ты ещё не купил ни одной лабы, но не расстраивайся, это не сложно исправить)`);

            } else
                await ctx.reply("Сегодня вы уже вызывали список своих лаб, проверьте выше!");
        })
    }, 1000);
})

bot.launch(console.log("\nБот начал работу\n\nДействия:\n\n"));