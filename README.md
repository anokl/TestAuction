## Technology choice 
I decided to do the task in JavaScript. The main reason is simply to allow to run the program on any platform without installing a heavy SDK or a compiler.

## Dependencies
The algorithm is implemented using exclusively build-in JavaScript functionality. 
However,the input data is validated using *jsonschema* package to avoid boilerplate code not related directly to the algorithm. 
Unit tests are based on *Jest* framework. These two dependencies need to be installed.

## Project structure

* [main.js](https://github.com/anokl/TestAuction/blob/main/main.js) - program entry point: parsing of command line arguments
* [auction_data_reader.js](https://github.com/anokl/TestAuction/blob/main/auction_data_reader.js) - input data reading and validation
* [auction_resolver.js](https://github.com/anokl/TestAuction/blob/main/auction_resolver.js) - the algorithm
* [\__tests__/*](https://github.com/anokl/TestAuction/tree/main/__tests__) - unit tests folder
* [test_scenarious/\*](https://github.com/anokl/TestAuction/tree/main/test_scenarios) - several test scenarios 

## How to run the program

Download and install Node.js package for your platform from: https://nodejs.org/en/download/. You can also install Node.js using your favorite package manager. When it is done, open the source directory in command line and type: 

```shell 
npm install
```

This command should install the dependencies to the local *node_modules* folder.
If everything is fine up to this point you will be able to run the program by typing:

```shell 
node main.js
```

The output of the command:

```shell 
Usage: main.js <InputFile>
```

The program expects the input file containing the auction information. The data format is described in the next section. Given the valid inpt file:

```shell
nodejs main.js ./test_cases/basic.json
```
The output of the program is the following:

```json
{ winners: [ 'E' ], winningPrice: 130 }
```

Te output is also in JSON fromat where "winners" repreents the list of winner names followed by the winning price. 


## How to run test scenarious

To run all test scenarios tape: 

```shell
npm run test
```

## Input data format
The input data is in JSON format:

```json
{
"price": 100,
"buyers": 
	[{ 
		"name": "A",
		"bids": [110, 130]
	},
	{
		"name": "B",
		"bids": []
	},
	{
		"name": "C",
		"bids": [125]
	},
	{
		"name": "D",
	 	"bids": [105, 115, 90]
	},
	{
		"name": "E",
		"bids": [132, 135, 140]
	}]
}
```
The format is quite self-explanatory. "price" is the auction price. The field is numeric and is obligatory.
"buyers" is the array of buyers. Each buyer must have a name and an array of bids of numeric type. The bids array my be empty and may have duplicated values.
More examples of input data can be found here: https://github.com/anokl/TestAuction/tree/main/test_scenarios

## Algorithm explanation
The algorithm consists of three steps. Te first step "flattens" the input data, removes duplicates and uninterested bids (below auction price), and sort bids in descending order. Taking the example above the first step transforms:

```json
{
"price": 100,
"buyers": 
	[{ 
		"name": "A",
		"bids": [110, 130]
	},
	{
		"name": "B",
		"bids": []
	},
	{
		"name": "C",
		"bids": [125]
	},
	{
		"name": "D",
	 	"bids": [105, 115, 90]
	},
	{
		"name": "E",
		"bids": [132, 135, 140]
	}]
}
```

To something like:

```Json
[
  { name: 'E', bid: 140 },
  { name: 'E', bid: 135 },
  { name: 'E', bid: 132 },
  { name: 'A', bid: 130 },
  { name: 'C', bid: 125 },
  { name: 'D', bid: 115 },
  { name: 'A', bid: 110 },
  { name: 'D', bid: 105 }
]
```

We can now find the winners by simply taking the buyers with the highest bid. 
The winning price is then found as the second highest bid from non-winner if any. Otherwise the auction price is taken as a winning price. 






