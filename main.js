
const auctionDataReader = require('./auction_data_reader');
const auctionResolver = require('./auction_resolver');

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

var args = process.argv.slice(2)

if (args.length != 1){
    console.log("Usage: main.js <InputFile>")
    process.exit(1)
}

try {
    var auctionData = auctionDataReader.readAuctionDataFromFile(args[0])
}
catch(ex)
{
    console.error("Input file format error: ", ex.message);
    process.exit(1)
}

var auctionResult = auctionResolver.resolveAuction(auctionData)

console.log(auctionResult);
