// Copyright 2013 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function assertSelectorNames(selectors, expectSelectorStrings) {
  assert.strictEqual(expectSelectorStrings.length, selectors.length);
  expectSelectorStrings.forEach((expectSelectorString, i) => {
    assert.strictEqual(expectSelectorString, selectors[i].selectorString);
  });
}

suite('Setup', () => {
  test('Selector Parsing', () => {
    assertSelectorNames(
      MutationSummary.parseElementFilter('div'),
      ['div']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter(' div '),
      ['div']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('div,span'),
      ['div', 'span']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter(' div , SPAN '),
      ['div', 'SPAN']
    );

    assert.throws(() => {
      MutationSummary.parseElementFilter('div span');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div > span');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div>span');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div < span');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div<span');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div:first-child')
    });

    assertSelectorNames(
      MutationSummary.parseElementFilter('#id'),
      ['*#id']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('span#id'),
      ['span#id']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('SPAN#id1#id2'),
      ['SPAN#id1#id2']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('span, #id'),
      ['span', '*#id']
    );

    assert.throws(() => {
      MutationSummary.parseElementFilter('#2foo');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('# div');
    });

    assertSelectorNames(
      MutationSummary.parseElementFilter('.className'),
      ['*.className']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('.className.className2'),
      ['*.className.className2']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('div.className'),
      ['div.className']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('DIV.className.className2'),
      ['DIV.className.className2']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter(' div.className '),
      ['div.className']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('.className'),
      ['*.className']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter(' .className '),
      ['*.className']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('.className,.className,span.className'),
      ['*.className', '*.className', 'span.className']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter(' .className, .className, SPAN.className'),
      ['*.className', '*.className', 'SPAN.className']
    );

    assert.throws(() => {
      MutationSummary.parseElementFilter('div. className');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div . className');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div .className');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div .className');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('.2className');
    });

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[foo].className'),
      ['div[foo].className']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('DIV[foo].className#id'),
      ['DIV[foo].className#id']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('div#id.className[foo]'),
      ['div#id.className[foo]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[foo]'),
      ['div[foo]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[ foo ]'),
      ['div[foo]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter(' div[ foo ] '),
      ['div[foo]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[foo],span[bar]'),
      ['div[foo]', 'span[bar]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter(' div[foo] , span[bar] '),
      ['div[foo]', 'span[bar]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('[foo]'),
      ['*[foo]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('[foo][bar]'),
      ['*[foo][bar]']
    );

    assert.throws(() => {
      MutationSummary.parseElementFilter('div [foo]');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div[foo');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('divfoo]');
    });

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[foo=bar]'),
      ['div[foo="bar"]']);

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[ foo=" bar baz " ]'),
      ['div[foo=" bar baz "]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter(' div[ foo = \' bar baz \'] '),
      ['div[foo=" bar baz "]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[foo=baz],span[bar="bat"]'),
      ['div[foo="baz"]', 'span[bar="bat"]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter(' div[foo=boo] , span[bar="baz"] '),
      ['div[foo="boo"]', 'span[bar="baz"]']
    );

    assert.throws(() => {
      MutationSummary.parseElementFilter('div[foo="bar ]');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div[foo=bar"baz]');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div[foo=bar baz]');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div[foo|=bar]');
    });

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[foo~=bar]'),
      ['div[foo~="bar"]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[foo~="bar  "]'),
      ['div[foo~="bar  "]']
    );

    assert.throws(() => {
      MutationSummary.parseElementFilter('div[foo~=]');
    });

    assert.throws(() => {
      MutationSummary.parseElementFilter('div[foo~ =bar]');
    });

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[foo][bar]'),
      ['div[foo][bar]']
    );

    assertSelectorNames(
      MutationSummary.parseElementFilter('div[foo], A, *[bar], div[ baz = "bat"]'),
      ['div[foo]', 'A', '*[bar]', 'div[baz="bat"]']
    );
  });


  test('Options Validation', () => {
    // Unknown option.
    assert.throws(() => {
      new MutationSummary({
        blarg: true,
        callback() {},
        queries: [{ all: true }]
      });
    });

    // callback is required.
    assert.throws(() => {
      new MutationSummary({
        queries: [{ all: true }]
      });
    });

    // callback must be a function.
    assert.throws(() => {
      new MutationSummary({
        callback: 'foo'
      });
    });

    // queries is required.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
      });
    });

    // queries must contain at least one query request.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: []
      });
    });

    // Valid all request.
    new MutationSummary({
      callback() {},
      queries: [{ all: true }]
    });

    // all doesn't allow options.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ all: true, foo: false }]
      });
    });

    // Valid attribute request.
    new MutationSummary({
      callback() {},
      queries: [{ attribute: "foo" }]
    });

    // attribute doesn't allow options.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ attribute: "foo", bar: false }]
      });
    });

    // attribute must be a string.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ attribute: 1 }]
      });
    });

    // attribute must be non-zero length.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ attribute: '  ' }]
      });
    });

    // attribute must names must be valid.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ attribute: '1foo' }]
      });
    });

    // attribute must contain only one attribute.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ attribute: 'foo bar' }]
      });
    });

    // Valid element request.
    new MutationSummary({
      callback() {},
      queries: [{ element: 'div' }]
    });

    // Valid element request 2.
    new MutationSummary({
      callback() {},
      queries: [{ element: 'div, span[foo]' }]
    });

    // Valid element request 3.
    new MutationSummary({
      callback() {},
      queries: [{ element: 'div', elementAttributes: "foo bar" }]
    });

    // Valid element request 4.
    new MutationSummary({
      callback() {},
      oldPreviousSibling: true,
      queries: [{ element: 'div, span[foo]' }]
    });

    // elementFilter doesn't support descendant selectors.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ element: 'div span[foo]' }]
      });
    });

    // elementFilter must contain at least one item
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ element: '' }]
      });
    });

    // Invalid element syntanx.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ element: 'div[noTrailingBracket', }]
      });
    });

    // Invalid element option
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ element: 'div[foo]', foo: true }]
      });
    });

    // elememtAttribute must contain valid attribute names
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ element: 'div[foo]', elementAttributes: 'foo 1bar' }]
      });
    });

    // Invalid element option 2.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ element: 'div[foo]', elementAttributes: 'foo', foo: true }]
      });
    });

    // Valid characterData request.
    new MutationSummary({
      callback() {},
      queries: [{ characterData: true }]
    });

    // Invalid characterData option.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ characterData: true, foo: true }]
      });
    });

    // Invalid query request.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{  }]
      });
    });

    // Invalid query request.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ foo: true  }]
      });
    });

    // Disallow listening to multiple 'cases' of the same attribute.
    assert.throws(() => {
      new MutationSummary({
        callback() {},
        queries: [{ element: 'a', elementAttributes: 'Bar bar' }]
      });
    });
  });
});
