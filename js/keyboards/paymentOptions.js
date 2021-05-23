module.exports = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Купить лабу', callback_data: 'Купить'}],
            [{text: 'Выйти', callback_data: 'Выйти'}],
        ]
    })
};