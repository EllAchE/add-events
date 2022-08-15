import { setSettings } from '../utils/browserUtils';

export function savePosition() {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    // Show a map centered at latitude / longitude.
    setSettings({ latitude, longitude });
  });
}
