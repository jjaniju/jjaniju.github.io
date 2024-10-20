function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `Kellonaika: ${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000); 

function fetchNews() {
    const newsElement = document.getElementById('news');
    const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.iltalehti.fi/rss/uutiset.xml';
    
    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            newsElement.innerHTML = '';
            data.items.forEach(item => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = item.link;
                link.textContent = item.title;
                link.target = '_blank'; 
                listItem.appendChild(link);
                newsElement.appendChild(listItem);
            });
        })
        .catch(error => {
            newsElement.textContent = 'Virhe ladattaessa uutisia.';
            console.error('RSS-virhe:', error);
        });
}
fetchNews();

document.addEventListener('DOMContentLoaded', () => {
    const navigateButton = document.getElementById('navigateButton');
    
    navigateButton.addEventListener('click', () => {
        window.location.href = 'onnittelut.html'; 
    });
});
