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
        value: 'Title'
      },
      /**
       * Subtitle text for the tile.
       */
      subtitle: {
        type: String,
        value: 'Subtitle text'
      },
       /**
        * Description information to be displayed underneath tile and subtitle.
        * Default : Only the first ~3 lines of text will be displayed, after which it will be truncated.
        * You can customize this using by adjusting `--px-tile-desc-text-height` SASS variable. (e.g. 1 line = 1 rem,
        * to set to 5 lines truncated, set --px-tile-desc-text-height : 5rem)
       */
      description: {
        type: String,
        value: 'Description'
      },
      /**
       * Description information to be displayed in the overlay of a hoverable card.
       * It has more space to display text content and can be adjusted along side with
       * total height of the tile
       */
      overlayDescription: {
        type: String,
        value: 'Overlay description'
      },
      /**
       * Single action button to display on the title section right side. 
       * 
       * See https://github.com/PredixDev/px-buttons-design 
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
       * Bare small button with just icon and some margin on the right `  {"key":"101","size":"btn--small","type":"btn--bare","icon":"px-nav:favorite", "style": "margin-right: 5px;"} `
       * 
       * Bare small button with just icon `  {"key":"101","size":"btn--small","type":"btn--icon","icon":"px-nav:favorite"} ` 
       */
      titleActionButton: {
        type: Object,
        value: {}
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
    }
    /**
     * Fires px-title-on-action-clicked with selection detail. E.g. {key: "1", val: "Favorite", selected: true}
     * @event px-title-on-action-clicked  
     */
  });
})();
