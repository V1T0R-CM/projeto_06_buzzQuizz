const infoQuizz={}
let quantPerguntas
let nivelQuizz

function verificaInfo(){
  infoQuizz.title=document.querySelector(".titulo-quiz").value
  infoQuizz.image=document.querySelector(".imagem-quiz").value
  quantPerguntas=document.querySelector(".quant-perguntas").value
  nivelQuizz=document.querySelector(".quant-niveis").value
  let valido=true
  const urlR = /^https:\/\//i;
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
  for(let i=0; i<Number(quantPerguntas); i++){
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


function abrirConfigNivel(elemento){
  if(document.querySelector(".lista-config-niveis .aberto")!== null){
    document.querySelector(".lista-config-niveis .aberto").classList.remove("aberto");
  }
  const elementoPai=elemento.parentNode
  elementoPai.classList.add("aberto")
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
  const urlR = /^https:\/\//i;
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
  let valido=true
  for(let i=0; i<listaPerguntas.length; i++){
    let infoPergunta={}
    if(listaPerguntas[i].querySelector(".pergunta input:nth-child(1)").value.length<20){
      valido=false
      break
    }
    infoPergunta.title=listaPerguntas[i].querySelector(".pergunta input:nth-child(1)").value
    if(!ehHexadecimal(listaPerguntas[i].querySelector(".pergunta input:nth-child(2)").value)){
      valido=false
      break
    }
    infoPergunta.color=listaPerguntas[i].querySelector(".pergunta input:nth-child(2)").value
    if(pegaAlternativas(listaPerguntas[i])===false){
      valido=false
      break
    }
    infoPergunta.answers=pegaAlternativas(listaPerguntas[i])
    infoQuizz.questions.push(infoPergunta)
  }
  if(valido){
    document.querySelector(".secao-cria-pergunta").classList.add("desligado")
    document.querySelector(".secao-cria-niveis").classList.remove("desligado")
    criaConfigNiveis()
  }
  else{
    alert("Preencha os dados corretamente")
  }
}

function criaConfigNiveis(){
  for(let i=0; i<Number(nivelQuizz); i++){
    document.querySelector(".lista-config-niveis").innerHTML+=`
    <div class="config-nivel">
      <h3>Nível ${i+1}</h3>
      <img src="./imagens/editar.png" alt="Botão de edição" onclick="abrirConfigNivel(this)"/>
      <div>
          <input type="text" placeholder="Título do nível">
          <input type="text" placeholder="% de acerto mínima">
          <input type="text" placeholder="URL da imagem do nível">
          <input type="text" placeholder="Descrição do nível">
          <textarea placeholder="Descrição do nível"></textarea>
      </div>
    </div>`
  }
}

function verificaNivel(){
  infoQuizz.levels=[]
  const urlR = /^https:\/\//i;
  const largura = window.screen.width
  const listaNiveis=document.querySelectorAll(".config-nivel")
  let valido=true
  let minZero=false
  for(let i=0; i<listaNiveis.length; i++){
    let infoNivel={}
    if(listaNiveis[i].querySelector("input:nth-child(1)").value.length<10){
      valido=false
      break
    }
    infoNivel.title=listaNiveis[i].querySelector("input:nth-child(1)").value
    if(!urlR.test(listaNiveis[i].querySelector("input:nth-child(3)").value)){
      valido=false
      break
    }
    if(Number(listaNiveis[i].querySelector("input:nth-child(2)").value)<0 || Number(listaNiveis[i].querySelector("input:nth-child(2)").value)>100){
      valido=false
      break
    }
    infoNivel.minValue=listaNiveis[i].querySelector("input:nth-child(2)").value
    if(Number(listaNiveis[i].querySelector("input:nth-child(2)").value)===0){
      minZero=true
    }
    if (largura>600){
      if(listaNiveis[i].querySelector("input:nth-child(4)").value==="" || listaNiveis[i].querySelector("input:nth-child(4)").value.length<30){
        valido=false
        break
      }
      infoNivel.text=listaNiveis[i].querySelector("input:nth-child(4)").value
    }
    else{
      if(listaNiveis[i].querySelector("textarea").value==="" || listaNiveis[i].querySelector("textarea").value.length<30){
        valido=false
        break
      }
      infoNivel.text=listaNiveis[i].querySelector("textarea").value
    }
    infoQuizz.levels.push(infoNivel)
  }
  if(valido && minZero){
    //chamar a função que vai enviar os dados obtidos para a API
  }
  else{
    alert("Preencha os dados corretamente")
  }
}