'use strict';

document.getElementById('createUser')
    .addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        fetch('/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((res) => {
            if (res.status === 200) {
                window.location.href = '/users';
            } else {
                alert('Username already exists!');
            }
        });
    });
