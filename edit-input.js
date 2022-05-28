
/**
  * `edit-input`
  * 
  *
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  *
  *
  **/

import {AppElement} from '@longlost/app-core/app-element.js';

import {
  getComputedStyle, 
  getRootTarget, 
  warn
} from '@longlost/app-core/utils.js';

import template from './edit-input.html';
import '@longlost/app-core/app-shared-styles.css';
import '@longlost/icon-to-spinner/icon-to-spinner.js';
import '@longlost/pencil-to-check-icon/pencil-to-check-icon.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-ripple/paper-ripple.js';


class EditInput extends AppElement {

  static get is() { return 'edit-input'; }

  static get template() {
    return template;
  }


  static get properties() {
    return {

      icon: String,

      // Fired back to parent to distinguish 
      // between confirm edit events.
      kind: String,

      disabled: {
        type: Boolean,
        value: false
      },

      _darkMode: Boolean,

      _focused: Boolean,

      _invalid: Boolean,

      _minlength: Number,

      _noPaperRipple: Boolean,

      _paperInputNode: Object,

      _raised: Boolean,

      // Controls edit icon state.
      _showCheckButton: {
        type: Boolean,
        computed: '__computeShowCheckButton(_value, _invalid, _minlength)'
      },

      _tabindex: {
        type: Number,
        value: -1,
        computed: '__computeTabindex(_noPaperRipple)'
      },

      _value: String

    };
  }


  static get observers() {
    return [
      '__disabledChanged(disabled)',
      '__showCheckButtonChanged(_showCheckButton, disabled)',
      '__updateTruncateFade(_darkMode)'
    ];
  }


  constructor() {

    super();

    this.__darkModeHandler     = this.__darkModeHandler.bind(this);
    this.__inputFocusedChanged = this.__inputFocusedChanged.bind(this);
    this.__inputInvalidChanged = this.__inputInvalidChanged.bind(this);
    this.__inputValueChanged   = this.__inputValueChanged.bind(this);
    this.__thisClicked         = this.__thisClicked.bind(this);
  }


  connectedCallback() {

    super.connectedCallback();

    this.addEventListener('click', this.__thisClicked);

    this._app      = document.querySelector('#app');
    this._darkMode = this._app.darkMode;

    this._app.addEventListener('app-dark-mode-changed', this.__darkModeHandler);
  }


  disconnectedCallback() {

    super.disconnectedCallback();

    this.__cleanupSlotListeners();

    this._app.removeEventListener('app-dark-mode-changed', this.__darkModeHandler);
    this.removeEventListener('click', this.__thisClicked);
  }


  __computeCheckedClass(noPaperRipple) {

    return noPaperRipple ? 'is-check' : '';
  }


  __computeColor(disabled, invalid, focused) {

    if (disabled) { return 'disabled'; }
    if (invalid)  { return 'invalid';  }
    if (focused)  { return 'focused';  }

    return '';
  }


  __computeEditIconEntry(disabled) {

    return disabled ? '' : 'edit-icon-entry';
  }


  __computeHideFadeClass(focused) {

    return focused ? 'hide-fade' : '';
  }


  __computeShowCheckButton(value, invalid, minlength) {

    // Unrequired inputs can be empty strings.
    if (minlength === 0) {
      return typeof value === 'string' && !invalid;
    }

    // Required inputs cannot be an empty string.
    return value && !invalid;    
  }

  __computeTabindex(noPaperRipple) {

    return noPaperRipple ? 0 : -1;
  }


  __disabledChanged(disabled) {

    if (!disabled)                 { return; }
    if (!this._slottedInput)       { return; }
    if (!this._slottedInput.value) { return; }

    this._slottedInput.value = undefined;
  }


  async __showCheckButtonChanged(showCheck, disabled) {

    try {
      await this.debounce('edit-input-show-check-btn-debouncer', 500);

      if (showCheck && !disabled) {
        this.$.editIcon.toCheck();
        this._noPaperRipple = true;
      }
      else {
        this.$.editIcon.toPencil();
        this._noPaperRipple = false;
      }
    }
    catch (error) {
      if (error === 'debounced') { return; }
      console.error(error);
    }
  }

  __updateTruncateFade() {

    const color = getComputedStyle(this, 'background-color');

    const rgbToRgba = (rgb, alpha = 1) => {

      const [front] = rgb.split(')');

      return `${front}, ${alpha})`;
    };

    this.updateStyles({
      '--input-truncate-base': rgbToRgba(color, 1),
      '--input-truncate-fade': rgbToRgba(color, 0)
    });
  }


  __darkModeHandler(event) {

    this._darkMode = event.detail.value;
  }


  __cleanupSlotListeners() {

    if (this._slottedInput) {      
      this._slottedInput.removeEventListener('focused-changed', this.__inputFocusedChanged);
      this._slottedInput.removeEventListener('invalid-changed', this.__inputInvalidChanged);
      this._slottedInput.removeEventListener('value-changed',   this.__inputValueChanged);

      this._slottedInput = undefined;
    }
  }
  

  __slotChangeHandler() {

    this.__cleanupSlotListeners();

    this._slottedInput = this.slotNodes('#inputSlot').find(node => 
                           node.nodeName !== '#text');

    this._minlength = this._slottedInput.minlength;

    this._slottedInput.addEventListener('focused-changed', this.__inputFocusedChanged);
    this._slottedInput.addEventListener('invalid-changed', this.__inputInvalidChanged);
    this._slottedInput.addEventListener('value-changed',   this.__inputValueChanged);
  }


  __inputFocusedChanged(event) {

    this._focused = event.detail.value;
  }


  __inputInvalidChanged(event) {

    this._invalid = event.detail.value;
  }


  __inputValueChanged(event) {

    const {value} = event.detail;
    this._value   = value;

    this.fire('edit-input-changed', {
      icon:  this.icon,
      kind:  this.kind,
      label: this._slottedInput.label,
      value
    });
  }


  __btnFocusedChanged(event) {

    this._raised = event.detail.value;
  }


  __findPaperInputNode(domNode) {

    const find = node => {

      if (node.nodeName === 'EDIT-INPUT') { 
        return node.firstElementChild; 
      }

      return find(node.offsetParent);
    };

    return find(domNode);
  }


  async __thisClicked(event) {

    try {
      if (this.disabled) { return; }

      const parent = getRootTarget(event);

      await this.clicked();

      const paperInputNode = this.__findPaperInputNode(parent);

      if (!paperInputNode) { return; }

      // Used to remove focus from input (blur).
      this._paperInputNode = paperInputNode; 

      // Double focus calls undo the focus.
      if (paperInputNode.focused) { return; } 

      paperInputNode.focus();
      this.fire('edit-input-clicked');
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }


  async __editButtonClicked(event) {

    try {

      await this.__thisClicked(event);

      if (this._invalid) {
        warn('This input has an invalid format');
        return;
      }

      if (this._noPaperRipple) {
        await this.$.inputIcon.startSpinner();

        this._paperInputNode.blur();
        
        this.fire('edit-input-confirm-edit', {
          icon:        this.icon,
          kind:        this.kind,
          label:       this._slottedInput.label,
          value:       this._value, 
          stopSpinner: this.$.inputIcon.stopSpinner.bind(this.$.inputIcon),
          reset:       () => {
            this._slottedInput.value = null;
            this._value              = null; // `gold-phone-input` bug fix.
          }
        });
      }
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }

}

window.customElements.define(EditInput.is, EditInput);
