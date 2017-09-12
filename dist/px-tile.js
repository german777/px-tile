'use strict';(function(){Polymer({is:'px-tile',properties:{/**
       * If true, hovering over the card will cause an overlay to appear
       * with more detailed information, including the description
       * and an optional slot for showing a footer at the bottom.
       */hoverable:{type:Boolean,value:false},/**
       * Whether the tile is currently being hovered.
       */_hovered:{type:Boolean,value:false},/**
       * Main text label for the tile.
       */title:{type:String,value:'Title'},/**
       * Additional information to be displayed in the overlay of a hoverable card.
       * Only the first ~6 lines of text will be displayed, after which it will be truncated.
       */description:{type:String,value:'Description'}},/**
     * Method used internally for flipping the hovered status of a tile.
     */_hover:function _hover(){if(this.hoverable){this._hovered=!this._hovered}},/**
     * Attach event listeners for hoverable tiles.
     */attached:function attached(){this.listen(this.$.overlay,'mouseenter','_hover');this.listen(this.$.overlay,'mouseleave','_hover')},/**
     * Detach event listeners for hoverable tiles.
     */detached:function detached(){this.unlisten(this.$.overlay,'mouseenter');this.unlisten(this.$.overlay,'mouseleave')},/**
     * Returns class to control overlay for hoverable tiles.
     */_getClass:function _getClass(hovered){return hovered?'hovered':''}})})();
//# sourceMappingURL=px-tile.js.map
