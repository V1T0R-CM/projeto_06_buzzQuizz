function criaConteinerQuizProprios(){
    if(localStorage.getItem("listaQuizz")!==null){
        document.querySelector(".privadosQuizz").classList.remove("vazio")
        document.querySelector(".privadosQuizz").innerHTML=`
        <div>
            <span>Seus Quizzes   </span> 
            <ion-icon name="add-circle" onclick="abreJanelaCriacao()"></ion-icon>
        </div>
        `
        //chamar a função que vai renderizar os quiz do local storage
    }
}