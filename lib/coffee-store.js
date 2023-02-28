import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: `${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((results) => results.urls["small"]);
};

export const fetchCoffeeStores = async (latLong = "43.649037,-79.39") => {
  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee stores", 6),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${process.env.FOURSQUARE_API_KEY}`,
      },
    }
  );

  const data = await response.json();

  const photos = await getListOfCoffeeStorePhotos();

  return data.results.map((venue, idx) => {
    return {
      name: venue.name,
      id: venue.fsq_id,
      address: venue.location.address || "",
      neighbourhood: venue.location.neighbourhood || "",
      imgUrl: photos[idx] || null,
    };
  });
};
