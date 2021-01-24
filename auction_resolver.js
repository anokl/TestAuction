

function getFlatBidsArray(auctinoData)
{
    var flatBidsArray = auctinoData.buyers
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
            .slice(0, i)
            .map(x=>x.name)
}

function getWinningPrice(flatBidsArray, winners, autctionPrice)
{
    if(!winners.length)
        return NaN;

    var winningPriceBid = flatBidsArray.find(x=> !winners.includes(x.name))
    return winningPriceBid === undefined?  autctionPrice : winningPriceBid.bid;
}

function resolveAuction(auctionData)
{
    var flatBidsArray = getFlatBidsArray(auctionData)
    var winners = getWinners(flatBidsArray)
    var winningPrice = getWinningPrice(flatBidsArray, winners, auctionData.price)

    return {winners, winningPrice}
}

module.exports = {
    resolveAuction: resolveAuction
}

