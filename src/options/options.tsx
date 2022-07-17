import React, { ReactElement } from 'react';
import { render } from 'react-dom';

const defaultSettings = Object.freeze({
  border: false,
  background: false,
});
const generalSection = document.getElementById('generalOptionsWrapper');

function updateSetting(key: string, value: string | number | boolean) {
  chrome.storage.local.get('settings', ({ settings }) => {
    chrome.storage.local.set({
      settings: {
        ...settings,
        [key]: value,
      },
    });
  });
}

function createOption(
  settingKey: string,
  settingsObject: { [x: string]: any },
  wrapper: HTMLElement
) {
  const settingWrapper = document.createElement('div');
  settingWrapper.classList.add('setting-item');
  settingWrapper.innerHTML = `
    <div class="label-wrapper">
      <label for="${settingKey}" id="${settingKey}Desc">
        ${chrome.i18n.getMessage(`setting${settingKey}`)}
      </label>
    </div>
  
    <input type="checkbox" ${
      settingsObject[settingKey] ? 'checked' : ''
    } id="${settingKey}" />
    <label for="${settingKey}"
      tabindex="0"
      role="switch"
      aria-checked="${settingsObject[settingKey]}"
      aria-describedby="${settingKey}-desc"
      class="is-switch"
    ></label>
    `;

  const toggleSwitch = settingWrapper.querySelector('label.is-switch');
  const input = settingWrapper.querySelector('input');

  input.onchange = () => {
    toggleSwitch.setAttribute(
      'aria-checked',
      input.checked as unknown as string
    );
    updateSetting(settingKey, input.checked);
  };

  (toggleSwitch as HTMLElement).onkeydown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      (toggleSwitch as HTMLElement).click();
    }
  };

  wrapper.appendChild(settingWrapper);
}

chrome.storage.local.get('settings', ({ settings }) => {
  const options = settings ?? defaultSettings; // Fall back to default if settings are not defined
  if (!settings) {
    chrome.storage.local.set({
      settings: defaultSettings,
    });
  }

  // Create and display options
  const generalOptions = Object.keys(options).filter(
    (x) => !x.startsWith('advanced')
  );

  generalOptions.forEach((option: string) =>
    createOption(option, options, generalSection)
  );
});

function Settings(): ReactElement {
  return <div>Settings Page</div>;
}

render(<Settings />, document.getElementById('options_ce'));
