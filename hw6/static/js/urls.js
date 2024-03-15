document.getElementById('createUrl')
    .addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        fetch('/urls/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.status === 200) {
                    window.location.reload();
                } else {
                    alert('URL already exists!');
                }
            });
    });

const copyElements = document.querySelectorAll('.copy');

copyElements.forEach((el) => {
    el.addEventListener('click', (e) => {
        const text = e.target.dataset.copy.trim();
        navigator.clipboard.writeText(text);
        console.log('Copied to clipboard!', text);
    });
});