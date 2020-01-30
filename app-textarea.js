
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
  *    icon - <String> <iron-icon> 'icon' property binding.
  *
  *
  * @implements InputMixin
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  *
  **/


import {html}       from '@longlost/app-element/app-element.js';
import {InputMixin} from './input-mixin.js';
import htmlString   from './app-textarea.html';
import '@polymer/paper-input/paper-textarea.js';
import './icon-prefix-input.js';
import './input-icons.js';


class AppTextarea extends InputMixin() {
  static get is() { return 'app-textarea'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      icon: {
        type: String,
        value: 'input-icons:subject'
      },

      // Overwrite mixin prop.
      label: {
        type: String,
        value: 'Notes'
      }

    };
  }

}

window.customElements.define(AppTextarea.is, AppTextarea);
