//exercicio par ou impar
const escolhaJogador=process.argv[2]
const numeroJogador=process.argv[3]
console.log(`você escolheu ${escolhaJogador}`)
console.log(`Você escolheu ${Number(numeroJogador)}`)
if(!escolhaJogador){
    console.log("Escolha um número  par ou ímpar")
}if(escolhaJogador=== "par"){
    function maxMin(min, max){
        return Math.floor(Math.random() * (max - min +1)) +min;

    }
    const numeroAleatorio=maxMin(0,10)
console.log("o computador escolheu ímpar")
console.log(`O computador escolheu ${numeroAleatorio}`)
let resultado = Number(numeroJogador) + Number(numeroAleatorio)
console.log(`A soma dos números deu ${resultado}`)
resultado %2===0? console.log("você ganhou"): console.log("Você perdeu")


}
else{
    function numeroComputador(min, max){
        return Math.floor(Math.random() * (max - min +1)) +min;

    }
    const numeroAleatorio=numeroComputador(0, 10)
    console.log("O computador escolheu par")
    console.log(`O computador escolheu ${numeroAleatorio}`)
    let resultado = Number(numeroJogador) + Number(numeroAleatorio)
    console.log(`A soma dos números deu ${resultado}` )
    resultado %2===1? console.log("você ganhou"): console.log("Você perdeu")}