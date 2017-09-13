// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-tile', function() {
    var tileEl = document.getElementById('px_tile_1');
    test('Title is displayed', function() {
      var title = Polymer.dom(tileEl.root).querySelector('.title').textContent.trim();
      assert.equal(title, 'Title');
    });
    test('Description is displayed', function() {
      var description = Polymer.dom(tileEl.root).querySelector('.text').textContent.trim();
      assert.equal(description, 'Description');
    });
    test('Footer is displayed', function() {
      var footer = Polymer.dom(tileEl.root).querySelector('.footer').textContent.trim();
      assert.equal(footer, 'Footer');
    });
    test('Image is displayed', function() {
      var img = Polymer.dom(tileEl.root).querySelector('.thumbnail').children[0].children[0];
      assert.equal(img.tagName, 'IMG');
    });
    test('Hover works', function() {
      var overlay = Polymer.dom(tileEl.root).querySelector('.overlay');
      overlay.classList.add('hovered');
      window.setTimeout(function() {
        var opacity = window.getComputedStyle(overlay).getPropertyValue('opacity');
        assert.equal(opacity, '1');
      },500);
    });
  });
}
