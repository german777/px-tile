suite('Custom Automation Tests for px-tile', function() {
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

  test('Title, subtitle and description are displayed', function() {
    var tileTextWrapper = Polymer.dom(tileEl.root).querySelector('.tile-text-wrapper');
    var title = tileTextWrapper.querySelector('.title-span').textContent.trim();
    var subtitle = tileTextWrapper.querySelector('.subtitle-span').textContent.trim();
    var description = tileTextWrapper.querySelector('.text').textContent.trim();

    assert.equal(title, 'Title text');
    assert.equal(subtitle, 'Subtitle text');
    assert.equal(description, 'Description');
  });

  test('Image is displayed', function() {
    var img = tileEl.getEffectiveChildren()[0];
    assert.equal(img.tagName, 'IMG');
  });

  test('Hover works, overlay has title, subtitle, description, and footer text', function() {
    var overlay = Polymer.dom(tileEl.root).querySelector('.overlay');
    overlay.classList.add('hovered');
    window.setTimeout(function() {
      var opacity = window.getComputedStyle(overlay).getPropertyValue('opacity');
      assert.equal(opacity, '1');
      var title = overlay.querySelector('.title-span').textContent.trim();
      var subtitle = overlay.querySelector('.subtitle-span').textContent.trim();
      var overlayDescription = overlay.querySelector('.text').textContent.trim();
      assert.equal(title, 'Title');
      assert.equal(subtitle, 'Subtitle');
      assert.equal(overlayDescription, 'Overlay Description text');
      assert.equal(footer, 'Footer');
    },500);

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
