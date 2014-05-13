var fixture, mdText, mdHtml, mdStyle;

test('isMarkdownFile', function() {
	//docProtocol = 'file:';
	ok(isMarkdownFile('a.markdown'), 'test fail for .markdown');
	ok(isMarkdownFile('a.mkdn'),     'test fail for .mkdn');
	ok(isMarkdownFile('a.md'),       'test fail for .md');
	ok(isMarkdownFile('a.mkd'),      'test fail for .mkd');
	ok(isMarkdownFile('a.mdwn'),     'test fail for .mdwn');
	ok(isMarkdownFile('a.mdtxt'),    'test fail for .mdtxt');
	ok(isMarkdownFile('a.mdtext'),   'test fail for .mdtext');
	ok(!isMarkdownFile('Amarkdown'), 'test fail for Amarkdown');
	ok(!isMarkdownFile('a.markdownA'), 'test fail for .markdownA');
	// TODO: tests for docProtocol='http:'
});

module('contentBasicTest', {
	setup: function () {
		var testMarkdownText = '#Headline1';
		fixture = document.getElementById('qunit-fixture');
		document.body.innerHTML = '<pre>' + testMarkdownText + '</pre>';
		init();
		mdText = document.body.querySelector('#md-text');
		mdHtml = document.body.querySelector('#md-html');
		mdStyle = document.head.querySelector('#md-style');
	},
	teardown: function () {
		document.body.removeChild(mdHtml);
		document.head.removeChild(mdStyle);
		mdText = mdHtml = mdStyle = null;
	}
});

test('init', function(){
	var expectedHTML = '<h1 id="headline1">Headline1</h1>';
	ok(mdText, 'md-text element not found');
	ok(mdHtml, 'md-html element not found');
	equal(mdHtml.innerHTML, expectedHTML, 'Wrong HTML markup:\n'+mdHtml.innerHTML+'\nExpected: \n'+expectedHTML+'\n');
});

test('showMarkdownHTML', function() {
	showMarkdownHTML(true);
	ok(mdText.hidden, 'md-text is not hidden');
	ok(!mdHtml.hidden, 'md-html is not shown');
	showMarkdownHTML(false);
	ok(!mdText.hidden, 'md-text is not shown');
	ok(mdHtml.hidden, 'md-html is not hidden');
});

test('onContentMessage.getCSS', function(){
	onContentMessage({type:'getCSS'},0, function(css) {
		equal(css,currentCSS,'Wrong css returned: '+css+'. Expected: '+currentCSS);
	});
});

test('onContentMessage.setCSS', function(){
	var testCSS = 'qunit-test';
	onContentMessage({type:'setCSS',data:testCSS});
	equal(mdStyle.href,'qunit://'+testCSS,'Wrong CSS path set.');
	ok(mdText.hidden, 'md-text is not hidden');
	ok(!mdHtml.hidden, 'md-html is not shown');

	onContentMessage({type:'setCSS',data:textCSS});
	equal(mdStyle.href,'qunit://'+textCSS,'Wrong CSS path set.');
	ok(!mdText.hidden, 'md-text is not shown');
	ok(mdHtml.hidden, 'md-html is not hidden');
});

