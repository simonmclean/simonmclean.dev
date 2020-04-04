// Options for builtWith
const VUE = 'Vue';
const VUEX = 'Vuex';
const REACT = 'React';
const NEXT = 'Next.js';
const RXJS = 'RxJS';
const LOCAL_FORAGE = 'localForage';
const TYPESCRIPT = 'TypeScript';
const THREEJS = 'Three.js';
const RAMDA = 'Ramda';

const PROJECTS = Object.freeze([
    {
        title: 'Just News',
        link: 'https://github.com/simonmclean/just-news',
        text: [`My first adventure with progressive web apps, recently rebuilt using React. This app uses <a href="https://newsapi.org">News API</a> to serve up the latest headlines from a variety of sources. As you'd expect from a PWA, it has add-to-homescreen and offline support.`],
        builtWith: [REACT, NEXT, RAMDA, LOCAL_FORAGE],
    },
    {
        title: 'Model of the Solar System',
        link: 'https://solarjs.netlify.com/',
        text: [`I'd always wanted to try my hand at some 3D rendering, and (roughly) modeling the solar system seemed like a fun place to start. Much of this "simulation" is based on real data. For example the relative sizes, tilts and orbital speeds of planets are all fairly accurate.`],
        builtWith: [THREEJS, VUE, VUEX, TYPESCRIPT],
    },
]);

const $ = root => selector => root.querySelector(selector);

const cloneNode = node => node.content.cloneNode(true);

function itemsToDOM(items, tagName) {
    const fragment = new DocumentFragment();
    items.forEach(itemText => {
        const el = document.createElement(tagName);
        el.innerHTML = itemText;
        fragment.appendChild(el);
    });
    return fragment;
}

function projectReducer(template) {
    return (fragment, project) => {
        const templateClone = cloneNode(template);
        const find = $(templateClone);
        const titleEl = find('.project-title-link');
        titleEl.setAttribute('href', project.link);
        titleEl.textContent = project.title;
        find('.project-description').appendChild(
            itemsToDOM(project.text, 'p')
        );
        find('.project-built-with-list').appendChild(
            itemsToDOM(project.builtWith, 'li')
        );
        fragment.appendChild(templateClone);
        return fragment;
    }
}

function insertProjects() {
    const find = $(document);
    const template = find('#project-item');

    find('#projects-list').appendChild(
        PROJECTS.reduce(
            projectReducer(template),
            new DocumentFragment()
        )
    );
}

function init() {
    console.info('Want to see the source code?', 'https://github.com/simonmclean/simonmclean.dev');
    insertProjects();
}

if (['complete', 'interactive'].includes(document.readyState)) {
    init();
} else {
    window.addEventListener('DOMContentLoaded', init);
}
