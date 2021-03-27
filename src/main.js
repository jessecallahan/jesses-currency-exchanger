import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './services/exchange-rate-lookup-service.js';

function clearFields() {
  $('#numberInput').val("");
  $('.show-errors').text("");
}

function exchangeLogic(input, exchangeResponse) {
  input = parseInt(input)
  var exchangeRateList = {
    USD: input,
    MXN: `$ ${(input * exchangeResponse.conversion_rates.MXN).toFixed(2)}`,
    JPY: `¥ ${(input * exchangeResponse.conversion_rates.JPY).toFixed(2)}`,
    CAD: `$ ${(input * exchangeResponse.conversion_rates.CAD).toFixed(2)}`,
    EUR: `€ ${(input * exchangeResponse.conversion_rates.EUR).toFixed(2)}`,
    INR: `₹ ${(input * exchangeResponse.conversion_rates.INR).toFixed(2)}`,
    KRW: `₩ ${(input * exchangeResponse.conversion_rates.KRW).toFixed(2)}`,
  };
  return exchangeRateList;
}

function displayRate(exchange) {
  $(".mxn-response").text(exchange.MXN);
  $(".jpn-response").text(exchange.JPY);
  $(".cad-response").text(exchange.CAD);
  $(".eur-response").text(exchange.EUR);
  $(".inr-response").text(exchange.INR);
  $(".krw-response").text(exchange.KRW);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function () {
  $('#exchangeButton').click(function () {
    let input = $('#numberInput').val();
    $("#showHideMagic").show();
    clearFields();

    if (isNaN(input)) {
      $('.show-errors').text("This is not a recognized number, try typing in digits!");
      $('#showHideMagic').hide();
    } else {
      ExchangeRateService.getExchangeRate()
        .then(function (exchangeResponse) {
          if (exchangeResponse instanceof Error) {
            throw Error(`exchange API error: ${exchangeResponse.message}`);
          }
          console.log(exchangeResponse.conversion_rates);
          let logic = exchangeLogic(input, exchangeResponse);
          displayRate(logic);


        })
        .catch(function (error) {
          displayErrors(error.message);
        });
    }
  });
});