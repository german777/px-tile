'use strict';function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}(function(){var _Polymer;Polymer((_Polymer={is:'px-title-button',properties:{/**
       * Single action button to display on the title section right side.
       * See https://github.com/PredixDev/px-buttons-design for more details.
       */titleActionButton:{type:Object,value:{},observer:'_titleActionButtonChanged'},/**
       * hovered to add additional class on elements when hovering
       */isOverlay:{type:Boolean,value:false,observer:'_isOverlayChanged'}},/**
     * Observer when actionButton changes.
     * Sets _hasTitleActionButton
     */_titleActionButtonChanged:function _titleActionButtonChanged(){this._hasTitleActionButton=(this.titleActionButton&&(this.titleActionButton.key||this.titleActionButton.val))!==undefined;this._isOverlayChanged()},/**
     * Return button class type and size if any
     * See https://github.com/PredixDev/px-buttons-design for more details.
     */_getBtnClazz:function _getBtnClazz(titleActionButton){var clazz=titleActionButton.size||'';clazz=clazz+' '+(titleActionButton.type||'');return clazz},/**
     * Return style for color.  This property is part of px-button so honor if passed on.
     */_getBtnColor:function _getBtnColor(titleActionButton){var color='';if(titleActionButton.color){color='color: '+titleActionButton.color+'; stroke: '+titleActionButton.color+'; '}return color}},_defineProperty(_Polymer,'_getBtnClazz',function _getBtnClazz(titleActionButton){var clazz=titleActionButton.size||'';clazz=clazz+' '+(titleActionButton.type||'');return clazz}),_defineProperty(_Polymer,'_getBtnColor',function _getBtnColor(titleActionButton){var color='';if(titleActionButton.color){color='color: '+titleActionButton.color+'; stroke: '+titleActionButton.color+'; '}return color}),_defineProperty(_Polymer,'_onTitleActionSelected',function _onTitleActionSelected(){this._handleSelection({val:this.titleActionButton.val,key:this.titleActionButton.key})}),_defineProperty(_Polymer,'_handleSelection',function _handleSelection(detail){this.fire('px-title-on-action-clicked',detail)}),_defineProperty(_Polymer,'_isOverlayChanged',function _isOverlayChanged(){if(this.titleActionButton){this._btnHoveredclass='';if(this.isOverlay){this._btnHoveredclass='btn-overlay';if(!this.titleActionButton.type){this._btnHoveredclass=''}}}}),_Polymer))})();
//# sourceMappingURL=px-title-button.js.map
