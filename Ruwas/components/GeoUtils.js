// GeoUtils.js

const K0 = 0.9996;
const E = 0.00669438;
const R = 6378137;
const ZONE_LETTERS = "CDEFGHJKLMNPQRSTUVWXX";

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function latitudeToZoneLetter(latitude) {
  if (-80 <= latitude && latitude <= 84) {
    return ZONE_LETTERS[Math.floor((latitude + 80) / 8)];
  } else {
    return null;
  }
}

function latLonToZoneNumber(latitude, longitude) {
  if (56 <= latitude && latitude < 64 && 3 <= longitude && longitude < 12)
    return 32;

  if (72 <= latitude && latitude <= 84 && longitude >= 0) {
    if (longitude < 9) return 31;
    if (longitude < 21) return 33;
    if (longitude < 33) return 35;
    if (longitude < 42) return 37;
  }

  return Math.floor((longitude + 180) / 6) + 1;
}

function zoneNumberToCentralLongitude(zoneNum) {
  return (zoneNum - 1) * 6 - 180 + 3;
}

export function convertLatLonToEastingNorthing(latitude, longitude) {
  const zoneNum = latLonToZoneNumber(latitude, longitude);
  const zoneLetter = latitudeToZoneLetter(latitude);

  const latRad = toRadians(latitude);
  const lonRad = toRadians(longitude);
  const centralLon = zoneNumberToCentralLongitude(zoneNum);
  const centralLonRad = toRadians(centralLon);

  const latSin = Math.sin(latRad);
  const latCos = Math.cos(latRad);

  const nu = R / Math.sqrt(1 - E * latSin * latSin);
  const rho = (R * (1 - E)) / Math.pow(1 - E * latSin * latSin, 1.5);
  const eta2 = nu / rho - 1;

  const xi = Math.sqrt(1 + eta2 * Math.pow(Math.cos(latRad), 2));
  const eta = Math.sqrt(eta2);

  const A = Math.cos(latRad) * Math.sin(lonRad - centralLonRad);
  const A2 = Math.pow(A, 2);
  const A3 = Math.pow(A, 3);
  const A4 = Math.pow(A, 4);
  const A5 = Math.pow(A, 5);
  const A6 = Math.pow(A, 6);

  const alpha = (1 / 2) * eta * latCos * A2;
  const beta = (1 / 24) * eta * latCos * A4 * (5 - A2 + 9 * eta2);
  const gamma = (1 / 720) * eta * latCos * A6 * (61 - 58 * A2 + A4);

  const northing =
    K0 *
    (nu *
      (latRad -
        (1 / 6) *
          latCos *
          latCos *
          (1 +
            eta2 +
            alpha *
              (1 -
                A2 +
                beta *
                  (5 -
                    18 * A2 +
                    A4 +
                    14 * eta2 -
                    58 * A2 * eta2 +
                    13 * eta2 * eta2 +
                    beta *
                      (61 - 58 * A2 + A4 - 479 * eta2 + 109 * eta2 * eta2))))));
  const easting =
    K0 *
    (nu *
      latCos *
      (lonRad -
        centralLonRad +
        (1 / 6) *
          latCos *
          latCos *
          (eta2 * A2 -
            A2 +
            beta *
              (5 -
                A2 +
                beta *
                  (1 -
                    9 * A2 +
                    A4 +
                    4 * eta2 -
                    9 * A2 * eta2 +
                    12 * eta2 * eta2 +
                    beta *
                      (61 - 58 * A2 + A4 - 479 * eta2 + 109 * eta2 * eta2))))));

  return {
    easting: easting,
    northing: northing,
    zoneNum: zoneNum,
    zoneLetter: zoneLetter,
  };
}
