
let message = {}

message.subject = "Fila Unica"
message.encoded_subject = encodeURIComponent(message.subject)
message.body = "Vossa Excelência aprovaria o Projeto de Lei 2176/2020?\n\nDestaca-se o estudo  feito pelo economista Samy Dana e pelo matemático e estatístico Alexandre Simas. O documento, que tem como co-autores José Gallucci, Bruno Filardi, Rodrigo Rodriguez, foi encomendado pela Easynvest: https://investnews.com.br/relatorios/relatorio_covid_v2.pdf\n\nAcesse https://melhor-saude.github.io/coniventes/html/responder.html para responder e deixar de ser Conivente. Utilize seu e-mail oficial e lembre-se, para não ser Conivente, é necessário uma resposta afirmativa.\n\n https://melhor-saude.github.io/coniventes/"
message.encoded_body = encodeURIComponent(message.body)

function GetMailLink(to, cc, subject, body) {
  subject = subject || message.encoded_subject
  body = body || message.encoded_body
  
  let link = `mailto:${to}?`
  if (cc) link += `cc=${cc.join(",")}&`
  link += `subject=${subject}&body=${body}`

  return link
}

async function CreateMailGroup(node_id, list, fixed) {
  let node = document.getElementById(node_id)
  let frag = document.createDocumentFragment()
  let text, link

  for (let key of Object.keys(list).sort()) {
    text = `${key} (${list[key].length})`
    link = GetMailLink(fixed, list[key])

    let a = document.createElement("a")
    a.alt = "Enviar mensagem a todos parlamentares do " + key
    a.href = link

    let li = document.createElement("li")
    li.innerHTML = text

    frag.appendChild(a)
    a.appendChild(li)
  }

  node.appendChild(frag)
}

export default { GetMailLink, CreateMailGroup }
