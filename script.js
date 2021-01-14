const PROJECTS = [
  {
    title: "FretFu - Fretboard Diagram Generator",
    link: "https://fretfu.netlify.app",
    text: [
      `A tool to help guitarists and bassists visualize and learn scales, arpeggios and chords.`,
    ],
    builtWith: ["Typescript", "React", "Material-UI", "Canvas"],
  },
  {
    title: "Just News",
    link: "https://github.com/simonmclean/just-news",
    text: [
      `My first adventure with progressive web apps, recently rebuilt using React. This app uses <a href="https://newsapi.org">News API</a> to serve up the latest headlines from a variety of sources. As you'd expect from a PWA, it has add-to-homescreen and offline support.`,
    ],
    builtWith: ["React", "Next", "Ramda", "localForage"],
  },
  {
    title: "Model of the Solar System",
    link: "https://solarjs.netlify.com/",
    text: [
      `I'd always wanted to try my hand at some 3D rendering, and (roughly) modeling the solar system seemed like a fun place to start. Much of this "simulation" is based on real data. For example the relative sizes, tilts and orbital speeds of planets are all fairly accurate.`,
    ],
    builtWith: ["Three.JS", "Vue"],
  },
  {
    title: "Web Components",
    link:
      "https://github.com/simonmclean?tab=repositories&q=web+component&type=&language=",
    text: [
      `Toggle switches and lazy loading images are not something we should have to code over and over again. So to that end I've created some standards based Web Components that I can reuse in any future projects.`,
    ],
    builtWith: ["LitElement"],
  },
];

function htmlMap(fn, list, del = "") {
  return list.map(fn).join(del);
}

function projectsToHtml({ title, link, text, builtWith }) {
  return `
  <li>
      <article>
          <header>
              <h4 class="project-title">
                  <a class="project-title-link" href="${link}">
                    ${title}
                  </a>
              </h4>
          </header>
          <section class="project-description">
            ${htmlMap((p) => `<p>${p}</p>`, text)}
          </section>
          <footer class="project-built-with">
              <header>
                  <h5 class="project-built-with-title">Built using:</h5>
              </header>
              <ul class="project-built-with-list">
                ${htmlMap((tech) => `<li>${tech}</li>`, builtWith)}
              </ul>
          </footer>
      </article>
  </li>
  `;
};

function insertProjects() {
  document.getElementById("projects-list").innerHTML = htmlMap(
    projectsToHtml,
    PROJECTS
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
