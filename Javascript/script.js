//depois do Post do quizz: promisse.then(sucessoCriarQuiz);

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

function acessarQuiz() {

    document.querySelector(".container-sucesso-quiz").classList.add("desligado");
    document.querySelector(".quiz").classList.remove("desligado");
}

function acessarHome () {

    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(renderizarHome)
    document.querySelector(".container-sucesso-quiz").classList.add("desligado");
    document.querySelector(".home").classList.remove("desligado");
}

function renderizarHome () {
    
}