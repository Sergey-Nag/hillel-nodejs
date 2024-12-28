'use strict';

const copyElements = document.querySelectorAll('.copy');
const enableSelects = document.querySelectorAll('.select-enabled');

copyElements.forEach((el) => {
    el.addEventListener('click', (e) => {
        const text = e.target.dataset.copy.trim();
        navigator.clipboard.writeText(text);
        console.log('Copied to clipboard!', text);
    });
});

enableSelects.forEach((el) => {
    el.addEventListener('change', ({ target }) => {
        const id = target.dataset.id;
        const enabled = target.value;

        fetch(`/api/urls/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ enabled }),
        })
            .then(async (res) => {
                if (res.ok) {
                    console.log('Updated!');
                } else {
                    throw await res.json();
                }
            })
            .catch((e) => {
                alert(e.error ?? 'Something went wrong!');
                target.value = 'false';
            });
    });
});
