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
        value: false
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
  });
})();
