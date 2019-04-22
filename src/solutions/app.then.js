/*
Instructions:
(1) Get the planet data and add the search header.
(2) Create the first thumbnail with createPlanetThumb(data)
(3) Handle errors!
  (a) Pass 'unknown' to the search header.
  (b) console.log the error.
 */

/* jshint esversion: 6 */
(function (document) {
  'use strict'

  var home = null

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader (query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>'
  }

  /**
   * Helper function to create a planet thumbnail.
   * @param  {Object} data - The raw data describing the planet.
   */
  function createPlanetThumb (data) {
    var pT = document.createElement('planet-thumb')
    for (var d in data) {
      pT[d] = data[d]
    }
    home.appendChild(pT)
  }

  /**
   * XHR wrapped in a promise
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get (url) {
    return fetch(url, {
      method: 'get'
    })
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON (url) {
    return get(url).then(function (response) {
      console.log(response)
      return response.json()
    })
  }

  window.addEventListener('WebComponentsReady', function () {
    home = document.querySelector('section[data-route="home"]')
    /*
    Uncomment the next line and start here when you're ready to add the first thumbnail!

    Your code goes here!
     */
    getJSON('../data/earth-like-results.json')
      .then((data) => {
        addSearchHeader(data.query)
        return getJSON(data.results[0])
      })
      .catch(() => {
        throw Error('Search request error')
      })
      .then(createPlanetThumb)
      .catch((error) => {
        console.log(error)
        addSearchHeader('unknown')
      })
  })
})(document)
