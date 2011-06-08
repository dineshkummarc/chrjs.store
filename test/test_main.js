module('chrjs.store', {
	setup: function() {
		ts = tiddlyweb.Store();
		var t = new tiddlyweb.Tiddler('foo');
		t.text = 'foo bar';
		t.tags = ['foo', 'bar'];
		t.bag = new tiddlyweb.Bag('foo_public', '/');
		ts.addTiddler(t);
		var s = new tiddlyweb.Tiddler('HelloThere');
		s.text = 'Hello World, from the Test Suite';
		s.tags = ['tag1', 'tag2'];
		s.bag = new tiddlyweb.Bag('foo_public', '/');
		ts.addTiddler(s);
		window.localStorage = undefined;
	},
	teardown: function() {
		ts = undefined;
	}
});

test('Count Tiddlers', function() {
	var count = 0;
	ts.each(function(tiddler) {
		count++;
	});
	strictEqual(count, 2);
});

test('Add Tiddlers', function() {
	var tid = new tiddlyweb.Tiddler('Bar');
	tid.text = 'A New Tiddler';
	var addedTid = ts.addTiddler(tid).getTiddler('Bar');
	strictEqual(addedTid.title, 'Bar');
	strictEqual(addedTid.text, 'A New Tiddler');
	equal(addedTid.lastSync, undefined);
	strictEqual(addedTid.bag.name, 'foo_public');
});

test('Save Tiddlers', function() {
	var count = 0;
	ts.each(function(tiddler) {
		equal(tiddler.lastSync, undefined);
		count++;
	});
	ts.save(function(tiddler) {
		notEqual(tiddler.lastSync, undefined);
		count--;
	});
	strictEqual(count, 0);
});