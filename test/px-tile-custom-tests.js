suite('Custom Automation Tests for px-tile', function() {
  let tileEl;

  setup(function(done) {
    tileEl = fixture('px_tile_1');
    flush(()=>{
      done();
    });
  });

  test('Title is displayed', function() {
    var tileTextWrapper = Polymer.dom(tileEl.root).querySelector('.tile-text-wrapper');
    var title = tileTextWrapper.querySelector('.title-span').textContent.trim();
    assert.equal(title, 'Title text');

  });

  test('Subtitle is displayed', function() {
    var tileTextWrapper = Polymer.dom(tileEl.root).querySelector('.tile-text-wrapper');
    var subtitle = tileTextWrapper.querySelector('.subtitle-span').textContent.trim();
    assert.equal(subtitle, 'Subtitle text');
  });

  test('Description is displayed', function() {
    var tileTextWrapper = Polymer.dom(tileEl.root).querySelector('.tile-text-wrapper');
    var description = tileTextWrapper.querySelector('.text').textContent.trim();
    assert.equal(description, 'Description');
  });

  test('Image is displayed', function() {
    var img = tileEl.getEffectiveChildren()[0];
    assert.equal(img.tagName, 'IMG');
  });

  test('Hover works', function() {
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
});
