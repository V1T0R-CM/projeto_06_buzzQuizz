//depois do Post do quizz: promisse.then(sucessoCriarQuiz);

let renderizadorHome = document.querySelector(".caixaQuiz");
let idQuiz;

function acessarHome () {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(renderizarHome)
}
function renderizarHome (resposta) {
    document.querySelector(".home").classList.remove("desligado");
    renderizadorHome.innerHTML = ""
    for (let i = 0; i < resposta.data.length; i ++) {
        renderizadorHome.innerHTML +=`
            <div class="preQuiz a${resposta.data[i].id}" onclick="acessarQuiz(this)">
                <img src="${resposta.data[i].image}" alt="Quizz"/>
                <span>${resposta.data[i].title}</span>
                <div class="gradiente"></div>
            </div>`
    }
}
function acessarQuiz(elemento) {
    document.querySelector(".home").classList.add("desligado");
    document.querySelector(".quiz").classList.remove("desligado");
    idQuiz = elemento.classList[1]
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

acessarHome ()