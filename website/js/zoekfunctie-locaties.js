async function searchPlaces() {
 
  const response = await fetch(`/search?query=${query}&category=${category}`);
  const results = await response.json();

//Gaat asynchrone HTTP-request zenden naar database met 'name' en 'category' als parameters
//Gaat resultaat assignen aan parameter 'response

}
