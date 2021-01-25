const reader = require('../auction_data_reader');
const fs = require('fs')

describe('data reader tests', () => {

    test('should detect missing price in input data', () => {
        const data = fs.readFileSync("./test_scenarios/bad_file_format_price_missing.json")
        expect(x=> { reader.readAuctionData(data)})
            .toThrowError('requires property "price"')
    });

    test('should detect ill-formed json in input data', () => {
        const data = fs.readFileSync("./test_scenarios/ill_formed_json.json")
        expect(x=> { reader.readAuctionData(data)})
            .toThrow();
    });

    test('should detect null price or bids in input data', () => {
        const data = fs.readFileSync("./test_scenarios/nan_price_or_bid.json")
        expect(x=> { reader.readAuctionData(data)})
            .toThrowError('is not of a type(s) number')
    });

    test('should detect buyer name missing in input data', () => {
        const data = fs.readFileSync("./test_scenarios/bad_file_format_buyers_name_missing.json")
        expect(x=> { reader.readAuctionData(data)})
            .toThrowError('requires property "name"')
    })

})