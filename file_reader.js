
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

function readFile(fileName){
    const data = fs.readFileSync(fileName)
    var obj = JSON.parse(data)

    var validator = new jsonschema.Validator()
    validator.addSchema(buyerSchema)
    var result  = validator.validate(obj, auctionSchema)

    if(!result.valid)
        throw new Error(result.errors)      

    return obj;
}

var args = process.argv.slice(2)

if (args.length != 1){
    console.log("Usage: <InputFile> ")
    process.exit(1)
}

var obj = readFile(args[0])
console.log(obj)

