import axios from "axios";
const weatherApiURL = "http://api.openweathermap.org/data/2.5/weather";

const weatherSecretKey = "c27f319f60d4a6082637084e20d91315";

const getFullUrl = name => {
  let url = `${weatherApiURL}?q=${name}&appid=${weatherSecretKey}&units=metric`;

  return url;
};

export default async function fetchApi(data) {
  if (typeof data === "object" && data.length > 0 && data !== null) {
    const request = await axios.all(
      data.map(city => axios.get(getFullUrl(city)))
    );
    let citysData = request.map(city => city.data);

    return citysData;
  }
  console.error("Wrong data");
  return false;
}
