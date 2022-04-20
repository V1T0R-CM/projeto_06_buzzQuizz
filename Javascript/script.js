promisse.then(sucessoCriarQuiz);

function sucessoCriarQuiz {
    document.querySelector(".container-sucesso-quiz").classList.remove("desligado");
    document.querySelector("conteiner-criacao-quiz").classList.add("desligado");
}