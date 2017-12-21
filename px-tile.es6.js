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
        value: ''
      },
      /**
       * Subtitle text for the tile.
       */
      subtitle: {
        type: String,
        value: ''
      },
       /**
        * Description information to be displayed underneath tile and subtitle.
        * Default : Only the first ~3 lines of text will be displayed, after which it will be truncated.
        * You can customize this using by adjusting `--px-tile-desc-text-height` SASS variable. (e.g. 1 line = 1 rem,
        * to set to 5 lines truncated, set --px-tile-desc-text-height : 5rem)
       */
      description: {
        type: String,
        value: ''
      },
      /**
       * Description information to be displayed in the overlay of a hoverable card.
       * It has more space to display text content and can be adjusted along with
       * total height of the tile.
       */
      overlayDescription: {
        type: String,
        value: ''
      },
      /**
       * Single action button to display on the title section right side. 
       * 
       * See ` px-buttons-design ` https://www.predix-ui.com/#/css/visual/buttons/px-buttons-design for more details
       * 
       * `style` is an additionally property from px-tile (E.g. background-color: red; margin-left: 4px; others..) 
       * 
       * Examples:
       * 
       * Default button with icon and color ` {"key":"101","val":"Favorite","icon":"px-nav:favorite", "color": "orange"} ` 
       * 
       * Default button and icon ` {"key":"101","val":"Favorite","icon":"px-nav:favorite"} ` 
       * 
       * Small button and icon ` {"key":"101","val":"Favorite","size":"btn--small","icon":"px-nav:favorite"} ` 
       * 
       * Bare small button with icon and text `  {"key":"101","val":"Favorite","size":"btn--small","type":"btn--bare","icon":"px-nav:favorite"} `  
       * 
       * Bare small button with just text  ` {"key":"101","val":"Favorite","size":"btn--small","type":"btn--bare"} `   
       * 
       * Bare small button with just icon and some margin on the right `  {"key":"101","size":"btn--small","type":"btn--icon","icon":"px-nav:favorite", "style": "margin-right: 5px;"} `
       * 
       * Bare small button with just icon `  {"key":"101","size":"btn--small","type":"btn--icon","icon":"px-nav:favorite"} ` 
       */
      titleActionButton: {
        type: Object,
        value: {}
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
       * Only icons:  ` {"items":[{"key":"1","size":"btn--small","type":"btn--bare btn--icon","icon":"px-utl:link"},{"key":"2","size":"btn--small","type":"btn--bare btn--icon","icon":"px-utl:copy"},{"key":"3","size":"btn--small","type":"btn--bare btn--icon","icon":"px-utl:download"}]} ` 
       * 
       * Small buttons:  ` {"items":[{"key":"1","val":"Link","size":"btn--small"},{"key":"2","val":"Copy","size":"btn--small"},{"key":"3","val":"Download","size":"btn--small"}]} ` 
       * 
       * Small buttons with icons:  ` {"items":[{"key":"1","val":"Link","size":"btn--small","icon":"px-utl:link"},{"key":"2","val":"Copy","size":"btn--small","icon":"px-utl:copy"},{"key":"3","val":"Download","size":"btn--small","icon":"px-utl:download"}]} ` 
       * 
       * Buttons with text only:  ` {"items":[{"key":"1","val":"Link","size":"btn--small","type":"btn--bare--primary", "style":"margin-right: -15px;"},{"key":"2","val":"Copy","size":"btn--small","type":"btn--bare--primary"},{"key":"3","val":"Download","size":"btn--small","type":"btn--bare--primary"}]} ` 
       * 
       * 
       * 
       * Example when items > 3:  
       * 
       * ` {"items":[{"key":"1","val":"Edit","icon":"px-utl:edit","selected":true},{"key":"2","val":"Copy","icon":"px-utl:copy"},{"key":"3","val":"Remove","icon":"px-vis:trash-series"},{"key":"4","val":"Notification","icon":"px-nav:notification"}],"sortMode":"key","buttonStyle":"icon","icon":"px-nav:more","displayValue":"Select","disabled":false,"disableClear":false,"hideChevron":true,"multi":false,"searchMode":false} ` 
       * 
       * Event fired on item selection:
       * 
       * `px-title-on-action-clicked`
       * 
       */
      actionButtons: {
        type: Object,
        value: {},
        observer: '_actionButtonsChanged'
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
     * On change callback for actionButtons
     */
    _actionButtonsChanged() {
      this._hasActionButtons = this.actionButtons &&  this.actionButtons.items !== undefined &&  this.actionButtons.items.length > 0;
    },
    /**
     * Returns true if either title, subtitle, titleActionButtonKey, or actionButtons exist
     */
    _hasData(title, subtitle, titleActionButtonKey, actionButtons) {
      return (actionButtons && actionButtons.items && actionButtons.items.length > 0) || 
        this._hasTitleSubtitleAndActionBtn(title, subtitle, titleActionButtonKey);
    },
    /**
     * Returns true if either title, subtitle, or titleActionButtonKey exist
     */
    _hasTitleSubtitleAndActionBtn(title, subtitle, titleActionButtonKey) {
      subtitle = subtitle || '';
      if(title || subtitle || titleActionButtonKey) {
        return subtitle.trim().length > 0 || this._hasTitleAndActionBtn(title, titleActionButtonKey);
      }
      return false;
    },
    /**
     * returns if either title or titleActionButtonKey exist
     */
    _hasTitleAndActionBtn(title, titleActionButtonKey) {
      title = title || '';
      if(title || titleActionButtonKey) {
        return title.trim().length > 0 || titleActionButtonKey !== undefined;
      }
      return false;
    }
    /**
     * @event px-title-on-action-clicked  
     * 
     * Event ` px-title-on-action-clicked ` is fired when an item is selected from either titleActionButton or actionButtons with selection detail. E.g. {key: "1", val: "Favorite"}
     * 
     * Example:
     *  
     * ` window.addEventListener('px-title-on-action-clicked', function(evt){ ` 
     * 
     * `    console.log(evt.detail); ` 

     * ` }); `
     */
  });
})();
