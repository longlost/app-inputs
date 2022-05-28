
/**
  * `app-dropdown`
  * 
  *   Custom styled paper-textarea element that allows an iron-icon prefix icon
  *   just like paper-input.
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

  


// WARNING!
//
//  The current form of this element will fail with errors pertaining
//  to animation errors with the underlaying `paper-dropdown-menu`.
//
//  `paper-dropdown-menu` and `paper-menu-button` require outdated
//  Web Animation polyfills to perform a simple grow/shrink animation.


// TODO: 
//
//      Replace `paper-dropdown-menu` with `grow-shrink-container`




import {InputMixin} from './input-mixin.js';
import template     from './app-dropdown.html';
import '@longlost/app-core/app-icons.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import './icon-prefix-input.js';


class AppDropdown extends InputMixin() {

  static get is() { return 'app-dropdown'; }

  static get template() {
    return template;
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
