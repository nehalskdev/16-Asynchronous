'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}" >
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('afterend', msg);
  // countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbor = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   const data = request.send();
//   console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // render country 1
//     renderCountry(data);

//     // get neightbour country
//     const neightbour = data.borders?.[0];

//     if (!neightbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neightbour}`);
//     const data2 = request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     })
//   });
// };

// getCountryAndNeighbor('UAE');

// Promises

// modern way to do AJAX call

// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   const data = request.send();

const request = fetch('https://restcountries.com/v2/name/india');
console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
// getCountryData('UAE');

// more simplified way

const getCountryData = function (country) {
  // country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}💥💥💥`);
      renderError(`something went wrong 💥💥 ${err.message} . try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('UAE');
});
// getCountryData('biivni');

// building simple promise

const lotteryPromise = new Promise(function (resolve, reject) {
  
  console.log('lottery draw is happeing 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
    resolve('You win 😍');
  } else {
    reject(new Error ('You Lost 😒'));
  }
  }, 2000)
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));


const wait = function (seconds) {

}