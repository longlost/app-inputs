
/**
  * `suggestion-input`
  * 
  *
  * @implements InputMixin
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  *
  *
  **/


import {InputMixin} from './input-mixin.js';
import template     from './suggestion-input.html';
import '@polymer/paper-input/paper-input.js';
import './suggestion-list.js';


class SuggestionInput extends InputMixin() {

  static get is() { return 'suggestion-input'; }

  static get template() {
    return template;
  }


  static get properties() {
    return {

      // Maximum number of suggestion items to show.
      // Test on small mobile when changing this
      // to more than 10.
      maxSuggestions: {
        type: Number,
        value: 10
      },

      suggestions: Array

    };
  }


  closeSuggestions() {

    return this.$.list.close();
  }

}

window.customElements.define(SuggestionInput.is, SuggestionInput);
