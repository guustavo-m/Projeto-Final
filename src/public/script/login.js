const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

function showMessage(text) {
    message.textContent = text;

    setTimeout(() => {
        message.textContent = '';
    }, 3000);
}

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        showMessage('Preencha e-mail e senha.');
        return;
    }

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || 'Erro no login');
        }

        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('nivel', data.usuario.nivel);
        localStorage.setItem('nome', data.usuario.nome);

        window.location.href = '/dashboard';

    } catch (error) {
        showMessage(error.message);
    }
}

loginForm.addEventListener('submit', handleLogin);