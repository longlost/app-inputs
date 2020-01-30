
/**
  * `InputMixin`
  * 
  *   Common app-input logic.
  *
  *
  *
  *  Properites:
  *
  *
  *    autocomplete - <Boolean> Underlying Polymer input autocomplete.
  *  
  *
  *    autocorrect - <Boolean> Underlying Polymer input autocorrect.
  *
  *
  *    autocapitalize - <Boolean> Underlying Polymer input autocapitalize.
  *
  *  
  *    focused - <Boolean> Underlying Polymer input focused state.
  *
  *
  *    label - <String> Underlying Polymer input label.
  *
  *
  *    placeholder - <String> Underlying Polymer input placeholder.
  *
  *
  *    type - <String> Underlying Polymer input type.
  *
  *
  *    value - <String> Underlying Polymer input value.
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

import {AppElement}   from '@longlost/app-element/app-element.js';
import {consumeEvent} from '@longlost/utils/utils.js';
import '@longlost/app-shared-styles/app-shared-styles.js';


export const InputMixin = () => {
  return class InputMixin extends AppElement {


    static get properties() {
      return {

        autocomplete: {
          type: Boolean,
          value: true
        },

        autocorrect: {
          type: Boolean,
          value: true
        },
        
        autocapitalize: {
          type: Boolean,
          value: true
        },

        focused: Boolean,      

        label: String,

        placeholder: String,

        type: String,
        
        value: String

      };
    }


    __focusedChanged(event) {
      this.focused = event.detail.value;
    }


    __valueChanged(event) {
      consumeEvent(event);

      this.fire('value-changed', event.detail);
    }

  };
};
