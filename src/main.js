import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './services/exchange-rate-lookup-service.js';

function clearFields() {
  $('#playerName').val("");
  $('.show-errors').text("");
}

function exchangeLogic(input, exchangeResponse) {
  parseInt(input)
  var exchangeRateList = {
    USD: parseInt(input),
    MXN: input * exchangeResponse.conversion_rates.MXN,
    JPY: input * exchangeResponse.conversion_rates.JPY
  }
  console.log(exchangeRateList)
  return exchangeRateList
}



function displayRate(exchange) {
  console.log(exchange)
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function () {
  $('#exchangeButton').click(function () {
    let input = $('#numberInput').val();
    clearFields();

    ExchangeRateService.getExchangeRate()
      .then(function (exchangeResponse) {
        if (exchangeResponse instanceof Error) {
          throw Error(`exchange API error: ${exchangeResponse.message}`);
        }
        let logic = exchangeLogic(input, exchangeResponse);
        displayRate(logic);


      })
      .catch(function (error) {
        displayErrors(error.message);
      });

  });
});