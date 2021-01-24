
const auctionDataReader = require('./auction_data_reader');
const auctionResolver = require('./auction_resolver');

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

var args = process.argv.slice(2)

if (args.length != 1){
    console.log("Usage: <InputFile> ")
    process.exit(1)
}

var auctionData = auctionDataReader.readAndValidateAuctionData(args[0])
var auctionResult = auctionResolver.resolveAuction(auctionData)


console.log(auctionResult);
