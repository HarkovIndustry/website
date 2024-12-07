document.addEventListener("DOMContentLoaded", function () {
  const path = ""; // Directory or folder, leave empty if in the same directory as the script

  const head = {
    link: ["bootstrap.min.css", "style.css"],
    script: ["sweetalert2.js"],
  };

  const body = {
    link: [],
    script: ["bootstrap.min.js", "script.js"],
  };

  function insertIntoHead() {
    head.link.forEach((file) => {
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = `${path}${file}`;
      document.head.appendChild(linkElement);
    });

    head.script.forEach((file) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = `${path}${file}`;
      document.head.appendChild(scriptElement);
    });
  }

  function insertIntoBody() {
    body.link.forEach((file) => {
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = `${path}${file}`;
      document.body.appendChild(linkElement);
    });

    body.script.forEach((file) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = `${path}${file}`;
      document.body.appendChild(scriptElement);
    });
  }

  insertIntoHead();
  insertIntoBody();
});
