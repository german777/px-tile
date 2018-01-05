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
      },
      /**
       * Current text color of overlay to apply other elements when hovering
       */
      hoverTextColor: {
        type: String,
        value: ''
      },
      /**
       * Boolean to find out if items list is in overlay
       */
      isOverlay: {
        type: Boolean,
        value: false
      },
      /**
       * Boolean to display primary button
       */
      isPrimary: {
        type: Boolean,
        value: false
      }
    },
    created() {
      this._maxIcons = 3;
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
     * Sets flag _isDisplayDropdown true if actionButtons size is greater than default items size 3, false otherwise.
     * Sets flag _isDisplayButtons true if actionButtons size is less or equal than default items size 3, false otherwise.
     * If _isDisplayDropdown === true it will update px-dropdown options menu
     */
    _actionButtonsChanged() {
      // set _notifyActionChange false to prevent firing px-dropdown-selection-changed while updating the new set of buttons
      this._notifyActionChange = false;
      //this._isDisplayDropdown = this.actionButtons && this.actionButtons.items && this.actionButtons.items.length > this._maxIcons;
      let actionBtns = JSON.parse(JSON.stringify(this.actionButtons));
      
      let dropdownCount = 0;
      for(let x in actionBtns.items) {
        if(!actionBtns.items[x].isPrimary) {
          dropdownCount++;
        }
      }
      this._isDisplayDropdown = dropdownCount > this._maxIcons;
      
      if(this.isPrimary) {
        this._isDisplayButtons = true;
        this._isDisplayDropdown = false;
      } else if(this._isDisplayDropdown) {
        this.async(function() {
          let pxDropdown = this.$$('#pxDropdown');
          pxDropdown.style.height = '20px';
          for(let x in actionBtns.items) {
            // px-dropdown has key and val
            let item = actionBtns.items[x];
            item.key = item.id || item.key;
            item.val = item.label || item.val;
            delete item.id;
            delete item.label;
            if(!actionBtns.multi) {
              delete item.selected;
            }
          }
          // there are only two options for sortMode and selectBy in px-dropdown
          if(actionBtns.sortMode && actionBtns.sortMode === 'label') {
            actionBtns.sortMode = 'val';
          } else if(actionBtns.sortMode !== 'val') {
            actionBtns.sortMode = 'key';
          }
          if(actionBtns.selectBy && actionBtns.selectBy === 'label') {
            actionBtns.selectBy = 'val';
          } else if(actionBtns.selectBy !== 'val') {
            actionBtns.selectBy = 'key';
          }
          for(let id in actionBtns) {
            pxDropdown.set(id, actionBtns[id]);
          }
          this.async(function() {
            // adjust dropdown to appear aligned to the right
            let dropdown = Polymer.dom(pxDropdown.root).querySelector('#dropdown');
            dropdown.set('horizontalAlign', 'right');
            let button = Polymer.dom(pxDropdown.root).querySelector('#button');
            this.button = button;
            this.pxIcon = Polymer.dom(button).querySelector('px-icon');
            if(this.pxIcon) {
              this.pxIcon.style.right = '-6px';
              if(this.isOverlay) {
                this.pxIcon.style.color = this.hoverTextColor;
              }
            }
            this._notifyActionChange = true;
          });
        }, 100);
      } else {
        this._isDisplayButtons = true;
      }
      this._notifyActionChange = true;
    },
    /**
     * Callback for on-tap event for action items when the list size is 3 or less
     */
    _onSelected(evt) {
      let item = evt.detail.model || evt.model.item;
      this._handleSelection({
        label: item.label, 
        id: item.id
      });
    },
    /**
     * Callback for selected/unselected action title dropdown items when the list is greater than 3
     */
    _itemSelected(evt) {
      let pxDropdown = this.$$('#pxDropdown');
      if(this.actionButtons.multi || pxDropdown._displayValueSelected === evt.detail.val) {
        this._handleSelection({
          label: evt.detail.val, 
          id: evt.detail.key
        });
      }
    },
    /**
     * Fires px-title-action with selection detail. E.g. {"id": "1", "label": "Favorite", "selected": true}
     */
    _handleSelection(detail) {
      if(this._notifyActionChange) {
        this.fire('px-tile-action-tapped', detail);
      }
    },
    /**
     * Return button class type and size if any
     * See https://github.com/PredixDev/px-buttons-design for more details.
     */
    _getBtnClazz(item) {
      let clazzset = this._getBtnSize(item.size);
      clazzset = this._getBtnType(item.type, clazzset);
      if(item.buttonIcon === true) {
        clazzset.push('btn--icon');
      }
      if(item.disabled === true) {
        clazzset.push('btn--disabled');
      }
      if( (this.isPrimary && !item.isPrimary) || (!this.isPrimary && item.isPrimary) ) { 
        clazzset.push('hidden');
      }
      return clazzset.join(" ").trim();
    },
    /**
     * Returns button type class
     */
    _getBtnType(type, array) {
      array = array || [];
      if(type) {
        switch(type.trim()) {
          case 'primary':
            array.push('btn--primary');
            break;
          case 'call to action':
            array.push('btn--call-to-action');
            break;
          case 'tertiary':
            array.push('btn--tertiary');
            break;
          case 'bare':
            array.push('btn--bare');
            if(this.isOverlay) {
              array.push('btn-overlay');
            }
            break;
          case 'bare primary':
            array.push('btn--bare--primary');
            if(this.isOverlay) {
              array.push('btn-overlay');
            } else {
              array.push('btn-tile-bare-primary');
            }
            break;
        }
      }
      return array;
    },
    /**
     * Returns button size class
     */
    _getBtnSize(size, array) {
      array = array || [];
      if(size) {
        switch(size.trim()) {
          case 'small':
            array.push('btn--small');
            break;
          case 'large':
            array.push('btn--large');
            break;
          case 'huge':
            array.push('btn--huge');
            break;
          case 'full':
            array.push('btn--full');
            break;
        }
      }
      return array;
    },
    /**
     * Return style for color.  This property is part of px-button so honor if passed on.
     */
    _getBtnColor(item) {
      let color = '';
      if(item.color) {
        color = 'color: ' + item.color + '; stroke: ' + item.color + '; ';
      }
      return color;
    }
  });
})();
