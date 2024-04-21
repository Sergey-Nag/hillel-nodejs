'use strict';

const ws = new WebSocket(`ws://${window.location.host}/dashboard`);
const totalUrlElem = document.getElementById('total-urls');
const totalVisitsElem = document.getElementById('total-visits');
const topUserUrlsBody = document.getElementById('top-user-urls');
const topAllUrlsBody = document.getElementById('top-all-urls');
const rateLimitsBody = document.getElementById('rate-limits');

ws.onopen = () => {
    ws.send('refresh');
};

ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    if (data.error) {
        console.error(data.error);
        return;
    }

    const {
        totalVisits,
        totalUrls,
        topUserUrls,
        topAllUrls,
        rateLimits,
    } = data;

    totalUrlElem.innerText = totalUrls;
    totalVisitsElem.innerText = totalVisits;

    fillTopUsersUrlTable(topUserUrls);
    fillTopAllUrlsTable(topAllUrls);
    fillRateLimitsTable(rateLimits);
};

function fillTopUsersUrlTable(urls) {
    topUserUrlsBody.innerHTML = '';
    urls.forEach((url) => {
        const row = document.createElement('tr');
        const link=`${baseUrl}/code/${url.code}`;
        row.innerHTML = `
            <td>${url.name}</td>
            <td>
                <a href="${link}" target="_blank">
                    ${link}
                </a>
            </td>
            <td class="center">${url.visits}</td>
        `;
        topUserUrlsBody.appendChild(row);
    });
}

function fillTopAllUrlsTable(urls) {
    topAllUrlsBody.innerHTML = '';
    urls.forEach((url) => {
        const row = document.createElement('tr');
        const link=`${baseUrl}/code/${url.code}`;
        row.innerHTML = `
            <td>${url['user.name'] ?? '-'}</td>
            <td>
                <a href="${link}" target="_blank">
                    ${link}
                </a>
            </td>
            <td class="center">${url.visits}</td>
        `;
        topAllUrlsBody.appendChild(row);
    });
}
const getTtlTime = (ttl) => {
    if (ttl < 60) return `${ttl} sec`;
    if (ttl < 3600) return `${Math.floor(ttl / 60)} min`;
    return `${Marg.floor(ttl / 3600)} hours`;
}
function fillRateLimitsTable(rtls) {
    rateLimitsBody.innerHTML = '';
    rtls.forEach((rtl) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rtl.key}</td>
            <td>${getTtlTime(rtl.ttl)}</td>
        `;
        rateLimitsBody.appendChild(row);
    });
}
