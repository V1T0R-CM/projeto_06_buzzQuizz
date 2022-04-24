//depois do Post do quizz: promisse.then(sucessoCriarQuiz);

let renderizadorHome = document.querySelector(".caixaQuiz");
let idQuiz;
let objetoQuiz = {};

function acessarHome () {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(renderizarHome)
}
function renderizarHome (resposta) {
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
    console.log(objetoQuiz)
    document.querySelector(".home").classList.add("desligado");
    idQuiz = elemento.classList[1].replace("a","");
    for (let i = 0; i < objetoQuiz.length; i ++) {
        if (idQuiz == objetoQuiz[i].id) {
            document.querySelector(".quiz").innerHTML = `
                <div class="topoQuiz">
                    <img src=${objetoQuiz[i].image} alt="img" />
                    <span>${objetoQuiz[i].title}</span>
                    <div class="pelicula"></div>
                </div>`;
            for (let j = 0; j < objetoQuiz[i].questions.length; j ++) {
                document.querySelector(".quiz").innerHTML += `
                    <div class="perguntaQuiz">
                        <div class="tituloPergunta">${objetoQuiz[i].questions[j].title}</div>
                        <div class="grupo">
                            <div class="element">
                                <img src="https://sm.ign.com/ign_br/screenshot/default/goku_trw2.jpg" alt="img" />
                                <h6>gato</h6>
                            </div>
                            <div class="element">
                                <img src="https://sm.ign.com/ign_br/screenshot/default/goku_trw2.jpg" alt="img" />
                                <h6>gato</h6>
                            </div>
                        </div>
                        <div class="grupo">
                            <div class="element">
                                <img src="https://sm.ign.com/ign_br/screenshot/default/goku_trw2.jpg" alt="img" />
                                <h6>gato</h6>
                            </div>
                        </div>
                    </div>`
            }
            document.querySelector(".quiz").innerHTML +=`
                <div class="perguntaQuiz">
                    <div class="tituloPergunta">qqquuaaaaaal????</div>
                    <img src="https://sm.ign.com/ign_br/screenshot/default/goku_trw2.jpg" alt="img" />
                    <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste cumque at, quasi maiores amet vero quo
                        modi rerum temporibus non, quidem doloribus eos error commodi voluptates. In quisquam ipsam iure?</h6>
                </div>
                <button onclick="reiniciarQuiz()">Reiniciar Quizz</button>
                <div class="voltaHome" onclick="acessarHome()">Voltar pra home</div>`
        }
    }
    document.querySelector(".quiz").classList.remove("desligado");
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