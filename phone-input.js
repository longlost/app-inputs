
/**
  *
  * `phone-input`
  *
  *
  *   Custom phone-input with a prefix icon.
  *
  *
  *
  *  Properites:
  *
  *  
  *    icon - <String> <iron-icon> 'icon' property binding.
  *
  *
  *
  *   @implements InputMixin
  *
  *   @customElement
  *   @polymer
  *   @demo demo/index.html
  *
  *
  **/


import {InputMixin} from './input-mixin.js';
import template     from './phone-input.html';
import '@longlost/app-core/app-icons.js';
import '@polymer/gold-phone-input/gold-phone-input.js';
import './icon-prefix-input.js';


class PhoneInput extends InputMixin() {
  
  static get is() { return 'phone-input'; }

  static get template() {
    return template;
  }


  static get properties() {
    return {

      icon: {
        type: String,
        value: 'app-icons:call'
      },

      // Overwrite mixin prop.
      label: {
        type: String,
        value: 'Phone Number'
      }

    };
  }
  
}

window.customElements.define(PhoneInput.is, PhoneInput);
