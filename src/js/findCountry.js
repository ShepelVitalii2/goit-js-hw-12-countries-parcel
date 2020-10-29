import debounce from 'lodash.debounce';

import countryCard from '../templates/country-card.hbs'
import countriesList from "../templates/countries-list.hbs";
import getRefs from "./getRefs.js";
import API from './fetchCountries';

import { error, info } from "@pnotify/core";

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();
refs.input.addEventListener('input', debounce(onInputFill, 500));

function onInputFill(e) {
    e.preventDefault();
    const form = e.target;
    const searchQuery = refs.input.value;

    API.fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        .finally(() => form.reset);
}

function onFetchError() {
    alert('Я извиняюсь, но что то пошло не так, как хотелось тому, кто очень хотел, что бы сдесь все работало...');
}

function renderCountryCard(countries) {
    if (countries.length >= 10) {
        toMuchCountriesMessage();
    } else if
        (countries.length < 10 && countries.length > 1) {
            refs.cardContainer.innerHTML = countriesList(countries);
    } else if
        (countries.length === 1) {
            refs.cardContainer.innerHTML = countryCard(countries[0]);
    } else {
        noCountryFoundMessage()
    }
    
}

function toMuchCountriesMessage() {
 
    error({
      title: 'Шось багато виходить країн',
      text: 'Зробіть точніший запит=)',
      delay: 2500,
    closerHover: true,
    },);
}

function noCountryFoundMessage() {

    info({
        title: 'Клавіатура вам не піаніно',
      text: 'Того що ви надрукували, не існує ;)',
      delay: 2500,
    closerHover: true,
    })
}
