// Cria uma variável para a própria aplicação
const app = document.getElementById('app') 

// Array onde os cadastros serão guardados ('banco de dados')
const users = [
  {
    email: 'test@test.com',
    phone: '99999999999',
    ref: 100, // Número do cadastro
    refBy: null // Número do usuário que o indicou
  },
  {
    email: 'tust@tust.com',
    phone: '99999999999',
    ref: 200,
    refBy: 100 // Indicado pelo usuário de ref 100
  },
  {
    email: 'tost@tost.com',
    phone: '99999999999',
    ref: 300,
    refBy: 200
  }
]

// Procura no array se o usuário está ou não cadastrado > retorna o usuário se True ou undefined se False
const getUser = (userData) => {
  return users.find((user) => { 
    return user.email == userData.email
  })
}

// Função que verifica o número de inscritos que um usuário teve com o seu número de cadastro (ref) 
const getTotalSubscribers = (userData) => {
  const subs = users.filter((user) => {
    return user.refBy == userData.ref
  })
  return subs.length 
}

// Função que direciona o usuário para a página de convite
const showInvite = (userData) => {
  app.innerHTML = `
    <main>
      <h3>Inscrição confirmada</h3>
      <p>
        Convide mais pessoas e concorra a prêmios! <br>
        Compartilhe o link e acompanhe as inscrições:
      </p>
      <div class="input-group">
        <label for="link">
          <img src="link.svg" alt="Link Icon">
        </label>
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
      </div>    
    </main>
    <section class="stats">
      <h4>${getTotalSubscribers(userData)}</h4>
      <p>Inscrições feitas</p>
    </section>
  `
  // Adiciona uma classe para a página de Invite (div#app)
  app.setAttribute('class', 'page-invite')
  
  // Roda a função de carregamento das imagens
  updateImageLinks()
}

// Função de cadastro de usuário
const saveUser = (userData) => {
  const newUser = {
    ...userData, // spread > representa todos os dados que já existem em userData (email, phone)
    ref: Math.round(Math.random() * 4000),
    refBy: 100   
  }
  users.push(newUser)
  return newUser
}

// Função que (envia os dados do formulário > cadastra o usuário) previne o alerta default (event) de quando o botão de submit é clicado
const formAction = () => {
  const form = document.getElementById('form')
  form.onsubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(form) // Função que lê os inputs do formulário por name
    const userData = {
      email: formData.get('email'),
      phone: formData.get('phone')
    }

    // Atribui o usuário já cadastrado encontrado (ou undefined) para user
    const user = getUser(userData) 
    
    // Se user for undefined (não existe aida), cria-se um novo cadastro
    if (user) {
      showInvite(user)
    } else {
      const newUser = saveUser(userData)
      showInvite(newUser)
    }
  }
}

// Organiza o src de todas as imagens para não precisar escrever o link todo no HTML 
const updateImageLinks = () => {
  document.querySelectorAll('img').forEach((img) => {
    if (img.src.includes('githubusercontent')) {
      return 
    }
    const src = img.getAttribute('src')
    img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`
  })
}

// Função 'mãe' que faz a aplicação funcionar
const startApp = () => {
  const content = `
  <main>
    <section class="about">
      <div class="section-header">
        <h2>Sobre o evento</h2>
        <span class="badge">AO VIVO</span>
      </div>
      <p>
        Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
        <br><br>
        Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito 
      </p>
    </section>
    <section class="registration">
      <h2>Inscrição</h2>
      <form id="form">
        <div class="input-wrapper">
          <div class="input-group">
            <label for="email">
              <img src="mail.svg" alt="Email icon">
            </label>
            <input type="email" id="email" name="email" placeholder="E-mail" required>
          </div>
          <div class="input-group">
            <label for="phone">
              <img src="phone.svg" alt="Phone icon">
            </label>
            <input type="text" id="phone" name="phone" placeholder="Telefone" required>
          </div>
        </div>
        <button>
          Confirmar
          <span class="arrow"></span>
        </button>
      </form>
    </section>
  </main>
  `
  // O HTML recebe o content no elemento de id='app'
  app.innerHTML = content 
  
  // Adiciona uma classe para a página inicial (div#app)
  app.setAttribute('class', 'page-start')
  
  //Roda a função de carregamento das imagens
  updateImageLinks()
  
  // Roda a função do formulário
  formAction() 
}

// Roda a função que roda a aplicação
startApp() 
/* showInvite({
  email: 'test@test.com',
  phone: '99999999999',
  ref: 100
}) */

// Clicar no logo volta pra tela inicial/reseta o app
document.querySelector("header").onclick = () => startApp()