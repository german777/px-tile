suite('Action Buttons Test for px-tile', function(){
  let tileEl;
  let actionButtons3items;
  let actionButtons4items;
  
  //setup async calls to load required mock json before running the test
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
    window.addEventListener('px-tile-action-tapped', function(evt) {
      selectedValue = evt.detail;
    });
    flush(function() {
      let pxActionButtons = tileEl.$$('#pxActionButtons');
      let btn = Polymer.dom(pxActionButtons.root).querySelectorAll('button')[0];
      $(btn).click();
      assert.equal(selectedValue.id, actionButtons3items.items[0].id);
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
      console.log('selectedValue', selectedValue);
      assert.equal(selectedValue.label, actionButtons4items.items[0].label);
      done();
    });
  });
  
  test('Set overlay action buttons btn-overlay class', function(done) {
    tileEl.set('actionButtons', actionButtons3items);
    var overlay = Polymer.dom(tileEl.root).querySelector('.overlay');
    overlay.classList.add('hovered');
    tileEl._hovered = true;
    flush(function() {
      let pxActionButtons = tileEl.$$('#pxOverlayActionButtons');
      let items = pxActionButtons.actionButtons.items;
      for(let x in items) {
        let hasOverlayClass = items[x].type.indexOf('btn-overlay') > 0;
        assert.equal(hasOverlayClass, true, 'Overlay button id: ' + items[x].id + ' has no btn-overlay class');
      }
      done();
    });
  });
  
});
