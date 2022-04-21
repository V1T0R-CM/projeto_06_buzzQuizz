const infoQuizz={}
let quantPerguntas
let nivelQuizz
let listaPergunta=[]

function verificaInfo(){
  infoQuizz.title=document.querySelector(".titulo-quiz").value
  infoQuizz.image=document.querySelector(".imagem-quiz").value
  quantPerguntas=document.querySelector(".quant-perguntas").value
  nivelQuizz=document.querySelector(".quant-niveis").value
  let valido=true
  const pattern = /^https:\/\//i;
  if(infoQuizz.title.length>65 ||infoQuizz.title.length<20){
    valido=false
  }
  if(!pattern.test(infoQuizz.image)){
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


function verificaPerguntas(){
  const pattern = /^https:\/\//i;
  infoQuizz.questions=[]
  const listaPerguntas=document.querySelectorAll(".config-pergunta")
  for(let i=0; i<listaPergunta.length; i++){
    let infoPergunta={}
    let alternativas=[]
    if(listaPergunta[i].querySelector(".pergunta input:nth-child(1)").value.length>20){
      infoPergunta.title=listaPergunta[i].querySelector(".pergunta input:nth-child(1)").value
    }
    if(ehHexadecimal(listaPergunta[i].querySelector(".pergunta input:nth-child(2)").value)){
      infoPergunta.color=listaPergunta[i].querySelector(".pergunta input:nth-child(2)").value
    }
  }
}