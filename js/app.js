

const API_URL = 'http://localhost:3000/messages'; 
const useJsonServer = true; 
const form = document.getElementById('contactForm');
const confirmation = document.getElementById('confirmation');
const messagesContainer = document.getElementById('messagesContainer');
const sentListSection = document.getElementById('sentList');

let localMessages = []; 

function showError(id, message) {
  const el = document.getElementById(id);
  el.textContent = message || '';
}

function clearErrors() {
  showError('error-name','');
  showError('error-email','');
  showError('error-message','');
}

function validateEmail(email){
 
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(data) {
  clearErrors();
  let ok = true;
  if(!data.name || data.name.trim().length < 2){
    showError('error-name','Ingrese un nombre válido (min 2 caracteres)');
    ok = false;
  }
  if(!data.email || !validateEmail(data.email)){
    showError('error-email','Ingrese un correo válido');
    ok = false;
  }
  if(!data.message || data.message.trim().length < 5){
    showError('error-message','El mensaje debe tener al menos 5 caracteres');
    ok = false;
  }
  return ok;
}

function renderMessages(list){
  messagesContainer.innerHTML = '';
  list.forEach(m => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${escapeHtml(m.name)}</strong> — <em>${escapeHtml(m.email)}</em><p>${escapeHtml(m.message)}</p>`;
    messagesContainer.appendChild(li);
  });
  sentListSection.classList.toggle('hidden', list.length === 0);
}

function escapeHtml(str){
  if(!str) return '';
  return str.replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];});
}

async function postMessageApi(data){
  if(useJsonServer){
    try{
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
      if(!res.ok) throw new Error('Error en el servidor');
      const saved = await res.json();
      return saved;
    }catch(err){
      console.warn('json-server no disponible, usando almacenamiento local', err);
      return null;
    }
  }else{
    return null;
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
    createdAt: new Date().toISOString()
  };

  const valid = validateForm(data);
  if(!valid) return;

  // desactivar boton mientras envia
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;

  const apiResult = await postMessageApi(data);

  if(apiResult){
    
    try {
      const res = await fetch(API_URL);
      const list = await res.json();
      renderMessages(list);
    } catch (err) {
      console.warn('No pude recuperar lista del servidor', err);
    }
  } else {
    
    localMessages.push(data);
    renderMessages(localMessages);
  }

  
  confirmation.classList.remove('hidden');
  form.reset();
  btn.disabled = false;

  
  setTimeout(() => confirmation.classList.add('hidden'), 4000);
});
