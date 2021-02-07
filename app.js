var express = require('express');

var app = express();

// Type 3: Persistent datastore with automatic loading
var Datastore = require('nedb')
    , db = new Datastore({ filename: './db/primes.db', autoload: true });

var schema = {
    properties: {
        primeNumber: {
            description: 'Enter a number',
            type: 'number',
            pattern: /^[1-9]\d*$/,
            message: 'Prime must only be positive numbers',
            required: true
        }
    }
};

function getPrimeFactors(primeFactorInput) {
    let inputToSave = primeFactorInput
    const primeArray = [];
    let isPrime;

    // Find divisors starting with 2
    for (let i = 2; i <= primeFactorInput; i++) {
        if (primeFactorInput % i !== 0) continue;

        // Check if the divisor is a prime number
        for (let j = 2; j <= i / 2; j++) {
            isPrime = i % j !== 0;
        }

        if (!isPrime) continue;
        // if the divisor is prime, divide integer with the number and store it in the array
        var doc = {
            prime: {
                userInput: inputToSave,
                primes: primeArray
            }
        }
        db.insert(doc, function (err, newDoc) {
    
        })
        primeFactorInput /= i
        primeArray.push(i);
    }

    return primeArray;
}

var prompt = require('prompt');

//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: primeNumber
//
prompt.get(schema, function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log(' Inputted primeNumber: ' + result.primeNumber);
    const primeFactorInput = result.primeNumber
    console.time('primeFactor')
    db.find({ $where: function() {return Object.keys(userInput) == result.primeNumber} }, function(err, docs) {
        console.log('db find')
        if (docs && docs.length >= 1) {
            console.log('Primes already calculated, fetched from db: ', JSON.stringify(docs))
            console.timeEnd('primeFactor')
        } else {
            console.log('Primefactors found: ', getPrimeFactors(primeFactorInput).join(' , '));
            console.timeEnd('primeFactor')
        }
        }
    )
});

module.exports = app;
