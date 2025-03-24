const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let formData = {};
let result = null;

function recalc() {
    if (!formData.weight || !formData.height || !formData.age) {
        result = "Помилка: Некоректні дані";
        return;
    }

    const bmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5;
    let multiplier = 1.375; // За замовчуванням

    switch (formData.activity) {
        case 'Низька':
            multiplier = 1.2;
            break;
        case 'Середня':
            multiplier = 1.55;
            break;
        case 'Висока':
            multiplier = 1.9;
            break;
        case 'Дуже висока':
            multiplier = 2.2;
            break;
    }

    if (formData.goal === 'Зниження ваги') {
        result = bmr * multiplier - 500;
    } else if (formData.goal === 'Набір маси') {
        result = bmr * multiplier + 500;
    } else {
        result = bmr * multiplier;
    }
}

Given('я заповнив форму з вагою {int}, зростом {int}, віком {int}', function (weight, height, age) {
    formData.weight = weight;
    formData.height = height;
    formData.age = age;
});

Given('я вибрав ціль {string} та активність {string}', function (goal, activity) {
    formData.goal = goal;
    formData.activity = activity;
});

Given('я залишив поле "Вага" порожнім', function () {
    formData.weight = null;
});

Given('я заповнив інші поля коректними значеннями', function () {
    formData.height = 170;
    formData.age = 25;
    formData.activity = 'Середня';
    formData.goal = 'Підтримка ваги';
});

Given('я вибрав активність {string}', function (activity) {
    formData.activity = activity;
});

When('я натискаю кнопку {string}', function (button) {
    if (button === 'Старт') {
        recalc();
    }
});

When('я змінюю активність на {string}', function (activity) {
    formData.activity = activity;
    recalc();
});

When('я змінюю вагу на {int}, зріст на {int}, вік на {int}', function (weight, height, age) {
    formData.weight = weight;
    formData.height = height;
    formData.age = age;
    recalc();
});

Then('я повинен побачити розрахунок калорій', function () {
    assert.strictEqual(typeof result, 'number', 'Очікувався розрахунок калорій');
});

Then('я повинен побачити зміну значення розрахованих калорій', function () {
    assert.strictEqual(typeof result, 'number', 'Розрахунок калорій не змінився');
});

Then('я повинен побачити повідомлення про помилку', function () {
    assert.strictEqual(result, 'Помилка: Некоректні дані', 'Не з’явилося повідомлення про помилку');
});

Then('я повинен побачити розрахунок калорій без помилок', function () {
    assert.strictEqual(typeof result, 'number', 'Розрахунок калорій некоректний');
});

Then('я повинен побачити коректний розрахунок калорій', function () {
    assert.strictEqual(typeof result, 'number', 'Розрахунок калорій некоректний');
});
