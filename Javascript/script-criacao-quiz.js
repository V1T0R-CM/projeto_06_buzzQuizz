let tituloQuizz
let urlImgQuizz
let quantPerguntas
let nivelQuizz
let listaPergunta=[]

function verificaInfo(){
  tituloQuizz=document.querySelector(".titulo-quiz").value
  urlImgQuizz=document.querySelector(".imagem-quiz").value
  quantPerguntas=document.querySelector(".quant-perguntas").value
  nivelQuizz=document.querySelector(".quant-niveis").value
  let valido=true
  const pattern = /^https:\/\//i;
  if(tituloQuizz.length>65 ||tituloQuizz.length<20){
    alert("Preencha os dados corretamente")
    valido=false
  }
  if(!pattern.test(urlImgQuizz)){
    alert("Preencha os dados corretamente")
    valido=false
  }
  if(Number(quantPerguntas)<3){
    alert("Preencha os dados corretamente")
    valido=false
  }
  if(Number(nivelQuizz)<2){
    alert("Preencha os dados corretamente")
    valido=false
  }
  if(valido){
    document.querySelector(".secao-info-basica").classList.add("desligado")
    document.querySelector(".secao-cria-pergunta").classList.remove("desligado")
    criaConfigPerguntas()
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