
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import htmlString from './input-icons.html';

const inputIcons 		 = document.createElement('div');
inputIcons.innerHTML = htmlString;
inputIcons.setAttribute('style', 'display: none;');
document.head.appendChild(inputIcons);
