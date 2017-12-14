(function() {
  Polymer({

    is: 'px-title-button',

    properties: {
      /**
       * Single action button to display on the title section right side.
       * See https://github.com/PredixDev/px-buttons-design for more details.
       */
      titleActionButton: {
        type: Object,
        value: {},
        observer: '_titleActionButtonChanged'
      },
      /**
       * hovered to add additional class on elements when hovering
       */
      isOverlay: {
        type: Boolean,
        value: false,
        observer: '_isOverlayChanged'
      }
    },
    /**
     * Observer when actionButton changes.
     * Sets _hasTitleActionButton
     */
    _titleActionButtonChanged() {
      this._hasTitleActionButton = (this.titleActionButton && (this.titleActionButton.key || this.titleActionButton.val)) !== undefined;
      this._isOverlayChanged();
    },
    /**
     * Return button class type and size if any
     * See https://github.com/PredixDev/px-buttons-design for more details.
     */
    _getBtnClazz(titleActionButton) {
      let clazz = titleActionButton.size || '';
      clazz = clazz + ' ' + (titleActionButton.type || '');
      return clazz;
    },
    /**
     * Return style for color.  This property is part of px-button so honor if passed on.
     */
    _getBtnColor(titleActionButton) {
      let color = '';
      if(titleActionButton.color) {
        color = 'color: ' + titleActionButton.color + '; stroke: ' + titleActionButton.color + '; ';
      }
      return color;
    },
    /**
     * Callback for title icon
     */
    _onTitleActionSelected() {
      this._handleSelection({
        val: this.titleActionButton.val, 
        key: this.titleActionButton.key
      });
    },
    /**
     * Fires px-title-on-action-clicked with selection detail. E.g. {key: "1", val: "Favorite"}
     * @event px-title-on-action-clicked
     */
    _handleSelection(detail) {
      this.fire('px-title-on-action-clicked', detail);
    },
    /**
     * Callback to set specific classes for overlay container
     */
    _isOverlayChanged() {
      if(this.titleActionButton) {
        this._btnHoveredclass = '';
        if(this.isOverlay) {
          this._btnHoveredclass = 'btn-overlay';
          if(!this.titleActionButton.type) {
            this._btnHoveredclass = '';
          }
        }
      }
    }
  });
})();
