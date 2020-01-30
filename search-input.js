
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

import {html}                   from '@longlost/app-element/app-element.js';
import {InputMixin}             from './input-mixin.js';
import {consumeEvent, schedule} from '@longlost/utils/utils.js';
import htmlString               from './search-input.html';
import '@longlost/app-icons/app-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import './input-icons.js';
import './suggestion-list.js';


class SearchInput extends InputMixin() {
  static get is() { return 'search-input'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      // Overwrite mixin prop for custom value.
      label: {
        type: String,
        value: 'Search'
      },

      suggestions: Array,

      // Overwrite mixin prop for custom value.
      type: {
        type: String,
        value: 'search'
      },

      // Overwrite mixin prop for custom observer.
      value: {
        type: String,
        observer: '__valueObserver'
      },

      _a11yTarget: Object

    };
  }


  connectedCallback() {
    super.connectedCallback();

    this._a11yTarget = this.$.searchInput;
  }
  

  __computeHideSearchClearButton(value) {
    return value ? '' : 'hide-search-clear-btn';
  }


  __valueObserver(newVal, oldVal) {
    if (newVal === oldVal) { return; }

    this.fire('value-changed', {value: newVal});
  }


  async __search() {
    try {
      if (!this.value || this.value.length < 2) { return; }  

      await this.clicked();

      this.$.searchInput.blur();

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
    this.__search();
  }


  __searchBtnClicked() {
    this.__search();
  }


  async __clearBtnClicked() {
    try {
      await this.clicked();

      this.$.searchInput.blur();
      this.value = '';
      this.closeSuggestions();

      await schedule();

      this.$.searchInput.focus();
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
