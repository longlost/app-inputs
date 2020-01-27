
/**
  *
  * `qty-input`
  *
  *
  *   Custom quantity input with increment/decrement icon buttons.
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
import {clamp}            from '@longlost/lambda/lambda.js';
import {consumeEvent}     from '@longlost/utils/utils.js';
import htmlString         from './qty-input.html';
import '@longlost/app-icons/app-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';


class QtyInput extends AppElement {
  static get is() { return 'qty-input'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      focused: Boolean,

      increment: {
        type: Number,
        value: 1
      },

      max: {
        type: Number,
        value: 100
      },

      min: {
        type: Number,
        value: 0
      },

      placement: {
        type: String,
        value: 'top'
      },

      qty: {
        type: Number,
        value: 0
      },

      roundTo: {
        type: Number,
        value: 1
      },

      _decreaseIcon: {
        type: String,
        value: 'app-icons:arrow-drop-down'
      },
      
      _increaseIcon: {
        type: String,
        value: 'app-icons:arrow-drop-up'
      }
 
    };
  }
  

  static get observers() {
    return [
      '__quantityChanged(qty)'
    ];
  }
 
  // Based on placement prop.
  __computeWrapperClass(placement) {
    if (placement === 'top')    { return 'buttons-top-and-bottom'; }
    if (placement === 'center') { return 'buttons-left-and-right'; }
    if (placement === 'right')  { return 'buttons-right'; }
  }

  
  __computeIconClass(placement) {

    if (placement === 'center') { 
      return 'icon-margin-for-left-and-right'; 
    }

    return 'icon-margin-for-center';
  }


  __computeMaxLength(max) {
    if (!max) { return; }

    return max.toString().length;    
  }


  __computeDisableButtons(max, min) {
    return max < min;
  }


  __quantityChanged(value) {
    this.fire('value-changed', {value});
  }
 

  __qtyInputChanged(event) {
    consumeEvent(event);

    const {value} = event.detail;

    if (value === undefined) { return; }

    this.qty = Number(value);
  }


  __focusedChanged(event) {
    const {value} = event.detail;

    this.focused = value;

    if (value) {
      this.qty = undefined;
      return;
    }

    if (this.qty === undefined) { 
      this.qty = this.min; 
    }

    const rounded = Math.round(this.qty / this.roundTo) * this.roundTo;
    this.qty      = clamp(this.min, this.max, rounded);
  }

  
  async __incrementQtyButtonClicked() {
    try {
      await this.click();
      const temp = this.qty + this.increment;

      if (temp >= this.max) { 
        this.qty = this.max;
        return; 
      }

      this.qty = temp;
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }

  
  async __decrementQtyButtonClicked() {
    try {
      await this.click();
      const temp = this.qty - this.increment;

      if (temp <= this.min) { 
        this.qty = this.min;
        return; 
      }

      const rounded = Math.round(temp / this.roundTo) * this.roundTo;
      this.qty      = clamp(this.min, this.max, rounded);
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }

}

window.customElements.define(QtyInput.is, QtyInput);
