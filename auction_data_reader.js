
const fs = require('fs')
const jsonschema = require('jsonschema')

var buyerSchema = {
    "id": "/buyer",
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "bids": {
            "type": "array",
            "items": {"type": ["number"]},
            "uniqueItems": true
        }
    },
    "required": ["name", "bids"]
}

var auctionSchema = {
    "type": "object",
    "properties": {
        "price" : {"type": "number"},
        "buyers": {
            "type": "array",
            "items": {"$ref": "/buyer"}
        }
    },
    "required": ["price"]
}

/**
 * Reads auction data from file in JSON format and checks its validity.
 * 
 * @param {string} fileName input file name.
 * @return {object} The new object containing auction data.
 * @throws Will throw an error if file does not exist, JSON is ill-formed or format is invalid.
 */
function readAuctionDataFromFile(fileName){
    const data = fs.readFileSync(fileName)
    return readAuctionData(data)
}

/**
 * Reads auction data in JSON format and checks its validity.
 * 
 * @param {string} data input data in JSON fromat.
 * @return {object} The new object containing auction data.
 * @throws Will throw an error if JSON is ill-formed or format is invalid.
 */
function readAuctionData(data){
    var obj = JSON.parse(data)

    var validator = new jsonschema.Validator()
    validator.addSchema(buyerSchema)
    var result  = validator.validate(obj, auctionSchema)

    if(!result.valid)
        throw new Error(result.errors)      

    return obj;
}

module.exports = {
    readAuctionDataFromFile: readAuctionDataFromFile,
    readAuctionData: readAuctionData
}
