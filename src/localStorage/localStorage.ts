export const setCitiesSelectedToLocalStorage = (cities: string[]) => {
    localStorage.setItem('citiesSelected', JSON.stringify(cities));
  };
  

  export const removeCityFromLocalStorage = (cityToRemove: string) => {
    // On récupère la totalité des villes stockés dans un "tableau" dans le local storage
    const userCitiesSelectedLocalStorage = localStorage.getItem('citiesSelected');

    // Si il y a bien cette ligne dans le local storage
    if(userCitiesSelectedLocalStorage) {
        // Alors on convertit cette string en tableau (pour pouvoir récupérer la bonne ville)
        const userCitiesArray = JSON.parse(userCitiesSelectedLocalStorage);

        // On filtre chaque ligne du tableau et on stocke un nouveau tableau avec toutes les villes sauf la ville à supprimer
        const newCitiesArray = userCitiesArray.filter((city: string) => city !== cityToRemove);

        // Puis on remet ce tableau dans le local storage
        localStorage.setItem('citiesSelected', JSON.stringify(newCitiesArray));
    }
  };
  
  