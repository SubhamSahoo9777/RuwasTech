// import * as Location from "expo-location";

// export const GpsSet = async () => {
//     const coord = await Location.getCurrentPositionAsync();
//     const { latitude, longitude } = coord.coords;
//     return { latitude, longitude };
// }
import * as Location from "expo-location";

export const GpsSet = () => {
    return new Promise((resolve, reject) => {
        Location.watchPositionAsync({ accuracy: Location.Accuracy.High }, (loc) => {
            const { latitude, longitude } = loc.coords;
            resolve({ latitude, longitude });
        }) 
        .catch(error => reject(error));
    });
}