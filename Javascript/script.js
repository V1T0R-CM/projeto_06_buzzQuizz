//depois do Post do quizz: promisse.then(sucessoCriarQuiz);

function sucessoCriarQuiz() {

    document.querySelector(".container-sucesso-quiz").innerHTML =`
        <div>Seu quizz está pronto!</div>
        <div class="quiz">
            <img src="${}" alt="Quizz">
            <span>${}</span>
            <div class="gradiente"></div>
        </div>
        <button onclick="acessarQuiz()">Acessar Quizz</button>
        <div class="home" onclick="homePage()">Voltar pra home</div>`

    document.querySelector(".container-sucesso-quiz").classList.remove("desligado");
    document.querySelector("conteiner-criacao-quiz").classList.add("desligado");

}