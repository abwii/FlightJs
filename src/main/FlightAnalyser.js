function getCheapestFareForFlight(flight) {
  const cheapestFareForFlight = flight.fares.reduce((minFare, currentFare) => {
    return currentFare.totalPriceOnePassenger < minFare.totalPriceOnePassenger ? currentFare : minFare;
  }, flight.fares[0]);

  return cheapestFareForFlight;
}

export default {
  analyze(flights) {

    // Normalement on met "const today = new Date();" pour avoir la date d'aujourd'hui mais aucun vol n'est à l'horizon... Alors on en met une au pif
    const today = new Date("2019-01-17T00:00:00Z");
    console.log(today);

    // On récupère le timestamp dans 40 jours
    const fortyDaysFromNow = new Date(today).setDate(today.getDate() + 40);

    // On récupère le timestamp dans 5 jours avant et après la date indiquée
    const fiveDaysBefore = new Date(today).setDate(today.getDate() - 5);
    const fiveDaysAfter = new Date(today).setDate(today.getDate() + 5);

    const cheapestFaresByFlight = [];

    // Pour chaque vol, on récupère les tarifs les moins chers selon les périodes
    flights.forEach(flightData => {
      const departureDate = new Date(flightData.flight.departureDateTime);

      // Trouver les tarifs les moins chers pour tous les vols dans les 40 jours à venir
      if (departureDate >= today && departureDate <= fortyDaysFromNow) {
        const cheapestFareForFlight = getCheapestFareForFlight(flightData);

        cheapestFaresByFlight.push({
          id: `${flightData.flight.departureAirport.locationCode}-${flightData.flight.arrivalAirport.locationCode}`,
          departure: flightData.flight.departureAirport.locationCode,
          arrival: flightData.flight.arrivalAirport.locationCode,
          flightNumber: flightData.flight.flightNumber,
          price: cheapestFareForFlight.totalPriceOnePassenger,
          date: departureDate.toISOString().split("T")[0],
        });
      }

      // Trouver les tarifs les moins chers pour tous les vols dans les 5 jours avant et après la date indiquée
      if (departureDate >= fiveDaysBefore && departureDate <= fiveDaysAfter) {
        const cheapestFareForFlight = getCheapestFareForFlight(flightData);

        cheapestFaresByFlight.push({
          id: `${flightData.flight.departureAirport.locationCode}-${flightData.flight.arrivalAirport.locationCode}-${departureDate.toISOString().split("T")[0].split("-").join("")}`,
          departure: flightData.flight.departureAirport.locationCode,
          arrival: flightData.flight.arrivalAirport.locationCode,
          flightNumber: flightData.flight.flightNumber,
          price: cheapestFareForFlight.totalPriceOnePassenger,
          date: departureDate.toISOString().split("T")[0],
        });
      }
    });

    const sortedCheapestFares = cheapestFaresByFlight.sort((a, b) => a.totalPriceOnePassenger - b.totalPriceOnePassenger);
    const cheapestFlights = [];
    const uniqueIds = [];

    // On récupère les ids uniques, au format "AAA-BBB" (40 jours à venir) ou "AAA-BBB-YYYYMMDD" (5 jours avant et après)
    sortedCheapestFares.forEach(flight => {
      const id = flight.id.split("-");
      const mergedId = id[2] ? `${id[0]}-${id[1]}-` : flight.id;
      if (!uniqueIds.includes(mergedId)) {
        uniqueIds.push(mergedId);
      }
    });

    // Pour chaque id, on récupère le vol le moins cher
    uniqueIds.forEach(id => {
      const flightsWithSameId = sortedCheapestFares.filter(flight => flight.id.includes(id));
      const cheapestFlight = flightsWithSameId.reduce((minFare, currentFare) => {
        return currentFare.price < minFare.price ? currentFare : minFare;
      }, flightsWithSameId[0]);
      cheapestFlights.push(cheapestFlight);
    });

    return cheapestFlights;
  }
};