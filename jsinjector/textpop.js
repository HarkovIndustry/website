
document.addEventListener("DOMContentLoaded", function () {

  const targetclass = "pop"; // only applies on this class

  const time_delay = 500; // this adds delay per popping next
  const speed = 500; // ms for pop animation

  const hover_mode = false; // if true means only pops when hovered
  const repeat = false; // if true, characters may repeat popping before others have popped
  
  const direction = "both"; // down, up, both - direction of the pop
  const distance = '1rem';

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
        .key {
            display: inline-block;
            transition: transform ${speed}ms;
        }
        @keyframes pressDown {
            50% { transform: translateY(${distance}); }
            100% { transform: translateY(0); }
        }
        @keyframes pressUp {
            50% { transform: translateY(-${distance}); }
            100% { transform: translateY(0); }
        }
    `;
  document.head.appendChild(style);

  const elements = document.querySelectorAll(`.${targetclass}`);

  elements.forEach((element) => {
    const text = element.innerText.split("");
    element.innerHTML = "";

    text.forEach((char) => {
      const span = document.createElement("span");
      span.className = "key";
      span.innerText = char === " " ? "\u00A0" : char; // preserve spaces

      element.appendChild(span);
    });

    const keys = Array.from(element.querySelectorAll(".key"));
    let poppedIndexes = [];

    function randomPop() {
      let availableIndexes = keys.map((_, index) => index);

      if (!repeat) {
        availableIndexes = availableIndexes.filter(
          (index) => !poppedIndexes.includes(index)
        );
      }

      if (availableIndexes.length === 0) {
        poppedIndexes = [];
        availableIndexes = keys.map((_, index) => index);
      }

      const randomIndex =
        availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      const key = keys[randomIndex];
      poppedIndexes.push(randomIndex);

      let animationName;
      if (direction === "up") {
        animationName = "pressUp";
      } else if (direction === "both") {
        animationName = Math.random() > 0.5 ? "pressDown" : "pressUp";
      } else {
        animationName = "pressDown";
      }

      key.style.animation = `${animationName} ${speed}ms`;
      setTimeout(() => {
        key.style.animation = "";
        if (!hover_mode) setTimeout(randomPop, time_delay);
      }, speed);
    }

    if (hover_mode) {
      element.addEventListener("mouseenter", function startHover() {
        const hoverInterval = setInterval(randomPop, time_delay + speed);
        element.addEventListener("mouseleave", function stopHover() {
          clearInterval(hoverInterval);
          element.removeEventListener("mouseleave", stopHover);
        });
      });
    } else {
      setTimeout(randomPop, time_delay);
    }
  });
});
