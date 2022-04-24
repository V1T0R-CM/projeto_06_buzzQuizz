let renderizadorHome = document.querySelector(".caixaQuiz");
let idQuiz;
let objetoQuiz = {};
let perguntasQuiz = {};

function acessarHome () {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(renderizarHome)
}
function renderizarHome (resposta) {
    document.querySelector(".home").classList.add("ligado");
    document.querySelector(".home").classList.remove("desligado");
    renderizadorHome.innerHTML = ""
    objetoQuiz = resposta.data
    for (let i = 0; i < resposta.data.length; i ++) {
        renderizadorHome.innerHTML +=`
            <div class="preQuiz a${resposta.data[i].id}" onclick="acessarQuiz(this)">
                <img src="${resposta.data[i].image}" alt="Quizz"/>
                <span>${resposta.data[i].title}</span>
                <div class="gradiente"></div>
            </div>`
    }
}



function randomizar() {
    return Math.random() - 0.5;
}
function acessarQuiz(elemento) {
    document.querySelector(".ligado").classList.add("desligado");
    document.querySelector(".ligado").classList.remove("ligado");
    idQuiz = elemento.classList[1].replace("a","");
    for (let i = 0; i < objetoQuiz.length; i ++) {
        if (idQuiz == objetoQuiz[i].id) {
            perguntasQuiz = objetoQuiz[i].questions
            document.querySelector(".quiz").innerHTML = `
                <div class="topoQuiz">
                    <img src=${objetoQuiz[i].image} alt="img" />
                    <span>${objetoQuiz[i].title}</span>
                    <div class="pelicula"></div>
                </div>`;
            for (let j = 0; j < perguntasQuiz.length; j ++) {
                document.querySelector(".quiz").innerHTML += `
                    <div class="perguntaQuiz">
                        <div class="tituloPergunta">${objetoQuiz[i].questions[j].title}</div>
                        <div class="grupo">`
                for (let k = 0; k < perguntasQuiz[j].length; k ++) {
                    document.querySelector(".quiz").innerHTML += `
                            <div class="element">
                                <img src=${perguntasQuiz[j].answer[k].image} alt="img" />
                                <h6>${perguntasQuiz[j].answer[k].text}</h6>
                            </div>`
                }
                document.querySelector(".quiz").innerHTML +=
                        `</div>
                    </div>`
            }
            document.querySelector(".quiz").innerHTML +=`
                <div class="perguntaQuiz">
                    <div class="tituloPergunta">${objetoQuiz[i].levels[0].title}</div>
                    <img src=${objetoQuiz[i].levels[0].image} alt="img" />
                    <h6>${objetoQuiz[i].levels[0].text}</h6>
                </div>
                <button onclick="reiniciarQuiz()">Reiniciar Quizz</button>
                <div class="voltaHome" onclick="sairPagina()">Voltar pra home</div>`
        }
    }
    document.querySelector(".quiz").classList.remove("desligado");
    document.querySelector(".quiz").classList.add("ligado");
}
function sucessoCriarQuiz() {

    document.querySelector(".container-sucesso-quiz").innerHTML =`
        <div>Seu quizz está pronto!</div>
        <div class="preQuiz" onclick="acessarQuiz()">
            <img src="infoQuizz.image" alt="Quizz"/>
            <span>infoQuizz.title</span>
            <div class="gradiente"></div>
        </div>
        <button onclick="acessarQuiz()">Acessar Quizz</button>
        <div class="voltaHome" onclick="acessarHome()">Voltar pra home</div>`

    document.querySelector(".container-sucesso-quiz").classList.remove("desligado");
    document.querySelector(".conteiner-criacao-quiz").classList.add("desligado");

}



function sairPagina() {
    console.log(document.querySelector(".ligado"))
    document.querySelector(".ligado").classList.add("desligado");
    document.querySelector(".ligado").classList.remove("ligado");
    acessarHome();
}



acessarHome ()