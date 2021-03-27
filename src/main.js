import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './services/player-lookup-service.js';

function clearFields() {
  $('#playerName').val("");
  $('.show-errors').text("");
}

function exchangeLogic(input, exchangeResponse) {

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
        exchangeLogic(input, exchangeResponse);
        displayRate(exchangeResponse);


      })
      .catch(function (error) {
        displayErrors(error.message);
      });

  });
});