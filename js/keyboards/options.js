module.exports = {
    options: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Прога', callback_data: 'Прога'}, {text: 'Алгосы (не работает)', callback_data: 'Алгосы'}]
            ]
        })
    },

    ProgOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '1я лаба (фигуры)', callback_data: '1'}, {text: '2я лаба (полином)', callback_data: '2'}],
                [{text: '3я лаба (парсер)', callback_data: '3'}, {text: '4я лаба (шаблоны)', callback_data: '4'}],
                [{text: '5я лаба (кольцевой буффер)', callback_data: '5'}, {text: '6я лаба (кубик)', callback_data: '6'}]
            ]
        })
    },

    paymentOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Купить лабу', callback_data: 'Купить'}, {text: 'Выйти', callback_data: 'Выйти'}]
            ]
        })
    },

    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Ещё одну!', callback_data: 'Заново'}, {
                    text: 'На сегодня хватит',
                    callback_data: 'Закончить работу'
                }]
            ]
        })
    },

    lab6paymentOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Купить лабу', callback_data: 'Купить 6ю'}, {text: 'Выйти', callback_data: 'Выйти'}]
            ]
        })
    },

    lab6IfVisualOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'С визуализацией!', callback_data: 'Визуал'}, {text: 'Без неё...', callback_data: 'Без визуала'}]
            ]
        })
    },

    visualLab6Options: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'MacOS', callback_data: 'МакОС визуал'}, {text: 'Windows/Ubuntu', callback_data: 'Винда/Убунту визуал'}]
            ]
        })
    },

    nonVisualLab6Options: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '1я', callback_data: '1я не визуал'}, {text: '2я', callback_data: '2я не визуал'}],
                [{text: '3я', callback_data: '3я не визуал'}]
            ]
        })
    }

};