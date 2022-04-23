const infoQuizz={}
let quantPerguntas
let nivelQuizz

function verificaInfo(){
  infoQuizz.title=document.querySelector(".titulo-quiz").value
  infoQuizz.image=document.querySelector(".imagem-quiz").value
  quantPerguntas=document.querySelector(".quant-perguntas").value
  nivelQuizz=document.querySelector(".quant-niveis").value
  let valido=true
  const urlR = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  if(infoQuizz.title.length>65 ||infoQuizz.title.length<20){
    valido=false
  }
  if(!urlR.test(infoQuizz.image)){
    valido=false
  }
  if(Number(quantPerguntas)<3){
    valido=false
  }
  if(Number(nivelQuizz)<2){
    valido=false
  }
  if(valido){
    document.querySelector(".secao-info-basica").classList.add("desligado")
    document.querySelector(".secao-cria-pergunta").classList.remove("desligado")
    criaConfigPerguntas()
  }
  else{
    alert("Preencha os dados corretamente")
  }
}

function criaConfigPerguntas(){
  for(let i=0; i<quantPerguntas; i++){
    document.querySelector(".lista-config-perguntas").innerHTML+=`
    <div class="config-pergunta">
      <div class="info pergunta">
        <h3>Pergunta ${i+1}</h3> 
        <img src="./imagens/editar.png" alt="Botão de edição" onclick="abrirConfigPergunta(this)"/> 
        <div>
            <input type="text" placeholder="Texto da pergunta">
            <input type="text" placeholder="Cor de fundo da pergunta">
        </div>
      </div>
      <div class="info resp-correta">
        <h3>Resposta correta</h3>
        <div>
            <input type="text" placeholder="Resposta correta">
            <input type="text" placeholder="URL da imagem">
        </div>
      </div>
      <div class="info resp-incorreta">
        <h3>Resposta incorreta</h3>
        <div>
            <input type="text" placeholder="Resposta incorreta 1">
            <input type="text" placeholder="URL da imagem 1">
        </div>
        <div>
            <input type="text" placeholder="Resposta incorreta 2">
            <input type="text" placeholder="URL da imagem 2">
        </div>
        <div>
            <input type="text" placeholder="Resposta incorreta 3">
            <input type="text" placeholder="URL da imagem 3">
        </div> 
      </div>
    </div>`
  }
}

function abrirConfigPergunta(elemento){
  if(document.querySelector(".lista-config-perguntas .aberto")!== null){
    document.querySelector(".lista-config-perguntas .aberto").classList.remove("aberto");
  }
  const elementoPai=elemento.parentNode
  const elementoVo=elementoPai.parentNode
  elementoVo.classList.add("aberto")
}

function ehHexadecimal(cor){
  const letrasPossiveis=["a","b","c","d","e","f"]
  let valido
  if(cor.length!==7){
    return false
  }
  if(cor[0]!=="#"){
    return false
  }
  for(let i=1;i<cor.length;i++){
    if(isNaN(cor[i])){
      for(let j=0;j<letrasPossiveis.length;j++){
        if(cor[i]!==letrasPossiveis[j]){
          valido=false
        }
        else{
          valido=true
          break
        }
      }
      if(!valido){
        return false
      }
    }
  }
  return true
}

function pegaAlternativas(elemento){
  const urlR = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  let alternativas=[]
  let infoAlternativaCorreta={}
  infoAlternativaCorreta.text=elemento.querySelector(".resp-correta input:nth-child(1)").value
  if(!urlR.test(elemento.querySelector(".resp-correta input:nth-child(2)").value)){
    return false
  }
  infoAlternativaCorreta.image=elemento.querySelector(".resp-correta input:nth-child(2)").value
  infoAlternativaCorreta.isCorrectAnswer=true
  alternativas.push(infoAlternativaCorreta)
  const listaAlternativasErradas=elemento.querySelectorAll(".resp-incorreta div")
  let numValidas=3
  for(let i=0; i<3;i++){
    let infoAlternativa={}
    if(!urlR.test(listaAlternativasErradas[i].querySelector("input:nth-child(2)").value) || listaAlternativasErradas[i].querySelector("input:nth-child(1)").value===""){
      numValidas--
    }
    infoAlternativa.text=listaAlternativasErradas[i].querySelector("input:nth-child(1)").value
    infoAlternativa.image=listaAlternativasErradas[i].querySelector("input:nth-child(2)").value
    infoAlternativa.isCorrectAnswer=false
    alternativas.push(infoAlternativa)
  }
  if(numValidas>=1){
    return alternativas
  }
  return false
}

function verificaPerguntas(){
  infoQuizz.questions=[]
  const listaPerguntas=document.querySelectorAll(".config-pergunta")
  for(let i=0; i<listaPerguntas.length; i++){
    let infoPergunta={}
    if(listaPerguntas[i].querySelector(".pergunta input:nth-child(1)").value.length<20){
      alert("Preencha os dados corretamente")
      break
    }
    infoPergunta.title=listaPerguntas[i].querySelector(".pergunta input:nth-child(1)").value
    if(!ehHexadecimal(listaPerguntas[i].querySelector(".pergunta input:nth-child(2)").value)){
      alert("Preencha os dados corretamente")
      break
    }
    infoPergunta.color=listaPerguntas[i].querySelector(".pergunta input:nth-child(2)").value
    if(pegaAlternativas(listaPerguntas[i])===false){
      alert("Preencha os dados corretamente")
      break
    }
    infoPergunta.answers=pegaAlternativas(listaPerguntas[i])
    infoQuizz.questions.push(infoPergunta)
  }
}