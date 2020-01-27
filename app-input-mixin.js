
/**
  * `app-input-mixin`
  * 
  *   Common app-input logic.
  *
  *
  *
  *  Properites:
  *
  *  
  *    focused - <Boolean> Underlying Polymer input focused state.
  *
  *
  *    label - <String> Underlying Polymer input label.
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

import {AppElement} 	from '@longlost/app-element/app-element.js';
import {consumeEvent} from '@longlost/utils/utils.js';
import '@longlost/app-shared-styles/app-shared-styles.js';


export const AppInputMixin = () => {
  return class AppInputMixin extends AppElement {


    static get properties() {
      return {

        focused: Boolean,      

	      label: String,
	      
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
