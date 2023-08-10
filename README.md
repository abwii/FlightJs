# Flight finder

## Description

The goal of this exercise is to analyze a list of flight. For each travel (departure airport to arrival airport):

- find the cheapest available flight (flight number, price and date) in the next 40 days
- for each day, find the cheapest available flight in a period of ± 5 days

Flights list will be given via a JSON array containing details of flight

```json
[
    {
        "fares": [
            {
                "availability": 2,
                "classOfService": "K",
                "fareBasisCode": "KBAHV",
                "farePrice": 93.09,
                "productClass": "Basic",
                "taxFeeSum": 9.91,
                "totalPriceOnePassenger": 103.0
            },
            {
                "availability": 4,
                "classOfService": "V",
                "fareBasisCode": "VBAHV",
                "farePrice": 100.09,
                "productClass": "Basic",
                "taxFeeSum": 9.91,
                "totalPriceOnePassenger": 110.0
            },
            {
                "availability": 6,
                "classOfService": "Q",
                "fareBasisCode": "QBAHV",
                "farePrice": 107.09,
                "productClass": "Basic",
                "taxFeeSum": 9.91,
                "totalPriceOnePassenger": 117.0
            },
            {
                "availability": 8,
                "classOfService": "H",
                "fareBasisCode": "HBAHV",
                "farePrice": 114.09,
                "productClass": "Basic",
                "taxFeeSum": 9.91,
                "totalPriceOnePassenger": 124.0
            }
        ],
        "flight": {
            "arrivalAirport": {
                "locationCode": "AMS"
            },
            "arrivalDateTime": "2019-01-17T16:10:00",
            "departureAirport": {
                "locationCode": "ACE"
            },
            "departureDateTime": "2019-01-17T10:45:00",
            "flightNumber": 5686,
            "id": "ACEAMS20190117HV5686",
            "marketingAirline": {
                "companyShortName": "HV"
            }
        }
    },
    // many more flight details
]
```

The output will be in the form:

```
[
    { // cheapest flight between ACE and AMS in the next 40 days
        "id": "ACE-AMS",
        "departure": "ACE",
        "arrival": "AMS",
        "flightNumber": 5686,
        "price": 103.0,
        "date": "2019-01-17"
    },
    { // cheapest flight between ACE and AMS 5 days around the 2019-01-17
        "id": "ACE-AMS-20190117",
        "departure": "ACE",
        "arrival": "AMS",
        "flightNumber": 5676,
        "price": 99.95,
        "date": "2019-01-19"
    },
    // ...
]
```

For each departure/arrival couple:

- one entry with id `departure-arrival` (eg. ACE-AMS) will contain details for the cheapest flight in the next 40 days
- one entry per day with id `departure-arrival-yyyyMMdd` (eg. ACE-AMS-20190117 for the 2019-01-17) will contain details for the cheapest flight in the five days around the date.

## What needs to be done?

Implement `FlightAnalyser.analyse(flights)` method. Feel free to add whichever class, method, dependencies, tests you
need/want.

## How to run?

### Using yarn

To run the program, execute:

```bash
yarn start --file src/test/flights.json --output out.json
```

To run tests, execute

```bash
yarn test
```

## Credits

Icons made by [Maxim Basinski](https://www.flaticon.com/authors/maxim-basinski) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
