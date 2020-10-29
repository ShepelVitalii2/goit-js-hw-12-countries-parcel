import debounce from 'lodash.debounce';
import countryCardTpl from '../templates/country-card.hbs'
import countriesListTml from "../templates/countries-list.hbs";
import API from './fetchCountries';
import { alert } from "@pnotify/core";
import getRefs from "./getRefs.js";
import err from "./errorMsgGenerator.js";

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

function onFetchError(error) {
    alert(error);
}

function renderCountryCard(countries) {
    if (countries.length >= 10) {
        return err.errorMsgMarkUp();
    }
    if (countries.length < 10 && countries.length > 1) {
        err.hideError();
        refs.cardContainer.innerHTML = countriesListTml(countries);
    }
    if (countries.length === 1) {
        err.hideError();
        const markup = countryCardTpl(countries[0]);
        refs.cardContainer.innerHTML = markup;
    }
}