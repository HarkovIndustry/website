// Safe Injector

document.addEventListener("DOMContentLoaded", function () {

  /* MODE */
  const classtarget = "typer";
  const caret = "normal"; // normal, thick, or empty for no caret

  /* TEXT */
  const text_before = "The "; 
  const text_typing = ["Founder", "Developer", "CEO"];
  const text_after = " of Harkov Industry Website";

  /* TIMER */
  const time_caret_blink = 1000; // ms for blink
  const time_chararacter_pop = 200; // ms per character
  const time_delay = 1500; // ms delay after full text

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
          .caret {
              display: inline;
              border-right: 1px solid;
              animation: blink ${time_caret_blink}ms step-end infinite;
          }
          .caret-thick {
              border-right: 0.2em solid;
              animation: blink ${time_caret_blink}ms step-end infinite;
          }
          @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
          }
      `;
  document.head.appendChild(style);

  const elements = document.querySelectorAll(`.${classtarget}`);

  elements.forEach((element) => {
    const caretClass = caret === "thick" ? "caret-thick" : caret ? "caret" : "";
    let currentIndex = 0;
    let isDeleting = false;
    let textIndex = 0;

    function type() {
      const currentText = text_typing[currentIndex];
      if (isDeleting) {
        textIndex--;
      } else {
        textIndex++;
      }

      const displayText =
        text_before +
        currentText.substring(0, textIndex) +
        (caretClass ? `<span class="${caretClass}"></span>` : "") +
        text_after;
      element.innerHTML = displayText;

      let typeSpeed = time_chararacter_pop;
      if (isDeleting) typeSpeed /= 2;

      if (!isDeleting && textIndex === currentText.length) {
        typeSpeed = time_delay;
        isDeleting = true;
      } else if (isDeleting && textIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % text_typing.length;
        typeSpeed = time_delay / 6;
      }

      setTimeout(type, typeSpeed);
    }

    type();
  });
});
