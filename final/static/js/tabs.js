const tabTitles = document.querySelectorAll('[data-tab-title]');
const tabContents = document.querySelectorAll('[data-tab-content]');

if (
    tabTitles.length > 0 &&
    tabContents.length > 0 &&
    tabTitles.length === tabContents.length
) {
    defineTabs(tabTitles, tabContents);
} else {
    console.error('Cannot define tabs');
}

function defineTabs(titles, contents) {
    titles.forEach((titleEl, index) => {
        const title = titleEl.dataset.tabTitle;
        const tabContent = [...contents].find((contentEl) => contentEl.dataset.tabContent === title);

        titleEl.addEventListener('click', () => {
            titles.forEach((el) => el.classList.remove('active'));
            contents.forEach((el) => el.classList.remove('active'));

            titleEl.classList.add('active');
            tabContent.classList.add('active');
        });
    });
}