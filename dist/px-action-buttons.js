'use strict';(function(){Polymer({is:'px-action-buttons',properties:{/**
       * Action buttons to display below the description/copy text.
       * Please refer to px-dropdown (https://github.com/PredixDev/px-dropdown) for a list of supported properties
       */actionButtons:{type:Object,value:{},observer:'_actionButtonsChanged'},/**
       * hovered to add additional class on elements when hovering
       */hovered:{type:Boolean,value:false,observer:'_hoveredChanged'},/**
       * Current text color of overlay to apply other elements when hovering
       */hoverTextColor:{type:String,value:''}},created:function created(){this._maxIcons=3},/**
     * Attach event listeners for dropdown action buttons.
     */attached:function attached(){this.listen(this,'px-dropdown-selection-changed','_itemSelected')},/**
     * Detach event listeners for dropdown action buttons.
     */detached:function detached(){this.unlisten(this,'px-dropdown-selection-changed','_itemSelected')},/**
     * Observer when actionButtons changes.  
     * Sets flag _isDropdown true if actionButtons size is greater than 3, false otherwise.
     * If _isDropdown === true it will update px-dropdown options menu
     */_actionButtonsChanged:function _actionButtonsChanged(){// set _notifyActionChange false to prevent firing px-dropdown-selection-changed while updating the new set of buttons
this._notifyActionChange=false;this._isDropdown=this.actionButtons&&this.actionButtons.items&&this.actionButtons.items.length>this._maxIcons;if(this._isDropdown){this.async(function(){var pxDropdown=this.$$('#pxDropdown');pxDropdown.style.height='20px';if(!this.actionButtons.multi){// remove selected if passed on when is not multi selection
for(var x in this.actionButtons.items){delete this.actionButtons.items[x].selected}}for(var key in this.actionButtons){pxDropdown.set(key,this.actionButtons[key])}this.async(function(){// adjust dropdown to appear aligned to the right
var dropdown=Polymer.dom(pxDropdown.root).querySelector('#dropdown');dropdown.set('horizontalAlign','right');var button=Polymer.dom(pxDropdown.root).querySelector('#button');this.button=button;this.pxIcon=Polymer.dom(button).querySelector('px-icon');if(this.pxIcon){this.pxIcon.style.right='-6px'}this._notifyActionChange=true})},100)}else{this._notifyActionChange=true}},/**
     * Callback for on-tap event for action items when the list size is 3 or less
     */_onSelected:function _onSelected(evt){var item=evt.detail.model||evt.model.item;this._handleSelection({val:item.val,key:item.key})},/**
     * Callback for selected/unselected action title dropdown items when the list is greater than 3
     */_itemSelected:function _itemSelected(evt){var pxDropdown=this.$$('#pxDropdown');if(this.actionButtons.multi||pxDropdown._displayValueSelected===evt.detail.val){this._handleSelection(evt.detail)}},/**
     * Fires px-title-action with selection detail. E.g. {key: "1", val: "Favorite", selected: true}
     */_handleSelection:function _handleSelection(detail){if(this._notifyActionChange){this.fire('px-title-on-action-clicked',detail)}},/**
     * Return button class type and size if any
     * See https://github.com/PredixDev/px-buttons-design for more details.
     */_getBtnClazz:function _getBtnClazz(item){var clazz=item.size||'';clazz=clazz+' '+(item.type||'');return clazz},/**
     * Return style for color.  This property is part of px-button so honor if passed on.
     */_getBtnColor:function _getBtnColor(item){var color='';if(item.color){color='color: '+item.color+'; stroke: '+item.color+'; '}return color},/**
     * Callback to set specific classes for overlay container
     */_hoveredChanged:function _hoveredChanged(){// add class to buttons to change color of text when hovering if these are bare buttons
if(this.actionButtons.items&&this.actionButtons.items.length<=this._maxIcons){var hoveredClazz=' btn-overlay ';for(var x in this.actionButtons.items){var type=this.actionButtons.items[x].type;type=type?type.replace(hoveredClazz,''):'';if(this.hovered){if(type.indexOf('btn--bare')!==-1){type=type+hoveredClazz}}this.actionButtons.items[x].type=type;this.set('actionButtons.items.'+x,JSON.parse(JSON.stringify(this.actionButtons.items[x])))}}else if(this.pxIcon){// this is a dropdown then change the color of the icon on hovering
this.pxIcon.style.color='';if(this.hovered){this.pxIcon.style.color=this.hoverTextColor}}}})})();
//# sourceMappingURL=px-action-buttons.js.map
