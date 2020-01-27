
/**
  *
  * `phone-input`
  *
  *
  *   Custom phone-input with a prefix icon.
  *
  *
  *
  *   @implements AppInputMixin
  *
  *   @customElement
  *   @polymer
  *   @demo demo/index.html
  *
  *
  **/


import {html}          from '@longlost/app-element/app-element.js';
import {AppInputMixin} from './app-input-mixin.js';
import htmlString      from './phone-input.html';
import '@longlost/app-icons/app-icons.js';
import '@polymer/gold-phone-input/gold-phone-input.js';
import './icon-prefix-input.js';


class PhoneInput extends AppInputMixin() {
  static get is() { return 'phone-input'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      icon: {
        type: String,
        value: 'app-icons:call'
      },

      label: {
        type: String,
        value: 'Phone Number'
      },

      placeholder: String

    };
  }
  
}

window.customElements.define(PhoneInput.is, PhoneInput);
