const Fav_KEY = "favourites";
const Recently_Played_KEY = "RecentlyPlayed";

export const getFavourites = () =>
  JSON.parse(localStorage.getItem(Fav_KEY)) || [];

export const getRecentlyPlayed = () =>
  JSON.parse(sessionStorage.getItem(Recently_Played_KEY)) || [];

export const addToFavourites = (song) => {
  let favourites = getFavourites();
  if (favourites.find((s) => s.id === song.id)) {
    favourites = favourites.filter((s) => s.id !== song.id);
  } else {
    favourites.push(song);
  }
  localStorage.setItem(Fav_KEY, JSON.stringify(favourites));
};

export const isFavourite = (id) => {
  return getFavourites().some((s) => s.id === id);
};

export const addToRecentlyPlayed = (song) => {
  const recent = getRecentlyPlayed().filter((s) => s.id !== song.id);
  recent.unshift(song);
  if (recent.length > 20) recent = recent.slice(0, 20);
  sessionStorage.setItem(Recently_Played_KEY, JSON.stringify(recent));
};
