import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './services/exchange-rate-lookup-service.js';

function exchangeLogic(input, exchangeResponse) {
  input = parseInt(input);
  var sixExchangeRateList = {
    USD: input,
    MXN: (input * exchangeResponse.conversion_rates.MXN).toFixed(2),
    JPY: (input * exchangeResponse.conversion_rates.JPY).toFixed(2),
    CAD: (input * exchangeResponse.conversion_rates.CAD).toFixed(2),
    EUR: (input * exchangeResponse.conversion_rates.EUR).toFixed(2),
    INR: (input * exchangeResponse.conversion_rates.INR).toFixed(2),
    KRW: (input * exchangeResponse.conversion_rates.KRW).toFixed(2),
  };
  return sixExchangeRateList;
}

function displayRates(exchange) {
  $(".mxn-response").text(`$ ${exchange.MXN}`);
  $(".jpn-response").text(`¥ ${exchange.JPY}`);
  $(".cad-response").text(`$ ${exchange.CAD}`);
  $(".eur-response").text(`€ ${exchange.EUR}`);
  $(".inr-response").text(`₹ ${exchange.INR}`);
  $(".krw-response").text(`₩ ${exchange.KRW}`);
}

function extraLogic(input, input2, exchangeResponse) {
  input2 = input2.toUpperCase();
  for (const [key, value] of Object.entries(exchangeResponse)) {
    if (input2 === key) {
      return (value * input).toFixed(2);
    }
  }
}

function displayExtra(value, input, input2) {
  if (isNaN(value)) {
    $(".show-extra").text(`${input2.toUpperCase()} is not a recognized country code, please try again.`);
  } else {
    $(".show-extra").text(`$${input} is ${value} in ${input2.toUpperCase()}`);
  }
}

function displayApiErrors(error) {
  $('.show-errors').text(`${error}`);
  $('#showHideMagic').hide();
}

function displayInputErrors() {
  $('.show-errors').text("This is not a recognized number, try typing in digits!");
  $('#showHideMagic').hide();
}

$(document).ready(function () {
  $('#exchangeButton').click(function () {
    let input = $('#numberInput').val();
    $("#showHideMagic").show();

    if (isNaN(input)) {
      displayInputErrors();
    } else {
      ExchangeRateService.getExchangeRate()
        .then(function (exchangeResponse) {
          if (exchangeResponse instanceof Error) {
            throw Error(`exchange API error: ${exchangeResponse.message}`);
          }

          //displays 6 common currencies
          let orginalExchangeLogic = exchangeLogic(input, exchangeResponse);
          displayRates(orginalExchangeLogic);

          //extra currency logic
          $('#extraButton').click(function () {
            let input2 = $('#letterInput').val();
            let extraExchangeValue = extraLogic(input, input2, exchangeResponse.conversion_rates);
            displayExtra(extraExchangeValue, input, input2);
          });

        })
        .catch(function (error) {
          displayApiErrors(error.message);
        });
    }
  });
});