
/**
  *
  * `phone-input`
  *
  *
  *   Custom phone-input with a prefix icon.
  *
  *
  *
  *   @customElement
  *   @polymer
  *   @demo demo/index.html
  *
  *
  **/


import {AppElement, html} from '@longlost/app-element/app-element.js';
import {consumeEvent}     from '@longlost/utils/utils.js';
import htmlString         from './phone-input.html';
import '@longlost/app-icons/app-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/gold-phone-input/gold-phone-input.js';


class PhoneInput extends AppElement {
  static get is() { return 'phone-input'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      focused: Boolean,

      placeholder: String,

      value: String

    };
  }


  __focusedChanged(event) {
    this.focused = event.detail.value;
  }


  __valueChanged(event) {
    consumeEvent(event);

    this.fire('value-changed', {value: event.detail.value.trim()});
  }
  
}

window.customElements.define(PhoneInput.is, PhoneInput);
