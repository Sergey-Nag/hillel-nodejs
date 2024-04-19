'use strict';

const copyElements = document.querySelectorAll('.copy');

copyElements.forEach((el) => {
    el.addEventListener('click', (e) => {
        const text = e.target.dataset.copy.trim();
        navigator.clipboard.writeText(text);
        console.log('Copied to clipboard!', text);
    });
});