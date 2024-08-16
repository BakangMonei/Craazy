
// script.js

const wheel = document.getElementById('wheel');
const resultDiv = document.getElementById('result');

const prizes = [
    { name: 'Cap', probability: 0.15, value: 50 },
    { name: 'Keyholder', probability: 0.20, value: 30 },
    { name: 'Pen', probability: 0.25, value: 20 },
    { name: 'P20 Airtime', probability: 0.20, value: 20 },
    { name: 'P50 Airtime', probability: 0.10, value: 50 },
    { name: 'P100 Airtime', probability: 0.05, value: 100 },
    { name: 'Try Again', probability: 0.05, value: 0 }
];

let dailyBudget = 500;
let winnersCount = 0;
const maxWinners = 10;

function spinWheel() {
    if (winnersCount >= maxWinners) {
        resultDiv.textContent = "No more spins today!";
        return;
    }

    const rotation = Math.random() * 360;
    wheel.style.transform = `rotate(${rotation}deg)`;

    const selectedPrize = getPrize();
    
    if (selectedPrize) {
        winnersCount++;
        dailyBudget -= selectedPrize.value;
        resultDiv.textContent = `You won: ${selectedPrize.name}!`;
        if (dailyBudget <= 0) {
            resultDiv.textContent = "Prize budget exhausted!";
            document.getElementById('spin-button').disabled = true;
        }
    } else {
        resultDiv.textContent = "Try Again!";
    }
}

function getPrize() {
    let cumulativeProbability = 0;
    const random = Math.random();

    for (let i = 0; i < prizes.length; i++) {
        cumulativeProbability += prizes[i].probability;
        if (random < cumulativeProbability) {
            if (prizes[i].value <= dailyBudget) {
                return prizes[i];
            } else {
                return null;
            }
        }
    }
    return null;
}
