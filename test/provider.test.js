const { Verifier } = require("@pact-foundation/pact")
const { server, importData, animalRepository } = require("../app/provider")
const path = require("path")

server.listen(8081, () => { console.log("Animal Profile Service listening on http://localhost:8081") })

// Verify that the provider meets all consumer expectations
describe("Pact Verification", () => {
    it("validates the expectations of Matching Service", async function () {
        let token;

        let opts = {
            provider: "Animal Profile Service",
            logLevel: "DEBUG",
            providerBaseUrl: "http://localhost:8081",
            stateHandlers: {
                "Has no animals": () => {
                    animalRepository.clear()
                    token = "1234"
                    return Promise.resolve(`Animals removed to the db`)
                },
                "Has some animals": () => {
                    token = "1234"
                    importData()
                    return Promise.resolve(`Animals added to the db`)
                },
                "Has an animal with ID 1": () => {
                    token = "1234"
                    importData()
                    return Promise.resolve(`Animals added to the db`)
                },
                "is not authenticated": () => {
                    token = ""
                    Promise.resolve(`Invalid bearer token generated`)
                },
            },
            requestFilter: (req, res, next) => {
                console.log("Middleware invoked before provider API - injecting Authorization token")
                // e.g. ADD Bearer token
                req.headers["authorization"] = `Bearer ${token}`
                next()
            },

            // Fetch from broker with given tags
            tags: ["prod"],

            // Specific Remote pacts (doesn't need to be a broker)
            // pactUrls: ['https://test.pact.dius.com.au/pacts/provider/Animal%20Profile%20Service/consumer/Matching%20Service/latest'],
            // Local pacts
            pactUrls: [
                path.resolve(
                    process.cwd(),
                    "./pacts/matching_service-animal_profile_service.json"
                ),
            ],
            // Fetch pacts from broker
            // pactBrokerUrl: "https://test.pact.dius.com.au/",
            // pactBrokerUsername: "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
            // pactBrokerPassword: "O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1",
            // publishVerificationResult: true,
            providerVersion: "1.0.0",
        }
        return new Verifier().verifyProvider(opts).then(output => {
            console.log("Pact Verification Complete!")
            console.log(output)
        })
    })
})