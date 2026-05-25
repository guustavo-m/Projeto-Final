const cadastroForm = document.getElementById('cadastroForm');

cadastroForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

    if (!nome || !email || !senha || !confirmarSenha) {
        alert('Preencha todos os campos');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem');
        return;
    }

    try {
        const response = await fetch('/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                email,
                senha
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || 'Erro ao cadastrar');
        }

        alert('Usuário cadastrado com sucesso!');

        window.location.href = '/';

    } catch (error) {
        alert(error.message);
    }
});