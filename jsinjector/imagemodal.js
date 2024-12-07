
document.addEventListener("DOMContentLoaded", function () {
  
  const targetClass = "viewImage"; // It only opens the <img class="viewImage">
  const isDownloadable = true; // Display button when true, hide when false
  const theme = "#fff"; // This is the border color

  // Create modal elements using innerHTML
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="close-btn">&times;</span>
            </div>
            <img class="modal-image" alt="Modal Image">
            <div class="modal-footer">
                <button class="download-btn">Download This Image</button>
            </div>
        </div>
    `;

  // Append modal container to body
  document.body.appendChild(modalContainer);

  // Style modal elements
  const container = modalContainer;
  const content = container.querySelector(".modal-content");
  const header = container.querySelector(".modal-header");
  const closeBtn = container.querySelector(".close-btn");
  const imgElement = container.querySelector(".modal-image");
  const footer = container.querySelector(".modal-footer");
  const downloadBtn = container.querySelector(".download-btn");

  Object.assign(container.style, {
    display: "none",
    position: "fixed",
    zIndex: "1000",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  });

  Object.assign(content.style, {
    position: "relative",
    margin: "auto",
    padding: "20px",
    width: "80%",
    maxWidth: "700px",
    borderRadius: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    border: `0.2rem solid ${theme}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

  Object.assign(header.style, {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  });

  Object.assign(closeBtn.style, {
    color: theme,
    fontSize: "35px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "color 0.3s",
  });

  closeBtn.addEventListener("mouseover", function () {
    closeBtn.style.color = "#ff0000";
  });

  closeBtn.addEventListener("mouseout", function () {
    closeBtn.style.color = theme;
  });

  Object.assign(imgElement.style, {
    width: "100%",
    maxHeight: "90vh",
    objectFit: "contain",
    borderRadius: "10px",
    background: `${theme}`,
    border: `1rem solid ${theme}`,
  });

  Object.assign(footer.style, {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  });

  Object.assign(downloadBtn.style, {
    display: isDownloadable ? "block" : "none",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  });

  downloadBtn.addEventListener("mouseover", function () {
    downloadBtn.style.backgroundColor = "#45a049";
  });

  downloadBtn.addEventListener("mouseout", function () {
    downloadBtn.style.backgroundColor = "#4CAF50";
  });

  // Add event listeners to images
  document.querySelectorAll(`.${targetClass}`).forEach((image) => {
    image.addEventListener("click", function () {
      imgElement.src = image.src;
      container.style.display = "flex";
    });
  });

  // Add event listeners to modal elements
  downloadBtn.addEventListener("click", function () {
    const userConfirmed = confirm("Proceed to download this image?");
    if (userConfirmed) {
      const link = document.createElement("a");
      link.href = imgElement.src;
      link.download = imgElement.src.split("/").pop();
      link.click();
    }
  });

  closeBtn.addEventListener("click", function () {
    container.style.display = "none";
    imgElement.src = "";
  });

  container.addEventListener("click", function (event) {
    if (event.target === container) {
      container.style.display = "none";
      imgElement.src = "";
    }
  });
});
