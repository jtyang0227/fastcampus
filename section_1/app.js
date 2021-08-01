const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL ='https://api.hnpwa.com/v0/item/@id.json';

ajax.open('GET', NEWS_URL, false);
ajax.send();
// console.log(ajax.response);

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul');
// console.log(newsFeed);

// hashchange
window.addEventListener('hashchange', function () {
    // console.log(location.hash); // #28025668
    const id = location.hash.substr(1);

    ajax.open('GET', CONTENT_URL.replace('@id', id), false);
    ajax.send();

    const newContent = JSON.parse(ajax.response);
    const title = document.createElement('h1');

    title.innerHTML = newContent.title;

    content.appendChild(title);
    // console.log(newContent);
});

for (let i = 0; i < 10; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    // `<!--<li><a>${newsFeed[i].title}</a></li>-->`;

    // innerHTML : HTML 태그 마크업
    a.href=`#${newsFeed[i].id}`;
    a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

    // a.addEventListener('click', function () {});

    // appendChild 자식 태그 그리기
    li.appendChild(a);
    ul.appendChild(li);
}

container.appendChild(ul);
container.appendChild(content);