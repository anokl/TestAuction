
const auctionDataReader = require('./auction_data_reader');


function getFlatBidsArray(auctinoData)
{
    var flatBidsArray = auctinoData.buyers
        .map(buyer => buyer.bids.map(b=> ({name:buyer.name, bid:b })))
        .flat()
        .filter(a => a.bid >= auctinoData.price)
        .sort((a,b) => b.bid - a.bid)

    return flatBidsArray
        .filter((v,i) => flatBidsArray.indexOf(v) === i) // remove duplicates if any
}

function getWinners(flatBidsArray, highestBid)
{
    var highestBid  = flatBidsArray[0].bid;
    var i = flatBidsArray.findIndex(x=>x.bid < highestBid)
    return flatBidsArray
            .slice(0, i)
            .map(x=>x.name)
}

function getWinningPrice(flatBidsArray, winners, autctionPrice)
{
    var winningPriceBid = flatBidsArray.find(x=> !winners.includes(x.name))
    return winningPriceBid === undefined ?  autctionPrice : winningPriceBid.bid;
}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

var args = process.argv.slice(2)

if (args.length != 1){
    console.log("Usage: <InputFile> ")
    process.exit(1)
}

var auctinoData = auctionDataReader.readAndValidateAuctionData(args[0])
var flatBidsArray = getFlatBidsArray(auctinoData)

console.log(flatBidsArray)

if(flatBidsArray.length == 0)
{
    console.log("No winner")
    process.exit(0)
}

var winners = getWinners(flatBidsArray)
var winningPrice = getWinningPrice(flatBidsArray, winners, auctinoData.price)

console.log( `The winners: ${winners}, the winning price is ${winningPrice}`);

// Attention to the cases like: (two winners but the price is default)
// A : 130
// B : 130
// B : 120

// Check duplicate!!!
//
//
//
//

