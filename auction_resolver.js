
function flattenBidsArray(buyers)
{
    var flatBidsArray = buyers
        .map(buyer => buyer.bids.map(b=> ({name:buyer.name, bid:b })))
        .flat()
        .filter(a => a.bid >= auctinoData.price)
        .sort((a,b) => b.bid - a.bid)

    return flatBidsArray
        .filter((v,i) => flatBidsArray.findIndex(x=>x.name == v.name &&  x.bid == v.bid) === i) // remove duplicates if any
}

function getWinners(flatBidsArray, highestBid)
{
    if(flatBidsArray.length == 0)
        return []
        
    var highestBid  = flatBidsArray[0].bid;
    var i = flatBidsArray.findIndex(x=>x.bid < highestBid)
 
    return flatBidsArray
            .slice(0, (i == -1)?  flatBidsArray.length : i) // if i==-1, there are only winners in the list, take them all
            .map(x=>x.name)
}

function getWinningPrice(flatBidsArray, winners, autctionPrice)
{
    if(!winners.length)
        return NaN;

    var winningPriceBid = flatBidsArray.find(x=> !winners.includes(x.name))
    return winningPriceBid === undefined?  autctionPrice : winningPriceBid.bid;
}


/**
 * Finds winner and winner price for second-price, sealed-bid auction
 * 
 * @param {object} auctionData Auctino data.
 * @param {number} auctionData.price Auction price.
 * @param {string} auctionData.buyers[].name Name of a buyer.
 * @param {number[]} auctionData.buyers[].bids List of bids.
 * @return {object} The new object containing a list of winners and a winning price if any.
 */
function resolveAuction(auctionData)
{
    var flatBidsArray = flattenBidsArray(auctionData.buyers)
    var winners = getWinners(flatBidsArray)
    var winningPrice = getWinningPrice(flatBidsArray, winners, auctionData.price)

    return {winners, winningPrice}
}

module.exports = {
    resolveAuction: resolveAuction
}

