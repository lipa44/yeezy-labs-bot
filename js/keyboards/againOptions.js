module.exports = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Ещё одну!', callback_data: 'Заново'}, {text: 'На сегодня хватит', callback_data: 'Закончить работу'}]
        ]
    })
};