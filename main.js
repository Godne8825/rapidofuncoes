let pontos = 0
var valores_salvos = {pontos_total: 0, tempo: 0}
localStorage.setItem('produto1', JSON.stringify(valores_salvos))
let velocidade = 0.3
let change = 0
let pontoDeColisao = {
    top: '522px'
}
let pode_comecar = true
let posso_resetar = false
let formulas = [
    {
        certa: "Álcool",
        imagem: "alcool.png"
    },
    {
        certa: "Fenol",
        imagem: "fenol.png"
    },
    {
        certa: "Éter",
        imagem: "eter.png"
    },
    {
        certa: "Amina",
        imagem: "amina.png"
    },
    {
        certa: "Amida",
        imagem: "amida.png"
    },
    {
        certa: "Éster",
        imagem: "ester.png"
    },
    {
        certa: "Aldeído",
        imagem: "aldeido.png"
    },
    {
        certa: "Cetona",
        imagem: "cetona.png"
    },
    {
        certa: "Enol",
        imagem: "enol2.png"
    },
]
document.getElementById('nome_digitar').oninput = function() {
    let texto = document.querySelector("#nome_digitar")
    let formulaAtuando = document.getElementById('quiz-tela').children
    for (i = 0; i < formulaAtuando.length; i++){
        console.log(formulaAtuando[i].alt)
        if (texto.value == formulaAtuando[i].alt){
            console.log(formulaAtuando.length)
            let valor = JSON.parse(localStorage.getItem('produto1'))
            pontos = pontos + 1
            valor.pontos_total = pontos
            formulaAtuando[i].remove()
            posso_resetar = true
            if (formulaAtuando.length < 1){
                change = 0
                let newimg = CriarFormulas()
                let newimg2 = CriarFormulas2()
                newimg
                newimg2
            }
        }
    }
    console.log(document.getElementById('nome_digitar').innerText);
};
function arrayAleatorio(){
    return formulas[~~(Math.random() * formulas.length)]
}
function CriarBox(w,h){
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.id = 'box-jogo'
    canvas.style.border = '2px solid red'
    var ctx = canvas.getContext('2d');
    document.getElementById('quiz-tela').appendChild(canvas)
    return canvas
}
function CriarFormulas(){
    let formula = arrayAleatorio()
    let imagem = new Image
    imagem.src = formula.imagem
    imagem.width = 150
    imagem.alt = formula.certa
    imagem.style.top = "0px"
    imagem.style.left = "500px"
    imagem.style.right = "0px"
    imagem.style.margin = 'auto'
    imagem.style.position = 'absolute'
    imagem.style.alignSelf = 'flex-start'
    imagem.style.objectFit = 'cover'
    document.getElementById('quiz-tela').appendChild(imagem)
    return imagem
}
function CriarFormulas2(){
    let formula = arrayAleatorio()
    let imagem = new Image
    imagem.src = formula.imagem
    imagem.width = 150
    imagem.alt = formula.certa
    imagem.style.top = "0px"
    imagem.style.left = "-500px"
    imagem.style.right = "0px"
    imagem.style.margin = 'auto'
    imagem.style.position = 'absolute'
    imagem.style.alignSelf = 'flex-start'
    imagem.style.objectFit = 'cover'
    document.getElementById('quiz-tela').appendChild(imagem)
    return imagem
}
function VerificarNome(form){
    let texto = document.querySelector("#nome_digitar")
    if (texto.value == form.alt){
        pontos = pontos + 1
        let storage_pontos = JSON.parse(localStorage.getItem('produto1'))
        console.log("Valores salvos: " + storage_pontos)
        form.remove()
    }
}
function PegarElemento(id){
    let elemento = document.getElementById(id)
    return elemento
}
function Desativar(id){
    let objeto = document.getElementById(id)
    objeto.style.display = "none"
}
function Aparecer(id){
    let objeto = document.getElementById(id)
    objeto.style.display = "flex"
}
function JogoAcabado(){
    console.log("Jogo acabou")
}
function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
    Desativar("quiz-tela")
    Desativar("nome_digitar")
    Desativar("pontos_total")
    Aparecer("perdeu_tela")
    document.getElementById('texto_pontos').textContent = pontos
}

var objeto = setInterval(CriarJogo, 2, 1000);
let Imagem_Criar = PegarElemento("form_img")
let img = CriarFormulas()

function CriarJogo(){
    let testando = document.getElementById('jogar-btn')
    if (testando.style.display == "none"){
        document.getElementById('pontos_total').innerText = pontos
        document.cookie = 'pontos_atual=' + document.getElementById('pontos_total').innerText + '; expires=' + new Date(9999,0,1).toUTCString()
        let formulaAtuando = document.getElementById('quiz-tela').children
        for (i = 0; i < formulaAtuando.length; i++){
            formulaAtuando[i].style.top = change + "px"
            if (formulaAtuando[i].style.top == pontoDeColisao.top){
                clearBox('quiz-tela')
                clearInterval(objeto);
                console.log(formulaAtuando.length)
                let cookieIndex = document.cookie[23]
                let cookieLast = document.cookie[39]
                let somarPontos = parseInt(cookieIndex) + parseInt(cookieLast)
                document.cookie = 'pontos_total=' + somarPontos + '; expires=' + new Date(9999,0,1).toUTCString()
                console.log("Testando a soma: " + somarPontos,cookieIndex,cookieLast)
                sessionStorage.setItem('pontos_atual',pontos)
                sessionStorage.setItem('pontos_melhor',0)
                sessionStorage['pontos_vida'] = parseInt(sessionStorage['pontos_vida']) + parseInt(sessionStorage['pontos_atual'])
                //console.log('Pontos atual: ' + somarPontos)
                JogoAcabado()
            }
        }
        change += velocidade;
    } else {
        return
    }
}

function Jogar(){
    Desativar("jogar-btn")
    Aparecer("quiz-tela")
    Aparecer("nome_digitar")
    Aparecer("pontos_total")
    CriarJogo()
    console.log('afdff')
    let valor = JSON.parse(localStorage.getItem('produto1'))
    console.log(valor)
}
function RefreshPagina(){
    window.location.reload(true);
}