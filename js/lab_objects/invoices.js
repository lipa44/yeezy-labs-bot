const token_sber = "401643678:TEST:67a0ddff-2651-4c09-8a13-43b56e3dea54";
const id = 316816204;

module.exports = {

    Lab2: {
        chat_id: id,
        start_parameter: 'get_access',
        provider_token: token_sber,
        title: '2я лаба (Полином)', // 1-32 символа
        description: 'Лучшая лаба', // 1-255 знаков
        currency: 'RUB', // Трехбуквенный код валюты ISO 4217
        prices: [{label: 'Лабораторная работа №2', amount: 750 * 100}], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
        photo_url: 'https://img2.freepng.ru/20180402/ksw/kisspng-quadratic-equation-quadratic-formula-quadratic-fun-formula-5ac248ba8bfc78.6951888315226820425734.jpg', // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги.
        photo_width: 900,
        photo_height: 420,
        payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: token_sber
        }
    },

    Lab3: {
        chat_id: id,
        start_parameter: 'get_access',
        provider_token: token_sber,
        title: '3я лаба (Парсер)', // 1-32 символа
        description: 'Лучшая лаба', // 1-255 знаков
        currency: 'RUB', // Трехбуквенный код валюты ISO 4217
        prices: [{label: 'Лабораторная работа №3', amount: 1500 * 100}], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
        photo_url: 'https://tyrrrz.me/static/c2bac619f80e8d5227b5b28f45fa4c18/41e43/Cover.png', // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги.
        photo_width: 849,
        photo_height: 339,
        payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: token_sber
        }
    },

    Lab4: {
        chat_id: id,
        start_parameter: 'get_access',
        provider_token: token_sber,
        title: '4я лаба (Шаблоны)', // 1-32 символа
        description: 'Лучшая лаба', // 1-255 знаков
        currency: 'RUB', // Трехбуквенный код валюты ISO 4217
        prices: [{label: 'Лабораторная работа №4', amount: 1000 * 100}], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
        photo_url: 'https://w7.pngwing.com/pngs/822/828/png-transparent-the-c-standard-library-template-computer-programming-programming-style-template-angle-text.png', // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги.
        photo_width: 849,
        photo_height: 472,
        payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: token_sber
        }
    },

    Lab5: {
        chat_id: id,
        start_parameter: 'get_access',
        provider_token: token_sber,
        title: '5я лаба (Кольцевой буффер)', // 1-32 символа
        description: 'Лучшая лаба', // 1-255 знаков
        currency: 'RUB', // Трехбуквенный код валюты ISO 4217
        prices: [{label: 'Лабораторная работа №5', amount: 1000 * 100}], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
        photo_url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Circular_Buffer_Animation.gif', // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги.
        photo_width: 838,
        photo_height: 820,
        payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: token_sber
        }
    },

    Lab6: {
        chat_id: id,
        start_parameter: 'get_access',
        provider_token: token_sber,
        title: '6я лаба (Кубик Рубика)', // 1-32 символа
        description: 'Лучшая лаба', // 1-255 знаков
        currency: 'RUB', // Трехбуквенный код валюты ISO 4217
        prices: [{label: 'Лабораторная работа №6', amount: 2000 * 100}], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
        photo_url: 'https://pngimg.com/uploads/rubik_cube/rubik_cube_PNG36.png', // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги.
        photo_width: 600,
        photo_height: 600,
        payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: token_sber
        }
    }
}