
/**
  * `shipping-inputs`
  *
  *   Common address shipping inputs.
  *
  *
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  *
  **/

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import htmlString             from './shipping-inputs.html';
import '@longlost/app-core/app-icons.js';
import '@polymer/paper-input/paper-input.js';
import './input-icons.js';
import './edit-input.js';


class ShippingInputs extends PolymerElement {
  static get is() { return 'shipping-inputs'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      data: Object,

      disabled: Boolean,

      // In case name input is redundant (ie. app-account) .
      hideNameInput: Boolean
      
    };
  }


  __computeFullNamePlaceholder(fullName) {
    return fullName && fullName.trim() ? fullName : 'No full name';
  }


  __computeAddress1Placeholder(address) {
    return address && address.trim() ? address : 'No street address, P.O. box, company name, c/o';
  }


  __computeAddress2Placeholder(address) {
    return address && address.trim() ? address : 'No apartment, suite, unit, building, floor, etc.';
  }


  __computeCityPlaceholder(city) {
    return city && city.trim() ? city : 'No city or town';
  }


  __computeStatePlaceholder(state) {
    return state && state.trim() ? state : 'No state, province or region';
  }


  __computeZipPlaceholder(zip) {
    return zip && zip.trim() ? zip : 'No zip or postal code';
  }


  __computeCountryPlaceholder(country) {
    return country && country.trim() ? country : 'No country';
  }

}

window.customElements.define(ShippingInputs.is, ShippingInputs);
