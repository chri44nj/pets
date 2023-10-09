/* Imports */
import { getPets, postPets, patchPets, deletePets } from "./utils/petsdb.js";

/* Content Loaded */
document.addEventListener("DOMContentLoaded", () => {
  init();
});

/* Functions */

async function init() {
  const pets = await getPets();

  const petDisplay = document.querySelector(".pet-display");
  const petTemplate = document.querySelector("#pet-template").content;
  petDisplay.innerHTML = "";

  pets.forEach((pet) => {
    const petClone = petTemplate.cloneNode(true);

    const petImage = petClone.querySelector(".pet-image");
    petImage.src = pet.image;

    const petName = petClone.querySelector(".pet-name");
    petName.textContent = "Name: " + pet.name;

    const petSpecies = petClone.querySelector(".pet-species");
    petSpecies.textContent = "Species: " + pet.species;

    const petRace = petClone.querySelector(".pet-race");
    petRace.textContent = "Race: " + pet.race;

    const petActivityLevel = petClone.querySelector(".pet-activityLevel");
    petActivityLevel.textContent = "Activity level: " + pet.activityLevel;

    const petDoB = petClone.querySelector(".pet-dob");
    petDoB.textContent = "Date of Birth: " + pet.dob;

    const petAlive = petClone.querySelector(".pet-isAlive");
    petAlive.textContent = "Alive: " + (pet.isAlive ? "Yes" : "No");

    const petTraits = petClone.querySelector(".pet-traits");
    petTraits.textContent = "Traits: ";
    pet.traits.forEach((trait) => {
      const specificTrait = document.createElement("li");
      specificTrait.textContent = trait + ",";
      petTraits.appendChild(specificTrait);
    });

    const petID = petClone.querySelector(".pet-id");
    petID.textContent = "Unique ID: " + pet.id;

    petDisplay.appendChild(petClone);
  });

  console.log(pets);
}

/* Post Pet */

document.querySelector(".post-pet").addEventListener("click", async () => {
  await postPets();
  init();
});

/* Patch Pet */

document.querySelector(".patch-pet").addEventListener("click", async () => {
  const patchPetIDInput = document.querySelector(".patchPetID").value;
  await patchPets(patchPetIDInput);
  init();
});

/* Delete Pet */

document.querySelector(".delete-pet").addEventListener("click", async () => {
  const deletePetIDInput = document.querySelector(".deletePetID").value;
  await deletePets(deletePetIDInput);
  init();
});
