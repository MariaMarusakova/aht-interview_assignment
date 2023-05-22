const telemetrySchema = {
    type: "object",
    properties: {
        locationID: {type: "number"},
        locationAddress: {type: "string"},
        currentTemp: {type: "number"},
        status: {type: "boolean"}
    },
    required: ["locationID", "locationAddress", "currentTemp"],
};

exports.telemetrySchema = telemetrySchema;
