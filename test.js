// Déclaration d'une variable globale pour stocker les mots aléatoires
let randomWords = [];

// Fonction asynchrone qui récupère des mots aléatoires depuis l'API et les affecte à la variable globale
async function getRandomWords(numWords) {
  try {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${numWords}`);
    const data = await response.json();
    randomWords = data; // Affecte le tableau de mots retourné à la variable globale
  } catch (error) {
    console.log(error);
  }
}

// Appel de la fonction getRandomWords avec le nombre de mots souhaité (ici 20)
async function test() {
  await getRandomWords(20);
  console.log(randomWords);
}

test();
