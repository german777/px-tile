(function() {
  Polymer({

    is: 'px-tile',

    properties: {
      /**
       * If true, hovering over the card will cause an overlay to appear
       * with more detailed information, including the description
       * and an optional slot for showing a footer at the bottom.
       */
      hoverable: {
        type: Boolean,
        value: false,
        observer: '_hoverableChanged'
      },
      /**
       * Whether the tile is currently being hovered.
       */
      _hovered: {
        type: Boolean,
        value: false
      },
      /**
       * Main text label for the tile.
       */
      title: {
        type: String,
        value: '',
        observer: '_onDataChanged'
      },
      /**
       * Subtitle text for the tile.
       */
      subtitle: {
        type: String,
        value: '',
        observer: '_onDataChanged'
      },
       /**
        * Description information to be displayed underneath tile and subtitle.
        * Default : Only the first ~3 lines of text will be displayed, after which it will be truncated.
        * You can customize this using by adjusting `--px-tile-desc-text-height` SASS variable. (e.g. 1 line = 1 rem,
        * to set to 5 lines truncated, set --px-tile-desc-text-height : 5rem)
       */
      description: {
        type: String,
        value: '',
        observer: '_onDataChanged'
      },
      /**
       * Description information to be displayed in the overlay of a hoverable card.
       * It has more space to display text content and can be adjusted along with
       * total height of the tile.
       */
      overlayDescription: {
        type: String,
        value: '',
        observer: '_onDataChanged'
      },
      /**
       * Action buttons display below description.
       * 
       * When items <= 3 will display the buttons/text inline.
       * 
       * Please refer to ` px-buttons-design ` (https://www.predix-ui.com/#/css/visual/buttons/px-buttons-design) for more details
       * 
       * When items > 3 will display the list of elements in a dropdown.
       * 
       * Please refer to ` px-dropdown ` (https://www.predix-ui.com/#/elements/px-dropdown) for more details
       * 
       *  `style` is an additionally property from px-tile (E.g. background-color: red; margin-left: 4px; others..). See example "Buttons with text only" below
       * 
       * Some examples when items <= 3:
       * 
       * Only icons:  ` {"items":[{"id":"1","size":"small","type":"bare","buttonIcon":true,"icon":"px-utl:link"},{"id":"2","size":"small","type":"bare","buttonIcon":true,"icon":"px-utl:copy"},{"id":"3","size":"small","type":"bare","buttonIcon":true,"icon":"px-utl:download"}]} ` 
       * 
       * Small buttons:  ` {"items":[{"id":"1","label":"Link","size":"small"},{"id":"2","label":"Copy","size":"small"},{"id":"3","label":"Download","size":"small"}]} ` 
       * 
       * Small buttons with icons:  ` {"items":[{"id":"1","label":"Link","size":"small","icon":"px-utl:link"},{"id":"2","label":"Copy","size":"small","icon":"px-utl:copy"},{"id":"3","label":"Download","size":"small","icon":"px-utl:download"}]} ` 
       * 
       * Buttons with text only:  ` {"items":[{"id":"1","label":"Link","size":"small","type":"bare--primary", "style":"margin-right: -15px;"},{"id":"2","label":"Copy","size":"small","type":"bare--primary"},{"id":"3","label":"Download","size":"small","type":"bare--primary"}]} ` 
       * 
       * 
       * 
       * Example when items > 3:  
       * 
       * ` {"items":[{"id":"1","label":"Edit","icon":"px-utl:edit","selected":true},{"id":"2","label":"Copy","icon":"px-utl:copy"},{"id":"3","label":"Remove","icon":"px-vis:trash-series"},{"id":"4","label":"Notification","icon":"px-nav:notification"}],"sortMode":"id","buttonStyle":"icon","icon":"px-nav:more","displayValue":"Select","disabled":false,"disableClear":false,"hideChevron":true,"multi":false,"searchMode":false} ` 
       * 
       * Event fired on item selection:
       * 
       * `px-tile-action-tapped`
       * 
       */
      actionButtons: {
        type: Object,
        value: {},
        observer: '_onDataChanged'
      }
    },
    /**
     * Method used internally for flipping the hovered status of a tile.
     */
    _hover() {
      if(this.hoverable) {
        this._hovered = !this._hovered;
      }
    },
    /**
     * On change callback to remove overlay
     */
    _hoverableChanged() {
      this.$.overlay.classList.add('overlay-remove');
      if(this.hoverable) {
        this.$.overlay.classList.remove('overlay-remove');
        // extract overlay text color to pass to other components
        this._hoverTextColor = window.getComputedStyle(this.$.overlay).color;
      }
    },
    /**
     * Attach event listeners for hoverable tiles.
     */
    attached() {
      this.listen(this.$.overlay, 'mouseenter', '_hover');
      this.listen(this.$.overlay, 'mouseleave', '_hover');
    },
    /**
     * Detach event listeners for hoverable tiles.
     */
    detached() {
      this.unlisten(this.$.overlay, 'mouseenter');
      this.unlisten(this.$.overlay, 'mouseleave');
    },
    /**
     * Returns class to control overlay for hoverable tiles.
     */
    _getClass(hovered) {
      return hovered ? 'hovered' : '';
    },
    /**
     * On change callback for either property to set flags to either show/hide elements on px-tile
     */
    _onDataChanged() {
      let actionBtnsCount = 0;
      if(this.actionButtons) {
        for(let x in this.actionButtons.items) {
          if(this.actionButtons.items[x].isPrimary) {
            this._hasPrimaryBtn = true;
          } else {
            actionBtnsCount++;
          }
        }
      }
      this._hasActionButtons = actionBtnsCount > 0;
      this._hasTitleActionBtn = this.title && this.title.length > 0|| this._hasPrimaryBtn;
      this._hasTitleSubtitleActionBtn = this.subtitle && this.subtitle.length > 0 || this._hasTitleActionBtn;
      this._hasData = this._hasActionButtons || this._hasTitleSubtitleActionBtn;
    }
    /**
     * @event px-tile-action-tapped  
     * 
     * Event ` px-tile-action-tapped ` is fired when an item is selected from actionButtons.items with selection detail. E.g. {"id": "1", "label": "Favorite"}
     * 
     * Example:
     *  
     * ` window.addEventListener('px-tile-action-tapped', function(evt){ ` 
     * 
     * `    console.log(evt.detail); ` 

     * ` }); `
     */
  });
})();
