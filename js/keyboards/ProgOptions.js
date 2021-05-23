module.exports = {
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