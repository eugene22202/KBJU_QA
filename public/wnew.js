document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate");
    const modal = document.getElementById("result-modal");
    const closeButton = document.querySelector(".close-button");
    const resultText = document.getElementById("result-text");

    calculateButton.addEventListener("click", function () {
        const goal = parseFloat(document.getElementById("goal").value);
        const activity = parseFloat(document.getElementById("activity").value);
        const weight = document.getElementById("weight").value;
        const height = document.getElementById("height").value;
        const age = document.getElementById("age").value;

        // Перевірка на порожні значення
        if (!weight || !height || !age) {
            resultText.textContent = "Помилка: Некоректні дані";
            modal.style.display = "block";
            return;
        }

        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);
        const ageNum = parseFloat(age);

        let C = (weightNum * 10 + heightNum * 6.25 - (ageNum * 5 + 5)) * activity;
        C += C * goal;

        resultText.textContent = `Ваш розрахунок: ${C.toFixed(2)} ккал`;
        modal.style.display = "block";
    });

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
