const input = document.getElementById("input");
const button = document.getElementById("btn");
const imageContainer = document.getElementById("imageContainer");

// Get the token from environment variables
import { TOKEN } from "./.env";

async function query(data, seed) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: data,
        parameters: { seed: seed },
      }),
    }
  );
  const result = await response.blob();
  return result;
}

async function generateImages() {
  imageContainer.innerHTML = "";
  const prompt = input.value;

  if (!prompt) return;

  // Show "Generating..." message
  button.textContent = "Generating...";
  button.disabled = true;

  const imagePromises = [];
  const numImages = 6;

  for (let i = 0; i < numImages; i++) {
    const seed = Math.floor(Math.random() * 1000000);
    const promise = query(prompt, seed).then((blob) => {
      return new Promise((resolve) => {
        const objectUrl = URL.createObjectURL(blob);

        const wrapper = document.createElement("div");
        wrapper.className = "imageWrapper";

        const img = document.createElement("img");
        img.src = objectUrl;
        img.alt = `Generated image ${i + 1}`;
        img.className = "imagePreview"; // Add class for preview

        const downloadBtn = document.createElement("button");
        downloadBtn.className = "downloadBtn";
        downloadBtn.textContent = "Download";
        downloadBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          downloadImage(blob, `generated_image_${i + 1}.png`);
        });

        // Add preview icon
        const previewBtn = document.createElement("button");
        previewBtn.className = "previewBtn";
        previewBtn.innerHTML = "&#128065;"; // Eye icon
        previewBtn.title = "Preview";
        previewBtn.addEventListener("click", () => {
          const previewWindow = window.open();
          previewWindow.document.write(
            `<img src="${objectUrl}" style="width: 100%; height: auto;" />`
          );
        });

        // Append elements to the wrapper and container
        wrapper.appendChild(img);
        wrapper.appendChild(downloadBtn);
        wrapper.appendChild(previewBtn);
        imageContainer.appendChild(wrapper);

        // Resolve the promise after the image is loaded
        img.onload = () => resolve();
      });
    });

    imagePromises.push(promise);
  }

  // Wait for all images to be loaded
  try {
    await Promise.all(imagePromises);
  } catch (error) {
    console.error(error.message);
  } finally {
    // Restore button state after images are loaded
    button.textContent = "Generate";
    button.disabled = false;
    input.value = "";
  }
}

function downloadImage(blob, fileName) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

button.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission or default action
  generateImages();
});
