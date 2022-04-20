let tituloQuizz
let urlImgQuizz
let quantPerguntas
let nivelQuizz

function verificaInfo(){
    tituloQuizz=document.querySelector(".titulo-quiz").value
    urlImgQuizz=document.querySelector(".imagem-quiz").value
    quantPerguntas=document.querySelector(".quant-perguntas").value
    nivelQuizz=document.querySelector(".quant-niveis").value
    const pattern = /^https:\/\//i;
    if(tituloQuizz.length>65 ||tituloQuizz.length<20){
      alert("Preencha os dados corretamente")
    }
    if(!pattern.test(urlImgQuizz)){
      alert("Preencha os dados corretamente")
    }
    if(Number(quantPerguntas)<3){
      alert("Preencha os dados corretamente")
    }
    if(Number(nivelQuizz)<2){
      alert("Preencha os dados corretamente")
    }
  }
  