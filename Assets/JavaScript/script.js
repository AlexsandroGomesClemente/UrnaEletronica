/* Variaveis */
let seuVotoPara = document.querySelector(".d-1-1 span")
let cargo = document.querySelector(".d-1-2 span")
let numeros = document.querySelector(".d-1-3")
let descricao = document.querySelector(".d-1-4")
let aviso = document.querySelector(".d-2")
let lateral = document.querySelector(".d-1--right")
let etapaAtual = 0
let numero = ''
let brancos = false 

/* Seleção de Variaveis Fim */

/* Functions  */

const comecarEtapa = () => {
    let etapa = etapas[etapaAtual]
    let numeroHtml = " "
    numero = ''
    brancos = false
    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += "<div class='numero pisca'></div>"
        } else {
            numeroHtml += "<div class='numero'></div>"
        }

    }
    seuVotoPara.style.display = "none"
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = " "
    aviso.style.display = "none"
    lateral.innerHTML = " "
    numeros.innerHTML = numeroHtml
}

const atualizaInterface = () => {
    let etapa = etapas[etapaAtual]

    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })

    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        descricao.innerHTML = `  Nome:${candidato.nome} <br/>
        Partido:${candidato.partido} <br/>
        Deputado:${candidato.nome} `

        let fotosHtml = ""
        for (let i in candidato.fotos) {
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small">
                <img src="/Assets/IMG/${candidato.fotos[i].url}" alt="Presidente">
               ${candidato.fotos[i].legenda} </div>`
            }else {
                fotosHtml += `<div class="d-1-image">
                <img src="/Assets/IMG/${candidato.fotos[i].url}" alt="Presidente">
               ${candidato.fotos[i].legenda} </div>`
            }
           
       
        }
        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        descricao.innerHTML = `<div class='aviso--grande pisca'>VOTO NULO</div>`
    }
}

const cliclou = (n) => {
    let elNumero = document.querySelector(".numero.pisca")
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove("pisca")
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add("pisca")
        } else {
            atualizaInterface()
        }

    }
}

const branco = () => {
    numero=""
    brancos = true 
    seuVotoPara.style.display = "block"
    aviso.style.display = "block"
    lateral.style.display="none"
    numeros.innerHTML = " "
    descricao.innerHTML = `<div class='aviso--grande pisca'>VOTO EM BRANCO</div>`
 
}
const corrige = () => {
    comecarEtapa()
}

const confirma = () => {
let etapa = etapas[etapaAtual]
let votoConfirmado = false
if(brancos === true ) {
    votoConfirmado = true
    localStorage.setItem("voto", "VOTO BRANCO")
}else if (numero.length === etapa.numeros) {
    votoConfirmado = true
   localStorage.setItem("voto", numero)
}

if(votoConfirmado) {
    etapaAtual++
    if(etapas[etapaAtual] !== undefined) {
        comecarEtapa()
    }else {
        document.querySelector('.tela').innerHTML = `<div class='aviso--gigante pisca'>FIM</div>`
        setTimeout(()=>{
            window.location.reload()
        },10000)
    }
}

}
/* Fim Functions  */

comecarEtapa()