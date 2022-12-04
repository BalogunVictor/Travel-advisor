import axios from "axios";

 export const getPlacesData = async ( type, sw, ne) => {

  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
  
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': '3135610505msh72f6bfe93d12f28p14dbc2jsnbc956792e81b',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });

    return data;
  } catch (error) {

    console.log(error)
  }
 } 

 export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://open-weather-map27.p.rapidapi.com/weather', {
        params: { lat: lat, lon: lng },
        headers: {
          'X-RapidAPI-Key': '3135610505msh72f6bfe93d12f28p14dbc2jsnbc956792e81b',
          'X-RapidAPI-Host': 'open-weather-map27.p.rapidapi.com'
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
