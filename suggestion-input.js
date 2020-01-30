
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

import {html}       from '@longlost/app-element/app-element.js';
import {InputMixin} from './input-mixin.js';
import htmlString   from './suggestion-input.html';
import '@polymer/paper-input/paper-input.js';
import './suggestion-list.js';


class SuggestionInput extends InputMixin() {
  static get is() { return 'suggestion-input'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      suggestions: Array

    };
  }


  __suggestionSelected(event) {
    this.value = event.detail.selected;
  }


  closeSuggestions() {
    return this.$.list.close();
  }

}

window.customElements.define(SuggestionInput.is, SuggestionInput);
