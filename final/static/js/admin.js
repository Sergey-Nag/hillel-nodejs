const roleInputs = document.querySelectorAll('.role-select');

roleInputs.forEach((el) => {
    el.addEventListener('change', ({ target }) => {
        const id = target.dataset.id;
        const role = target.value;

        fetch(`/api/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role }),
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
            });
    });
});