
const res = document.querySelector('h1');

const btn = document.querySelector("#btn");
btn.addEventListener('click', calcular);

function calcular(){
    
    const numero = Math.random() * (100 - 0 + 1) - 0 ;
    console.log(numero.toFixed(1));
    if(numero.toFixed(1) < 8.6 && numero.toFixed(1) >= 0) {
        res.textContent = `Parabéns, você é uma idosa`;
    } else if (numero.toFixed(1) >= 8.6 && numero.toFixed(1) < 16.7) {
        res.textContent = `Parabéns, você é um idoso`;
    } else if (numero.toFixed(1) >= 16.7 && numero.toFixed(1) < 56.9) {
        res.textContent = `Parabéns, você é um jovem`;
    } else {
        res.textContent = `Parabéns, você é uma senhorita jovem`;
    }    

}