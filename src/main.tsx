import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const getEl = (embedSelector: string) => {
  if (typeof embedSelector === 'string') {
    const el = document.querySelector(embedSelector);
    if (!el) {
      // eslint-disable-next-line no-console
      console.warn(`No div matching selector "${embedSelector}"`);
      return null;
    }
    return el;
  }
  return embedSelector;
};

const getCountry = (embedSelector: string) => {
  const el = document.querySelector(embedSelector);
  if (!el) {
    return undefined;
  }
  const elClass: string[] = el.className.split('~');
  if (elClass[0] === 'country') return elClass[1].replaceAll('+', ' ');
  return undefined;
};

const containerCountryEmbed = getEl('[current-gaps-by-country]');
if (containerCountryEmbed) {
  const rootEmbed = ReactDOM.createRoot(containerCountryEmbed);
  const currentURL = window.location;
  const countryCode =
    currentURL.href.split('?')[0].substr(-1) === '/'
      ? currentURL.href.split('?')[0].substr(-4).substring(0, 3)
      : currentURL.href.split('?')[0].substr(-3);
  rootEmbed.render(
    <React.StrictMode>
      <App country={getCountry('[current-gaps-by-country]') || countryCode} />
    </React.StrictMode>,
  );
}
