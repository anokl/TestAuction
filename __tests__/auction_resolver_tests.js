
const resolver = require('../auction_resolver');
const reader = require('../auction_data_reader');
const each = require("jest-each").default;

describe('auction resolver test scenarios', () => {

    each([
        [ "basic test" , "basic.json", { winners: [ 'E' ], winningPrice: 130 } ],
        [ "multiple winners", "multiple_winners.json", { winners: [ 'A', 'B' ], winningPrice: 105 } ],
        [ "duplicated bids" , "duplicated_bids.json", { winners: [ 'A', 'B' ], winningPrice: 90 } ],
        [ "zero price and zero bids", "zero_price_and_zero_bids.json", { winners: [ 'A', 'B', 'C' ], winningPrice: 0 } ],
        [ "empty bids", "empty_bids.json", { winners: [], winningPrice: NaN }],
        [ "all bids above price and belong to the same buyer", "all_bids_above_price_and_belong_to_the_same_buyer.json", { winners: [ 'Bob' ], winningPrice: 42 } ],
        [ "all bids belongs to winners", "all_bids_belong_to_winners.json", { winners: [ 'Bob', 'Bill', 'Sally' ], winningPrice: 42 } ],
        [ "all bids below price", "all_bids_below_price.json", { winners: [], winningPrice: NaN } ],
        [ "all bids exactly at price", "all_bids_exactly_at_price.json", { winners: [ 'Bob', 'Bill', 'Sally' ], winningPrice: 42 } ]
    ]).describe('%s', (descr, file, expected) => {
        test(descr, () => {
        const data = reader.readAuctionDataFromFile('./test_scenarios/' + file)
        expect(resolver.resolveAuction(data))
            .toMatchObject(expected)
        })
    })
})