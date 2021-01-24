
const auctionDataReader = require('./auction_data_reader');

var args = process.argv.slice(2)

if (args.length != 1){
    console.log("Usage: <InputFile> ")
    process.exit(1)
}

var auctinoData = auctionDataReader.readAndValidateAuctionData(args[0])

var flatBidsArray = auctinoData.buyers
    .map(buyer => buyer.bids.map(b=> ({name:buyer.name, bid:b })))
    .flat()
    .filter(a => a.bid >= auctinoData.price)
    .sort((a,b) => b.bid - a.bid)

var winnerBid = flatBidsArray[0];

if(winnerBid === undefined)
{
    console.log("No winner")
    process.exit(0)
}

console.log(flatBidsArray)

var winningPriceBid = flatBidsArray.find(x=> x.name != winnerBid.name && winnerBid.bid >= auctinoData.price)
var winningPrice = winningPriceBid === undefined ?  auctinoData.price : winningPriceBid.bid;

console.log( `The winner is ${winnerBid.name}, the winning price is ${winningPrice}`);
