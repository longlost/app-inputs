
/**
  * `app-textarea`
  * 
  *   Custom styled paper-textarea element that allows an iron image prefix icon
  *   just like paper-input's.
  *
  *
  *
  *  Properites:
  *
  *  
  *    notes - <String> required: File item notes string value.
  *
  *
  *
  *
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  *
  **/


import {AppElement, html} from '@longlost/app-element/app-element.js';
import {consumeEvent}     from '@longlost/utils/utils.js';
import htmlString         from './app-textarea.html';
import '@longlost/app-shared-styles/app-shared-styles.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-input/paper-textarea.js';
import './input-icons.js';


class AppTextarea extends AppElement {
  static get is() { return 'app-textarea'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      focused: Boolean,

      icon: {
        type: String,
        value: 'input-icons:subject'
      },

      label: {
        type: String,
        value: 'Notes'
      },
      
      value: String,

    };
  }


  __focusedChanged(event) {
    this.focused = event.detail.value;
  }


  __valueChanged(event) {
    consumeEvent(event);

    this.fire('value-changed', event.detail);
  }

}

window.customElements.define(AppTextarea.is, AppTextarea);
