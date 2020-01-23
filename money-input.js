
/**
	*
 	* `money-input`
 	*
 	*
 	* 	Formats user input into currency.
 	*
 	*
 	* 	@customElement
 	* 	@polymer
 	* 	@demo demo/index.html
 	*
 	*
 	**/

import {AppElement, html} from '@longlost/app-element/app-element.js';
import {consumeEvent} 		from '@longlost/utils/utils.js';
import htmlString 				from './money-input.html';
import '@longlost/app-shared-styles/app-shared-styles.js';
import '@polymer/paper-input/paper-input.js';


// Removes commas and decimal.
const removeUI = str => {
	return ('' + str).replace(/[^\d]*/g, '');
};


const getDecimal = str => {
  return str.match(new RegExp('(\\d{0,' + 2 + '})$'))[0];
};


class MoneyInput extends AppElement {
  static get is() { return 'money-input'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      // Currency used as field prefix
      currency: {
        type: String,
        value: '$'
      },

      // Disable input.
      disabled: {
        type: Boolean,
        value: false
      },

      // Input label.
      label: {
        type: String,
        value: 'Amount'
      },

      // Placeholder to fill the input field while blank.
      placeholder: String,

      // The suffix symbol or string.
      suffix: {
        type: String,
        value: ''
      },

      // Symbol used to separate number blocks.
      unitSymbol: {
        type: String,
        value: ','
      },

      // Presets field value notifies new values.
      value: Number,
    	
      _formattedValue: {
        type: String,
        computed: '__computeFormattedValue(value)'
      }
           
    };
  }


  static get observers() {
  	return [
  		'__formattedValueChanged(_formattedValue)'
  	];
  }

  // Add commas.
  __markAmount(string) {
    return string.replace(/(0*)(?=[^0]*)/, '').split(/(?=(?:...)*$)/).join(this.unitSymbol);
  }


  __parse(string) {
    const dec = getDecimal(string);
    const reg = new RegExp(dec + '$');
    const beforeDecimal = string.replace(reg, '');

    if (beforeDecimal.length <= 1) {
      return `${beforeDecimal}.${dec}`;
    }

    return `${this.__markAmount(beforeDecimal)}.${dec}`;
  }


  __computeFormattedValue(value) {
    if (value === '000' || value === '') { return; }

    const newValue = removeUI(value);
    const hasTwoZeros = newValue.substring(0, 2);

    if (newValue.length < 3 || hasTwoZeros === '00') {
      const dec = getDecimal(newValue);
      const decNoZeros = dec.replace(/(0*)(?=[^0]*)/, '');

      // Check if needs to add 0 in the end, beginning or both.
      const addedZeros = Array((3 - decNoZeros.length) + 1).join('0') + decNoZeros;

      return this.__parse(removeUI(addedZeros));
    }

    return this.__parse(removeUI(value));
  }


  __formattedValueChanged(value) {
  	this.fire('value-changed', {value});
  }


  __inputValueChanged(event) {
    consumeEvent(event);

    const {value} = event.detail;

    if (this.value && !value) {
      this.value = removeUI(this.value);
    }
    else {
    	this.value = value;
    }
  }
  
}

window.customElements.define(MoneyInput.is, MoneyInput);
