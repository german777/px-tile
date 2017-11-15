suite('Custom Automation Tests for px-tile', function() {
  let tileEl;

  setup(function(done) {
    tileEl = fixture('px_tile_1');
    flush(()=>{
      done();
    });
  });

  test('Title is displayed', function() {
    var title = Polymer.dom(tileEl.root).querySelector('.title').textContent.trim();
    assert.equal(title, 'Title');
  });

  test('Description is displayed', function() {
    var description = Polymer.dom(tileEl.root).querySelector('.text').textContent.trim();
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
      var footer = Polymer.dom(tileEl.root).querySelector('.footer').textContent.trim();
      assert.equal(footer, 'Footer');
    },500);
  });
});
