
/**
  * `app-dropdown`
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
  * @implements AppInputMixin
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  *
  **/


import {html} 				 from '@longlost/app-element/app-element.js';
import {AppInputMixin} from './app-input-mixin.js';
import htmlString 		 from './app-dropdown.html';
import '@longlost/app-icons/app-icons.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import './icon-prefix-input.js';


class AppDropdown extends AppInputMixin() {
  static get is() { return 'app-dropdown'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      icon: {
        type: String,
        value: 'app-icons:menu'
      },

      label: {
        type: String,
        value: 'Menu'
      }

    };
  }

}

window.customElements.define(AppDropdown.is, AppDropdown);
