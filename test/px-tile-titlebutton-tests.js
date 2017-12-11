suite('Title Action Button Tests for px-tile', function() {
  let tileEl;
  let titleActionButton;

  // setup async calls to load requierd mock json before running the test
  $.ajaxSetup({
    async: false
  });
  $.getJSON( "mock/titleActionButton.json", function( data ) {
    titleActionButton = data;
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

  test('Set px-title-button', function(done) {
    tileEl.set('titleActionButton', titleActionButton);
    flush(function(){
      let pxTitleButton = tileEl.$$('#pxTitleButton');
      assert.equal(pxTitleButton._hasTitleActionButton, true);
      done();
    });
  });

  test('Trigger actionTitleButton', function(done) {
    tileEl.set('titleActionButton', titleActionButton);
    window.addEventListener('px-title-on-action-clicked', function(evt){
      selectedValue = evt.detail;
    });
    flush(function(){
      let pxTitleButton = tileEl.$$('#pxTitleButton');
      let actionBtn = pxTitleButton.$$('#actionBtn');
      $(actionBtn).click();
      assert.equal(selectedValue.val, titleActionButton.val);
      done();
    });
  });
  
  test('Set px-title-button on overlay', function(done){
    tileEl.set('titleActionButton', titleActionButton);
    flush(function(){
      let pxOverlayTitleButton = tileEl.$$('#pxOverlayTitleButton');
      assert.equal(pxOverlayTitleButton._hasTitleActionButton, true);
      done();
    });
  });

  test('Trigger actionTitleButton on overlay', function(done) {
    tileEl.set('titleActionButton', titleActionButton);
    window.addEventListener('px-title-on-action-clicked', function(evt){
      selectedValue = evt.detail;
    });
    flush(function(){
      let pxOverlayTitleButton = tileEl.$$('#pxOverlayTitleButton');
      let actionBtn = pxOverlayTitleButton.$$('#actionBtn');
      $(actionBtn).click();
      assert.equal(selectedValue.val, titleActionButton.val);
      done();
    });
  });
  
});
