suite('Action Buttons Test for px-tile', function(){
  let tileEl;
  let actionButtons3items;
  let actionButtons4items;
  
  //setup async calls to load requierd mock json before running the test
  $.ajaxSetup({
    async: false
  });
  $.getJSON('mock/actionButtons3items.json', function(data){
    actionButtons3items = data;
  });
  $.getJSON('mock/actionButtons4items.json', function(data){
    actionButtons4items = data;
  });
  $.ajaxSetup({
    async: true
  });
  
  setup(function(done) {
    tileEl = fixture('px_tile_1');
    flush(()=>{
      done();
    });
  });
  
  test('Set actionButtons when items <= 3', function(done) {
    tileEl.set('actionButtons', actionButtons3items);
    flush(function() {
      let pxActionButtons = tileEl.$$('#pxActionButtons');
      let totalButtons = Polymer.dom(pxActionButtons.root).querySelectorAll('button').length;
      assert.equal(pxActionButtons._isDropdown, false);
      assert.equal(totalButtons, actionButtons3items.items.length);
      done();
    });
  });
  
  test('Select first action button when items <= 3', function( done) {
    tileEl.set('actionButtons', actionButtons3items);
    let selectedValue;
    window.addEventListener('px-title-on-action-clicked', function(evt) {
      selectedValue = evt.detail;
    });
    flush(function() {
      let pxActionButtons = tileEl.$$('#pxActionButtons');
      let btn = Polymer.dom(pxActionButtons.root).querySelectorAll('button')[0];
      $(btn).click();
      assert.equal(selectedValue.key, actionButtons3items.items[0].key);
      done();
    });
  });
  
  test('Set actionButtons when items > 3', function(done) {
    tileEl.set('actionButtons', actionButtons4items);
    flush(function() {
      let pxActionButtons = tileEl.$$('#pxActionButtons');
      assert.equal(pxActionButtons._isDropdown, true);
      done();
    });
  });
  
  test('Select one item when items > 3', function(done) {
    let selectedValue;
    window.addEventListener('px-dropdown-selection-changed', function(evt) {
      selectedValue = evt.detail;
    });
    tileEl.set('actionButtons', actionButtons4items);
    
    flush(function() {
      let pxActionButtons = tileEl.$$('#pxActionButtons');
      pxActionButtons._actionButtonsChanged();
      let pxDropdown = pxActionButtons.$$('#pxDropdown');
      pxDropdown.fire('iron-select', {item: actionButtons4items.items[0]});
      assert.equal(selectedValue.val, actionButtons4items.items[0].val);
      done();
    });
  });
});
