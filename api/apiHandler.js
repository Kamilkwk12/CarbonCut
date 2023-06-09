export const getEmissions = async ({ type, value }) => {
    let euro = [];
    let emission = [];
    if (type == "car") {
        try {
            const response = await fetch("https://beta4.api.climatiq.io/estimate", {
                method: "POST",
                headers: { Authorization: "Bearer 8CCF61RBSW4KQKK37XACMN245KWT", "Content-Type": "application/json" },
                body: JSON.stringify({
                    emission_factor: {
                        activity_id: "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na",
                        source: "ADEME",
                        region: "FR",
                        year: 2021,
                        source_lca_activity: "unknown",
                        data_version: "^1",
                    },
                    parameters: {
                        distance: Number(value),
                        distance_unit: "km",
                    },
                }),
            });
            const json = await response.json();
            return json;
        } catch (e) {
            console.log(e);
        }
    } else if (type == "meat") {
        try {
            const euroPrice = await fetch("https://api.nbp.pl/api/exchangerates/rates/A/EUR/", {
                method: "GET",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
            });
            const json = await euroPrice.json();
            euro = json.rates[0].mid;
            console.log(euro);
            console.log(Math.floor((value / euro) * 100) / 100);
        } catch (e) {
            console.log(e);
        }

        try {
            const response = await fetch("https://beta4.api.climatiq.io/estimate", {
                method: "POST",
                headers: { Authorization: "Bearer 8CCF61RBSW4KQKK37XACMN245KWT", "Content-Type": "application/json" },
                body: JSON.stringify({
                    emission_factor: {
                        activity_id: "consumer_goods-type_meat_products_beef",
                        source: "EXIOBASE",
                        region: "PL",
                        year: 2019,
                        source_lca_activity: "unknown",
                        data_version: "^1",
                    },
                    parameters: {
                        money: Math.floor((value / euro) * 100) / 100,
                        money_unit: "eur",
                    },
                }),
            });
            const json = await response.json();
            return json;
        } catch (e) {
            console.log(e);
        }
    }
};
