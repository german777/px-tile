'use strict';(function(){Polymer({is:'px-tile',properties:{/**
       * If true, hovering over the card will cause an overlay to appear
       * with more detailed information, including the description
       * and an optional slot for showing a footer at the bottom.
       */hoverable:{type:Boolean,value:false,observer:'_hoverableChanged'},/**
       * Whether the tile is currently being hovered.
       */_hovered:{type:Boolean,value:false},/**
       * Main text label for the tile.
       */title:{type:String,value:'Title'},/**
       * Subtitle text for the tile.
       */subtitle:{type:String,value:'Subtitle text'},/**
        * Description information to be displayed underneath tile and subtitle.
        * Default : Only the first ~3 lines of text will be displayed, after which it will be truncated.
        * You can customize this using by adjusting `--px-tile-desc-text-height` SASS variable. (e.g. 1 line = 1 rem,
        * to set to 5 lines truncated, set --px-tile-desc-text-height : 5rem)
       */description:{type:String,value:'Description'},/**
       * Description information to be displayed in the overlay of a hoverable card.
       * It has more space to display text content and can be adjusted along side with
       * total height of the tile
       */overlayDescription:{type:String,value:'Overlay description'},/**
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
       */titleActionButton:{type:Object,value:{}},/**
       * Action buttons display below description.
       * 
       * When items <= 3 will display the buttons/text inline.
       * 
       * Please refer to px-buttons-design (https://github.com/PredixDev/px-buttons-design) for a list of supported properties
       * 
       * When items > 3 will display the list of elements in a dropdown.
       * 
       * Please refer to px-dropdown (https://github.com/PredixDev/px-dropdown) for a list of supported properties
       * 
       * Example when items = 3:
       * 
       * {"items":[{"key":"1","size":"btn--small","type":"btn--bare btn--icon","icon":"px-utl:link"},{"key":"2","size":"btn--small","type":"btn--bare btn--icon","icon":"px-utl:copy"},{"key":"3","size":"btn--small","type":"btn--bare btn--icon","icon":"px-utl:download"}]}
       * 
       * Example when items > 3:
       * 
       * {"items":[{"key":"1","val":"Edit","icon":"px-utl:edit","selected":true},{"key":"2","val":"Copy","icon":"px-utl:copy"},{"key":"3","val":"Remove","icon":"px-vis:trash-series"},{"key":"4","val":"Notification","icon":"px-nav:notification"}],"sortMode":"key","buttonStyle":"icon","icon":"px-nav:more","displayValue":"Select","disabled":false,"disableClear":false,"hideChevron":true,"multi":false,"searchMode":false}
       * 
       * Event fired on item selection:
       * 
       * `px-title-on-action-clicked`
       */actionButtons:{type:Object,value:{},observer:'_actionButtonsChanged'}},/**
     * Method used internally for flipping the hovered status of a tile.
     */_hover:function _hover(){if(this.hoverable){this._hovered=!this._hovered}},/**
     * On change callback to remove overlay
     */_hoverableChanged:function _hoverableChanged(){this.$.overlay.classList.add('overlay-remove');if(this.hoverable){this.$.overlay.classList.remove('overlay-remove')}},/**
     * Attach event listeners for hoverable tiles.
     */attached:function attached(){this.listen(this.$.overlay,'mouseenter','_hover');this.listen(this.$.overlay,'mouseleave','_hover')},/**
     * Detach event listeners for hoverable tiles.
     */detached:function detached(){this.unlisten(this.$.overlay,'mouseenter');this.unlisten(this.$.overlay,'mouseleave')},/**
     * Returns class to control overlay for hoverable tiles.
     */_getClass:function _getClass(hovered){return hovered?'hovered':''},_actionButtonsChanged:function _actionButtonsChanged(){this._hasActionButtons=this.actionButtons&&this.actionButtons.items!==undefined&&this.actionButtons.items.length>0}/**
     * Fires px-title-on-action-clicked with selection detail. E.g. {key: "1", val: "Favorite", selected: true}
     * @event px-title-on-action-clicked  
     */})})();
//# sourceMappingURL=px-tile.js.map
