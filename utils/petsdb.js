const petsapikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y3FzdWtyc2xmbnJ5d3Zra21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NDE1MzYsImV4cCI6MTk5NzUxNzUzNn0.q1lX-ubiMOiGU0SMT99lf7QauZ0wgy7dyaNSLxTobUg";
const petsurl = "https://cxcqsukrslfnrywvkkml.supabase.co/rest/v1/";
export async function getPets() {
  let headersList = {
    apikey: petsapikey,
  };

  let petsData = await fetch(petsurl + "pets", {
    method: "GET",
    headers: headersList,
  });

  let data = await petsData.json();
  return data;
}

export async function postPets() {
  let headersList = {
    apikey: petsapikey,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: "Tumle",
    image: "golden.webp",
    species: "Cat",
    race: "Norwegian Forest Cat",
    dob: "2005-07-07",
    traits: ["Funny", "The Queen", "Aggressive"],
    activityLevel: 2,
    isAlive: false,
  });

  let response = await fetch("https://cxcqsukrslfnrywvkkml.supabase.co/rest/v1/pets", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });
}

export async function patchPets() {
  let headersList = {
    apikey: petsapikey,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: "Tumlekatten",
    species: "Cat",
    race: "Norwegian Forest Cat",
    dob: "2005-07-07",
    traits: ["Funny", "Dronningen", "Aggressive"],
    activityLevel: 3,
    isAlive: false,
  });

  let response = await fetch("https://cxcqsukrslfnrywvkkml.supabase.co/rest/v1/pets?id=eq.4", {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
}

export async function deletePets(id) {
  let headersList = {
    apikey: petsapikey,
  };

  let response = await fetch(petsurl + "pets?id=eq." + id, {
    method: "DELETE",
    headers: headersList,
  });
}
