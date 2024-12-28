const lifetimeInput = document.getElementById('type');
const lifetimeInputContainer = document.getElementById('lifetime-field');
const codeInputWrapper = document.getElementById('code-wrapper');
const lengthInputWrapper = document.getElementById('length-wrapper');
const codeExampleLinkEl = document.getElementById('code-example-link');
const codeTypeRandomRadio = document.getElementById('code-random');
const codeTypeCustomRadio = document.getElementById('code-custom');

const expireTimeInputTemplate = `
<div id="expire-field">
    <label for="expire">Expire time</label>
    <input type="datetime-local" id="expire" name="expire" class="form-control" required>
</div>
`;

const lengthInputTemplate = `
<label for="length">Length</label>
<input type="number" id="length" name="length" value="<%= values.length ?? 6 %>" min="3" max="20" placeholder="6">
<p class="hint">The length of code for your url. From 4 to 20</p>
`;

const codeInputTemplate = `
<label for="code">Code</label>
<input
    type="text"
    id="code"
    name="code"
    placeholder="code"
    required
>
<p class="hint">You custom code. Supports alphabetical and numerical characters, - and _</p>
`;

lifetimeInput.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value === 'Temporary') {
        lifetimeInputContainer.insertAdjacentHTML('afterend', expireTimeInputTemplate);
    } else {
        const expireTimeInput = document.getElementById('expire-field');
        if (expireTimeInput) {
            expireTimeInput.remove();
        }
    }
});

// codeInput.addEventListener('input', (e) => {
//     const value = e.target.value;
//     const url = codeExampleLinkEl.dataset.url;

//     codeExampleLinkEl.innerText = `${url}/code/${value.trim()}`;
// });

[codeTypeRandomRadio, codeTypeCustomRadio].forEach((el) => {
    el.addEventListener('change', (e) => {
        const value = e.target.value;
        if (value === 'random') {
            codeInputWrapper.innerHTML = '';
            lengthInputWrapper.innerHTML = lengthInputTemplate;
        } else {
            lengthInputWrapper.innerHTML = '';
            codeInputWrapper.innerHTML = codeInputTemplate;
        }
    });
});

