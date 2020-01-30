
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
import htmlString   from './app-dropdown.html';
import '@longlost/app-icons/app-icons.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import './icon-prefix-input.js';


class AppDropdown extends InputMixin() {
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

      // Overwrite mixin prop.
      label: {
        type: String,
        value: 'Menu'
      }

    };
  }

}

window.customElements.define(AppDropdown.is, AppDropdown);
