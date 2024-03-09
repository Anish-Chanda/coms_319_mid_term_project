document.addEventListener("DOMContentLoaded", function () {
  console.log(window.location.href);

  //reuse fetch function based on page
  if (window.location.href.includes("f_ringPlant.html")) {
    console.log("fecthing flowering plants");
    fetchJSON("./f_ring.json");
    return;
  }

  console.log("fecthing plants");
  fetchJSON("./data.json");
  return;
});

const fetchJSON = async (url) => {
  fetch(url)
    .then((response) => response.json())

    .then((data) => {
      const gallery = document.querySelector(".image-gallery");

      data.plants.forEach((plant) => {
        const item = document.createElement("div");

        item.className = "image-item";

        const img = document.createElement("img");

        img.src = plant.image;

        img.alt = plant.name;

        const textContainer = document.createElement("div");

        textContainer.className = "text-container";

        const section = document.createElement("section");

        section.id = plant.name.replace(/\s+/g, "");

        const paragraphs = [
          `Plant Name: ${plant.name}`,

          `Zone: ${plant.zone}`,

          `Fact: ${plant.fact}`,

          `Soil Type: ${plant.soilType}`,

          `Flowering: ${plant.flowering}`,
        ];

        paragraphs.forEach((text) => {
          const p = document.createElement("p");

          p.textContent = text;

          section.appendChild(p);
        });

        textContainer.appendChild(section);

        item.appendChild(img);

        item.appendChild(textContainer);

        gallery.appendChild(item);
      });
    })

    .catch((error) => console.error("Error fetching JSON:", error));
};
