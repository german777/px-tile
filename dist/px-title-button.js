'use strict';(function(){Polymer({is:'px-title-button',properties:{/**
       * Single action button to display on the title section right side.
       * See https://github.com/PredixDev/px-buttons-design for more details.
       */titleActionButton:{type:Object,value:{},observer:'_titleActionButtonChanged'}},/**
     * Observer when actionButton changes.
     * Sets _hasTitleActionButton
     */_titleActionButtonChanged:function _titleActionButtonChanged(){this._hasTitleActionButton=(this.titleActionButton&&(this.titleActionButton.key||this.titleActionButton.val))!==undefined},/**
     * Callback for title icon
     */_onTitleActionSelected:function _onTitleActionSelected(){this._handleSelection({val:this.titleActionButton.val,key:this.titleActionButton.key})},/**
     * Fires px-title-on-action-clicked with selection detail. E.g. {key: "1", val: "Favorite", selected: true}
     * @event px-title-on-action-clicked
     */_handleSelection:function _handleSelection(detail){this.fire('px-title-on-action-clicked',detail)}})})();
//# sourceMappingURL=px-title-button.js.map
