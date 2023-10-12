/***** Imports *****/
import { getPets, postPets, patchPets, deletePets } from "./utils/petsdb.js";

/***** Constants *****/
const petDisplay = document.querySelector(".pet-display");
const categoryContainers = document.querySelectorAll(".category");
const formContainers = document.querySelectorAll(".form");
const catHide = document.querySelector(".cat-hide");
const displayPetsButton = document.querySelector(".display-pets");

/***** Functions & other stuff *****/
/* Window Loaded */
window.onload = (event) => {
  formContainers.forEach((container) => {
    container.style.display = "none";
    catHide.style.backgroundColor = "var(--accent2)";

    if (petDisplay.innerHTML.trim() === "") {
      displayPetsButton.style.backgroundColor = "var(--accent2)";
      init();
    } else {
      displayPetsButton.style.backgroundColor = "var(--accent";
      petDisplay.innerHTML = "";
    }
  });
};

/* Form Category */
function showCategory(selectedCategory) {
  if (selectedCategory === "hide-containers" || selectedCategory.trim() === "") {
  } else {
    const selectedForm = document.querySelector(`.${selectedCategory}.form`);
    selectedForm.style.display = "flex";
  }
}

categoryContainers.forEach((category) => {
  category.addEventListener("click", (e) => {
    categoryContainers.forEach((container) => {
      container.style.backgroundColor = "var(--accent";
    });
    formContainers.forEach((container) => {
      container.style.display = "none";
    });

    const selectedCategory = e.target.dataset.value;
    e.target.style.backgroundColor = "var(--accent2)";
    showCategory(selectedCategory);
  });
});

/* Get Pets */

async function init() {
  const pets = await getPets();
  const petTemplate = document.querySelector("#pet-template").content;
  petDisplay.innerHTML = "";

  pets.forEach((pet) => {
    const petClone = petTemplate.cloneNode(true);

    const petImage = petClone.querySelector(".pet-image");
    petImage.src = pet.image;

    const petName = petClone.querySelector(".pet-name");
    petName.textContent = pet.name;

    const petSpecies = petClone.querySelector(".pet-species");
    petSpecies.textContent = pet.species;

    const petRace = petClone.querySelector(".pet-race");
    petRace.textContent = pet.race;

    const petActivityLevel = petClone.querySelector(".pet-activityLevel");
    petActivityLevel.textContent = pet.activityLevel;

    const petDoB = petClone.querySelector(".pet-dob");
    petDoB.textContent = pet.dob;

    const petAlive = petClone.querySelector(".pet-isAlive");
    petAlive.textContent = pet.isAlive ? "Yes" : "No";

    const petTraits = petClone.querySelector(".pet-traits");

    pet.traits.forEach((trait) => {
      const specificTrait = document.createElement("li");
      specificTrait.textContent = trait;
      petTraits.appendChild(specificTrait);
    });

    const petID = petClone.querySelector(".pet-id");
    petID.textContent = pet.id;
    petDisplay.appendChild(petClone);
  });

  console.log(pets);
}

/* Display Pets */
displayPetsButton.addEventListener("click", () => {
  if (petDisplay.innerHTML.trim() === "") {
    displayPetsButton.style.backgroundColor = "var(--accent2)";
    init();
  } else {
    displayPetsButton.style.backgroundColor = "var(--accent";
    petDisplay.innerHTML = "";
  }
});

/* Post Pet */

document.querySelector(".post-pet").addEventListener("click", async () => {
  const postPetName = document.querySelector("#post-pet-name").value;
  const postPetImage = document.querySelector("#post-pet-image").value;
  const postPetSpeciesRace = document.querySelector("#post-pet-species-race").value;
  const speciesRaceParts = postPetSpeciesRace.split(" + ");
  const postPetSpecies = speciesRaceParts[0];
  const postPetRace = speciesRaceParts[1];
  const postPetActivityLevel = document.querySelector("#post-pet-activity-level").value;
  const postPetTraits = document.querySelector("#post-pet-traits").value;
  if (postPetName.trim() !== "") {
    await postPets(postPetName, postPetImage, postPetSpecies, postPetRace, postPetActivityLevel, postPetTraits);
    init();
  }
});

/* Patch Pet */

document.querySelector(".patch-pet").addEventListener("click", async () => {
  const patchPetIDInput = document.querySelector("#patch-pet-id").value;
  await patchPets(patchPetIDInput);
  init();
});

/* Delete Pet */

document.querySelector(".delete-pet").addEventListener("click", async () => {
  const deletePetIDInput = document.querySelector("#deletePetID").value;
  await deletePets(deletePetIDInput);
  init();
});

/* To avoid page reloading when pressing buttons in forms */
document.querySelectorAll(".form").forEach((e) => {
  e.addEventListener("submit", async (e) => {
    e.preventDefault();
  });
});
