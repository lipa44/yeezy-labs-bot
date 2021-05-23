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
                [{text: '5я лаба (кольцевой буффер)', callback_data: '5'}, {
                    text: '6я лаба (кубик)',
                    callback_data: '6'
                }]
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
    }
};