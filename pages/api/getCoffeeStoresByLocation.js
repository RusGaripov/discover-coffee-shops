import { fetchCoffeeStores } from "@/lib/coffee-store";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, 30);
    res.status(200);
    res.json(response);
  } catch (err) {
    console.log("There is an error");
    res.status(500);
    res.json({ message: "Oh no ! Something went wrong", err });
  }
};

export default getCoffeeStoresByLocation
