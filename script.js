// Options for builtWith
const CANVAS = "Canvas";
const LIT_ELEMENT = "LitElement";
const LOCAL_FORAGE = "localForage";
const MATERIAL_UI = "Material-UI";
const NEXT = "Next.js";
const RAMDA = "Ramda";
const REACT = "React";
const RXJS = "RxJS";
const THREEJS = "Three.js";
const TYPESCRIPT = "Typescript";
const VUE = "Vue";

const PROJECTS = [
  {
    title: "FretFu - Fretboard Diagram Generator",
    link: "https://fretfu.netlify.app",
    text: [
      `A tool to help guitarists and bassists visualize and learn scales, arpeggios and chords.`,
    ],
    builtWith: [TYPESCRIPT, REACT, MATERIAL_UI, CANVAS],
  },
  {
    title: "Just News",
    link: "https://github.com/simonmclean/just-news",
    text: [
      `My first adventure with progressive web apps, recently rebuilt using React. This app uses <a href="https://newsapi.org">News API</a> to serve up the latest headlines from a variety of sources. As you'd expect from a PWA, it has add-to-homescreen and offline support.`,
    ],
    builtWith: [REACT, NEXT, RAMDA, LOCAL_FORAGE],
  },
  {
    title: "Model of the Solar System",
    link: "https://solarjs.netlify.com/",
    text: [
      `I'd always wanted to try my hand at some 3D rendering, and (roughly) modeling the solar system seemed like a fun place to start. Much of this "simulation" is based on real data. For example the relative sizes, tilts and orbital speeds of planets are all fairly accurate.`,
    ],
    builtWith: [THREEJS, VUE],
  },
  {
    title: "Web Components",
    link:
      "https://github.com/simonmclean?tab=repositories&q=web+component&type=&language=",
    text: [
      `Toggle switches and lazy loading images are not something we should have to code over and over again. So to that end I've created some standards based Web Components that I can reuse in any future projects.`,
    ],
    builtWith: [LIT_ELEMENT],
  },
];

const SELECTORS = {
  PROJECTS_LIST: "#projects-list",
  PROJECT_TEMPLATE: {
    ROOT: "#project-item",
    TITLE_LINK: ".project-title-link",
    DESCRIPTION: ".project-description",
    BUILT_WITH_LIST: ".project-built-with-list",
  },
};

function $(root) {
  return (selector) => root.querySelector(selector);
}

function cloneNode(node) {
  return node.content.cloneNode(true);
}

function textListToDocumentFragment(list, tagName) {
  const fragment = new DocumentFragment();
  list.forEach((str) => {
    const el = document.createElement(tagName);
    el.innerHTML = str;
    fragment.appendChild(el);
  });
  return fragment;
}

function projectReducerFactory(template) {
  return (fragment, project) => {
    const {
      TITLE_LINK,
      DESCRIPTION,
      BUILT_WITH_LIST,
    } = SELECTORS.PROJECT_TEMPLATE;
    const templateClone = cloneNode(template);
    const qs = $(templateClone);

    // Title
    const titleEl = qs(TITLE_LINK);
    titleEl.setAttribute("href", project.link);
    titleEl.textContent = project.title;

    // Description
    qs(DESCRIPTION).appendChild(textListToDocumentFragment(project.text, "p"));

    // Built with
    qs(BUILT_WITH_LIST).appendChild(
      textListToDocumentFragment(project.builtWith, "li")
    );

    fragment.appendChild(templateClone);
    return fragment;
  };
}

function insertProjects() {
  const qs = $(document);
  const template = qs(SELECTORS.PROJECT_TEMPLATE.ROOT);

  qs(SELECTORS.PROJECTS_LIST).appendChild(
    PROJECTS.reduce(projectReducerFactory(template), new DocumentFragment())
  );
}

if (["complete", "interactive"].includes(document.readyState)) {
  insertProjects();
} else {
  window.addEventListener("DOMContentLoaded", insertProjects);
}

console.info(
  "Want to see the source code?",
  "https://github.com/simonmclean/simonmclean.dev"
);
