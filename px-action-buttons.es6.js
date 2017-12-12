(function() {
  Polymer({

    is: 'px-action-buttons',

    properties: {
      /**
       * Action buttons to display below the description/copy text.
       * Please refer to px-dropdown (https://github.com/PredixDev/px-dropdown) for a list of supported properties
       */
      actionButtons: {
        type: Object,
        value: {},
        observer: '_actionButtonsChanged'
      }
    },
    /**
     * Attach event listeners for dropdown action buttons.
     */
    attached() {
      this.listen(this, 'px-dropdown-selection-changed', '_itemSelected');
    },
    /**
     * Detach event listeners for dropdown action buttons.
     */
    detached() {
      this.unlisten(this, 'px-dropdown-selection-changed', '_itemSelected');
    },
    /**
     * Observer when actionButtons changes.  
     * Sets flag _isDropdown true if actionButtons size is greater than 3, false otherwise.
     * If _isDropdown === true it will update px-dropdown options menu
     */
    _actionButtonsChanged() {
      // set _notifyActionChange false to prevent firing px-dropdown-selection-changed while updating the new set of buttons
      this._notifyActionChange = false;
      this._isDropdown = this.actionButtons && this.actionButtons.items && this.actionButtons.items.length > 3;
      if(this._isDropdown) {
        this.async(function() {
          let pxDropdown = this.$$('#pxDropdown');
          if(!this.actionButtons.multi) {
            // remove selected if passed on when is not multi selection
            for(var x in this.actionButtons.items) {
              delete this.actionButtons.items[x].selected;
            }
          }
          for(var key in this.actionButtons) {
            pxDropdown.set(key, this.actionButtons[key]);
          }
          this.async(function() {
            // adjust dropdown to appear aligned to the right
            let dropdown = Polymer.dom(pxDropdown.root).querySelector('#dropdown');
            dropdown.set('horizontalAlign', 'right');
            let button = Polymer.dom(pxDropdown.root).querySelector('#button');
            let pxIcon = Polymer.dom(button).querySelector('px-icon');
            if(pxIcon) {
              pxIcon.style.right = '-6px';
            }
            this._notifyActionChange = true;
          });
        }, 100);
      } else {
        this._notifyActionChange = true;
      }
    },
    /**
     * Callback for on-tap event for action items when the list size is 3 or less
     */
    _onSelected(evt) {
      let item = evt.detail.model || evt.model.item;
      this._handleSelection({
        val: item.val, 
        key: item.key
      });
    },
    /**
     * Callback for selected/unselected action title dropdown items when the list is greater than 3
     */
    _itemSelected(evt) {
      let pxDropdown = this.$$('#pxDropdown');
      if(this.actionButtons.multi || pxDropdown._displayValueSelected === evt.detail.val) {
        this._handleSelection(evt.detail);
      }
    },
    /**
     * Fires px-title-action with selection detail. E.g. {key: "1", val: "Favorite", selected: true}
     */
    _handleSelection(detail) {
      if(this._notifyActionChange) {
        this.fire('px-title-on-action-clicked', detail);
      }
    }
  });
})();
