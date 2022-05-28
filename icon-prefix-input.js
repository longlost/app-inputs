
/**
  * `icon-prefix-input`
  * 
  *   Custom styled element that allows an <iron-icon>
  *   prefix like paper-input's prefix slot.
  *
  *
  *
  *  Properites:
  *
  *  
  *    focused - <Boolean> <iron-icon> focused state.
  *
  *  
  *    icon - <String> required: <iron-icon> 'icon' prop.
  *
  *
  *
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  *
  **/


import {AppElement} from '@longlost/app-core/app-element.js';
import template     from './icon-prefix-input.html';
import '@polymer/iron-icon/iron-icon.js';


class IconPrefixInput extends AppElement {
  
  static get is() { return 'icon-prefix-input'; }

  static get template() {
    return template;
  }


  static get properties() {
    return {

      focused: Boolean,

      icon: String

    };
  }

}

window.customElements.define(IconPrefixInput.is, IconPrefixInput);
