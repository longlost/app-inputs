
/**
  * `search-input`
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

import {html}                   from '@longlost/app-core/app-element.js';
import {consumeEvent, schedule} from '@longlost/app-core/utils.js';
import {InputMixin}             from './input-mixin.js';
import htmlString               from './search-input.html';
import '@longlost/app-core/app-icons.js';
import '@longlost/app-core/app-shared-styles.css';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import './input-icons.js';
import './custom-search-paper-input.js';
import './suggestion-list.js';


class SearchInput extends InputMixin() {
  static get is() { return 'search-input'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      // Minimum length of 'value' string before 
      // the search button becomes enabled.
      minlength: {
        type: Number,
        value: 2
      },

      // Overwrite mixin prop for custom value.
      placeholder: {
        type: String,
        value: 'Search'
      },

      suggestions: Array,

      // Overwrite mixin prop for custom observer.
      value: {
        type: String,
        observer: '__valueObserver'
      },

      _a11yTarget: Object,

      _clearBtnDisabled: {
        type: Boolean,
        value: true,
        computed: '__computeClearBtnDisabled(value)'
      },

      _searchBtnDisabled: {
        type: Boolean,
        value: true,
        computed: '__computeSearchBtnDisabled(value, minlength)'
      }

    };
  }


  connectedCallback() {
    super.connectedCallback();

    this._a11yTarget = this.$.input;
  }


  __computeClearBtnDisabled(value) {
    return !Boolean(value);
  }


  __computeSearchBtnDisabled(value, minlength) {
    if (value && value.length >= minlength) { return false; }
    return true;
  }


  __valueObserver(newVal, oldVal) {
    if (newVal === oldVal) { return; }

    this.fire('value-changed', {value: newVal});
  }


  async __search() {
    try {

      await this.clicked();

      this.$.input.blur();

      await schedule();
      await this.closeSuggestions();

      this.fire('search', {value: this.value});
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }


  __a11yOnEnter() {
    if (this._searchBtnDisabled) { return; } 
     
    this.__search();
  }


  __searchBtnClicked() {
    this.__search();
  }


  async __clearBtnClicked() {
    try {
      await this.clicked();

      this.$.input.blur();
      this.value = '';
      this.closeSuggestions();

      await schedule();

      this.$.input.focus();
      this.fire('input-cleared');
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.log(error);
    }
  }

  // Overwrite mixin method.
  __valueChanged(event) {
    consumeEvent(event);

    const {value} = event.detail;
    this.value    = value.trim();
  }


  closeSuggestions() {
    return this.$.list.close();
  }

}

window.customElements.define(SearchInput.is, SearchInput);
