Feature: Калькулятор калорій

  Scenario: Обчислення калорій для зниження ваги
    Given я заповнив форму з вагою 70, зростом 175, віком 25
    And я вибрав ціль "Зниження ваги" та активність "Середня"
    When я натискаю кнопку "Старт"
    Then я повинен побачити розрахунок калорій

  Scenario: Обчислення калорій для набору маси
    Given я заповнив форму з вагою 80, зростом 180, віком 30
    And я вибрав ціль "Набір маси" та активність "Висока"
    When я натискаю кнопку "Старт"
    Then я повинен побачити розрахунок калорій

  Scenario: Перевірка коректності розрахунків при зміні активності
    Given я заповнив форму з вагою 75, зростом 170, віком 28
    And я вибрав ціль "Підтримка ваги" та активність "Низька"
    When я змінюю активність на "Висока"
    Then я повинен побачити зміну значення розрахованих калорій

  Scenario: Перевірка обробки некоректних даних
    Given я залишив поле "Вага" порожнім
    And я заповнив інші поля коректними значеннями
    When я натискаю кнопку "Старт"
    Then я повинен побачити повідомлення про помилку

  Scenario: Перевірка відображення результату для мінімальних/максимальних значень
    Given я заповнив форму з вагою 30, зростом 140, віком 18
    And я вибрав активність "Дуже висока"
    When я натискаю кнопку "Старт"
    Then я повинен побачити розрахунок калорій без помилок
    When я змінюю вагу на 200, зріст на 220, вік на 90
    Then я повинен побачити коректний розрахунок калорій
