# Jesse's Currency Exchanger

Created 03.27.21</br>
By _**Jesse Callahan**_</br>
Contact: _**Jessetylercallahan@gmail.com**_</br>

## Description

This project calculates the exchange rate from US dollars to six common currencies. It also allows you to calculate currency based on a three digit country code.

## Setup/Installation Requirements

1. Clone the repo 
2. Create a new file called '.env' inside the directory. This is where we'll hide our api key.
2. Visit https://www.exchangerate-api.com/[https://www.exchangerate-api.com/]
3. Click 'get you free api key' on the api website, sign up, and save that api key.
4. Take that api key and write it in the top of the .env file as: API_KEY=your api key here. This should hide your API key.
5. In your terminal, go to the top of the directory and 'npm install'
6. Then 'npm run start'
7. Enjoy!


Run 'npm install' in directory folder
3. Run 'npm run start' 
4. Enjoy!

## Specs

Behaviors:

1) One API call: Currency Exchange Api - this endpoint gives the price of each currency in the world to one dollar.
2) Takes user input and multiplies it by 6 common currency rates: Japan, Mexico, Canada, European Euro, India, and South Korea.
3) Takes another input, a 3 letter code, loops through each key value pair of the list of currencies from the API and trys to match country codes. If the country code is found, the application then multiplies the original input by the rate of the country code given and returns that answer. 

## Bugs

No known bugs at this time

## Technologies Used
* Npm
* webpacks
* js.node
* API
* JSON
* JS ES6

## Support and contact details
My email is jessetylercallahan@gmail.com. Feel free to email me with questions about my code. I love hearing from people!
