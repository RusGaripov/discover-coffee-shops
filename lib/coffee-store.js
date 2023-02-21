import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: "hjrnUgBLGCrH-Bzhoh99G95UhA66VMQ_E7kNMiFiuJs",
  //...other fetch options
});

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((results) => results.urls["small"]);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();
  let data = [];
  await fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => (data = json));
  return data.map((item,idx)=>{
    return{
        ...item,
        imgUrl:photos[idx] || null
      }
    })
};
