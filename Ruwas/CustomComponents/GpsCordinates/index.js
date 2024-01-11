import * as Location from "expo-location";

export const GpsSet = async () => {
    const coord = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = coord.coords;
    return { latitude, longitude };
}