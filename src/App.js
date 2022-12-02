import { CssBaseline,Grid } from "@material-ui/core";
import { useEffect,useState } from "react";

import { getPlacesData, getWeatherData  } from "./api";
import Header from "./Header/Header";
import List from "./List/List";
import Map from "./Map/Map";

function App() {

  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [type, setType] = useState('restaurants');

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState('');

  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data));

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, coordinates ]);

  return (
    <>
        <CssBaseline />
        <Header />
        <Grid container spacing={3} style={{ width: '100%'}}>
          <Grid item xs={12} md={4}>
              <List 
              places={places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
              />
          </Grid>

          <Grid item xs={12} md={8}>
            <Map 
            setCoordinates = {setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
             
            />
          </Grid>
        </Grid>
    </>
   
  );
}

export default App;
