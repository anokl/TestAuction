
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
    "required": ["name"]
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

function readAndValidateAuctionData(fileName){
    const data = fs.readFileSync(fileName)
    var obj = JSON.parse(data)

    var validator = new jsonschema.Validator()
    validator.addSchema(buyerSchema)
    var result  = validator.validate(obj, auctionSchema)

    if(!result.valid)
        throw new Error(result.errors)      

    return obj;
}

module.exports = {
    readAndValidateAuctionData: readAndValidateAuctionData
}
