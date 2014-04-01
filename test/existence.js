var L = require('../lenses'),
  jsc = require('jsverify');

describe('range lens', function() {
  'use strict';

  var nonemptyStr = jsc.suchthat(
    jsc.string(),
    function (l) { return l.length !== 0; }
  );

  var forallStringRanges = function (f) {
    return jsc.forall( nonemptyStr,
      function (s) {
        return jsc.forall( jsc.nat(s.length - 1), jsc.nat(s.length - 1),
          function (i, j) {
            return f(s, Math.min(i, j), Math.max(i, j));
          });
      });
  };

  it('obeys get-set law', function() {
    jsc.assert(
      forallStringRanges(function (s, from, to) {
        var l = L.range(from, to);
        return l.set(l.get(s), s) === s;
      })
    );
  });

  it('obeys set-get law', function() {
    jsc.assert(
      forallStringRanges(function (s, from, to) {
        var l = L.range(from, to);
        console.log(from, to, l.get(l.set('x', s)));
        return l.get(l.set('x', s)) === 'x';
      })
    );
  });
});
