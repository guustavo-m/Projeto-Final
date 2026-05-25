const token = localStorage.getItem('jwtToken');

if (!token) {
    window.location.href = '/';
}

const nivel = localStorage.getItem('nivel');

function logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('nivel');
    localStorage.removeItem('nome');

    window.location.href = '/';
}