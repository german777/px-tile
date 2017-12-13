'use strict';(function(){Polymer({is:'px-title-button',properties:{/**
       * Single action button to display on the title section right side.
       * See https://github.com/PredixDev/px-buttons-design for more details.
       */titleActionButton:{type:Object,value:{},observer:'_titleActionButtonChanged'},/**
       * hovered to add additional class on elements when hovering
       */hovered:{type:Boolean,value:false,observer:'_hoveredChanged'}},/**
     * Observer when actionButton changes.
     * Sets _hasTitleActionButton
     */_titleActionButtonChanged:function _titleActionButtonChanged(){this._hasTitleActionButton=(this.titleActionButton&&(this.titleActionButton.key||this.titleActionButton.val))!==undefined},/**
     * Return button class type and size if any
     * See https://github.com/PredixDev/px-buttons-design for more details.
     */_getBtnClazz:function _getBtnClazz(titleActionButton){var clazz=titleActionButton.size||'';clazz=clazz+' '+(titleActionButton.type||'');return clazz},/**
     * Return style for color.  This property is part of px-button so honor if passed on.
     */_getBtnColor:function _getBtnColor(titleActionButton){var color='';if(titleActionButton.color){color='color: '+titleActionButton.color+'; stroke: '+titleActionButton.color+'; '}return color},/**
     * Callback for title icon
     */_onTitleActionSelected:function _onTitleActionSelected(){this._handleSelection({val:this.titleActionButton.val,key:this.titleActionButton.key})},/**
     * Fires px-title-on-action-clicked with selection detail. E.g. {key: "1", val: "Favorite"}
     * @event px-title-on-action-clicked
     */_handleSelection:function _handleSelection(detail){this.fire('px-title-on-action-clicked',detail)},/**
     * Callback to set specific classes for overlay container
     */_hoveredChanged:function _hoveredChanged(){this._btnHoveredclass='';if(this.hovered){this._btnHoveredclass='btn-overlay'}}})})();
//# sourceMappingURL=px-title-button.js.map
