'use strict';

document.getElementById('login')
    .addEventListener('submit', function(e) {
        e.preventDefault();

        const name = e.target[0].value;
        const password = e.target[1].value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        })
        .then((res) => {
            if (res.status === 200) {
                window.location.href = '/';
            } else {
                alert('Wrong credentials!');
            }
        });
    });
