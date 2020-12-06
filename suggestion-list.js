
/**
  * `suggestion-list`
  * 
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  *
  *
  **/


import {AppElement, html} from '@longlost/app-core/app-element.js';
import {schedule, wait}   from '@longlost/app-core/utils.js';
import htmlString         from './suggestion-list.html';
import '@longlost/app-core/app-icons.js';
import '@longlost/app-core/app-shared-styles.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';


class SuggestionList extends AppElement {
  static get is() { return 'suggestion-list'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      // Maximum number of suggestion items to show.
      // Test on small mobile when changing this
      // to more than 10.
      max: {
        type: Number,
        value: 10
      },

      // List input.
      suggestions: Array,

      // Decoupled from suggestion input.
      // This is used to keep the listbox filled with dom
      // items until the close animation has completed.
      _cached: Array,

      _closeBusy: Boolean,

      // Directly drives template 'dom-repeat'.
      _items: {
        type: Array,
        computed: '__computeItems(_cached, max)'
      },

      _openBusy: Boolean

    };
  }


  static get observers() {
    return [
      '__suggestionsChanged(suggestions)'
    ];
  }


  __computeItems(cached, max) {
    if (!Array.isArray(cached)) { return; }

    if (typeof max !== 'number') {
      throw new TypeError(`'max' must be a number.`);
    }

    return cached.slice(0, max);
  }


  __suggestionsChanged(suggestions) {

    if (Array.isArray(suggestions) && suggestions.length > 0) {
      this._cached = [...suggestions];
    }
    else {
      this.close();
    }
  }


  async __closeBtnClicked() {
    try {
      await this.clicked();
      await this.close();
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }


  async __itemClicked(event) {
    try {
      await this.clicked();
      await this.close();

      const {index, item} = event.model;

      this.fire('suggestion-selected', {
        index,
        selected: item
      });
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }


  async __domChanged() {
    try {
      await this.debounce('suggestion-list-dom-debounce', 100);

      const items = this.selectAll('.item');

      if (
        !Array.isArray(items) || 
        !Array.isArray(this.suggestions)
      ) { return; }

      if (        
        items.length === this.suggestions.length &&
        items.length > 0
      ) {
        this.__open();
      }
    }
    catch (error) {
      if (error === 'debounced') { return; }
      console.error(error);
    }
  }


  async __open() {
    if (this._openBusy) { return; }

    this._openBusy = true;
    this.style['display'] = 'block';
    this.$.xWrapper.classList.remove('delay');
    this.$.yWrapper.classList.add('delay');
    this.$.listbox.classList.add('list-delayed-transition');

    await schedule();

    this.$.xWrapper.classList.add('open-list');
    this.$.yWrapper.classList.add('open-list');
    this.$.listbox.classList.add('open-list');

    await wait(250);

    this._openBusy = false;
  }


  async close() {
    if (this._closeBusy) { return; }

    this._closeBusy = true;    
    this.$.listbox.classList.remove('list-delayed-transition');
    this.$.listbox.classList.remove('open-list');
    this.$.xWrapper.classList.add('delay');
    this.$.yWrapper.classList.remove('delay');

    await wait(200);

    this.$.yWrapper.classList.remove('open-list');
    this.$.xWrapper.classList.remove('open-list');

    await wait(250);

    this.style['display'] = 'none';
    this._cached    = undefined;
    this._closeBusy = false;
  }

}

window.customElements.define(SuggestionList.is, SuggestionList);
