require('./style.css');

const favicon = require('./assets/favicon.png');
let link = document.createElement('link');
link.type = 'image/png';
link.rel = 'shortcut icon';
link.href = favicon;
document.head.appendChild(link);

let title = document.createElement('h1');
title.innerText = '';
document.body.appendChild(title);