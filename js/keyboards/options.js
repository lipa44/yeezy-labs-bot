module.exports = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Прога', callback_data: 'Прога'}],
            [{text: 'Алгосы (пока не работает)', callback_data: 'Алгосы'}],
        ]
    })
};