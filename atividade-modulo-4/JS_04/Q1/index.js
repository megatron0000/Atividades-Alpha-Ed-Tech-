
const peso = document.querySelector('#peso');
const altura = document.querySelector('#altura');
const res = document.querySelector('h1');

const btn = document.querySelector("#btn");
btn.addEventListener('click', calcular);

function calcular(){

    let peso_ = parseInt(peso.value);
    let altura_ = parseInt(altura.value);
    
    if((!isNaN(parseInt(peso_)) && !isNaN(parseInt(altura_)))){
        let IMC = (peso_ / (altura_*altura_)).toFixed(2);
        
        if(IMC < 18.5){
            res.textContent = "O seu IMC é: " + IMC +". Você esta abaixo do peso";
        }

        else if(IMC >= 18.5 && IMC <= 24.9) {
            res.textContent = "O seu IMC é: " + IMC +". Seu peso esta normal";
        }

        else if(IMC >= 25 && IMC <= 29.9) {
            res.textContent = "O seu IMC é: " + IMC +". Você esta com sobrepeso";
        }

        else if(IMC > 30) {
            res.textContent = "O seu IMC é: " + IMC +". Você esta com Obesidade";
        }
    }

    else { 
        alert("Digite apenas numeros");
    }

}
