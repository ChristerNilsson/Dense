// Generated by CoffeeScript 2.7.0
var xxx,
  indexOf = [].indexOf;

import {
  Tournament
} from './tournament.js';

import {
  Tables
} from './tables.js';

import {
  Names
} from './names.js';

import {
  Standings
} from './standings.js';

import {
  Pairings
} from './pairings.js';

export var print = console.log;

export var range = _.range;

export var g = {};

g.LPP = 14;

// parameters that somewhat affects matching
g.COST = 'QUADRATIC'; // QUADRATIC=1.01 or LINEAR=1

g.DIFF = 'ID'; // ID or ELO

g.COLORS = 1; // 1 or 2

g.TABLES = 0;

g.NAMES = 1;

g.STANDINGS = 2;

g.PAIRINGS = 3;

g.showType = function(a) {
  if (typeof a === 'string') {
    return `'${a}'`;
  } else {
    return a;
  }
};

//assert = (a,b) -> if not _.isEqual a,b then print "Assert failure: #{showType a} != #{showType b}"
g.assert = function(a, b) {
  if (!_.isEqual(a, b)) {
    return print(`Assert failure: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
  }
};

g.ok = function(p0, p1) {
  var ref;
  return p0.id !== p1.id && (ref = p0.id, indexOf.call(p1.opp, ref) < 0) && abs(p0.balans() + p1.balans()) <= g.COLORS;
};

g.other = function(col) {
  if (col === 'b') {
    return 'w';
  } else {
    return 'b';
  }
};

g.myRound = function(x, decs) {
  return x.toFixed(decs);
};

g.assert("2.0", g.myRound(1.99, 1));

g.assert("0.6", g.myRound(0.61, 1));

g.ints2strings = function(ints) {
  return `${ints}`;
};

g.assert("1,2,3", g.ints2strings([1, 2, 3]));

g.assert("1", g.ints2strings([1]));

g.assert("", g.ints2strings([]));

g.res2string = function(ints) {
  var i;
  return ((function() {
    var j, len, results;
    results = [];
    for (j = 0, len = ints.length; j < len; j++) {
      i = ints[j];
      results.push(i.toString());
    }
    return results;
  })()).join('');
};

g.assert("123", g.res2string([1, 2, 3]));

g.assert("1", g.res2string([1]));

g.assert("", g.res2string([]));

g.zoomIn = function(n) {
  return g.ZOOM[g.state]--;
};

g.zoomOut = function(n) {
  return g.ZOOM[g.state]++;
};

g.setState = function(newState) {
  return g.state = newState;
};

g.invert = function(arr) {
  var i, j, len, ref, res;
  res = [];
  ref = range(arr.length);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    res[arr[i]] = i;
  }
  return res;
};

g.assert([0, 1, 2, 3], g.invert([0, 1, 2, 3]));

g.assert([3, 2, 0, 1], g.invert([2, 3, 1, 0]));

g.assert([2, 3, 1, 0], g.invert(g.invert([2, 3, 1, 0])));

xxx = [[2, 1], [12, 2], [12, 1], [3, 4]];

xxx.sort(function(a, b) {
  var diff;
  diff = a[0] - b[0];
  if (diff === 0) {
    return a[1] - b[1];
  } else {
    return diff;
  }
});

g.assert([[2, 1], [3, 4], [12, 1], [12, 2]], xxx);

g.assert(true, [2] > [12]);

g.assert(true, "2" > "12");

g.assert(false, 2 > 12);

// xxx = [[2,1],[12,2],[12,1],[3,4]]
// assert [[2,1],[12,1],[12,2],[3,4]], _.sortBy(xxx, (x) -> [x[0],x[1]])
// assert [[3,4],[2,1],[12,1],[12,2]], _.sortBy(xxx, (x) -> -x[0])
// assert [[2,1],[12,1],[3,4],[12,2]], _.sortBy(xxx, (x) -> x[1])
// assert [[3,4],[12,1],[2,1],[12,2]], _.sortBy(xxx, (x) -> -x[1])
g.normera = function(a, b, k) {
  return Math.round((b - k * a) / (k - 1)); // Räknar ut vad som ska adderas till elotalen
};

g.assert(-406, g.normera(1406, 2406, 2)); // 1000,2000

g.assert(-1900, g.normera(1950, 2000, 2)); //   50,100

g.assert(0, g.normera(1000, 2000, 2)); // 1000,2000

g.assert(200, g.normera(900, 2000, 2)); // 1100,2200

g.assert(-1200, g.normera(1600, 2000, 2)); //  400,800

g.assert(-500, g.normera(1000, 2000, 3)); //  500,1500

g.assert(-1000, g.normera(1200, 1800, 4)); //  200,800

g.assert(-1067, g.normera(1400, 2400, 4)); //  333,1333

g.assert(-800, g.normera(1600, 2000, 1.5)); //  800,1200

g.assert(400, g.normera(1600, 2000, 1.2)); // 2000,2400

g.assert(2400, g.normera(1600, 2000, 1.1)); // 4000,4400

g.sum = function(s) {
  var item, j, len, res;
  res = 0;
  for (j = 0, len = s.length; j < len; j++) {
    item = s[j];
    res += parseFloat(item);
  }
  return res;
};

g.assert(6, g.sum('012012'));

g.txtT = function(value, w, align = window.CENTER) {
  var diff, lt, res, rt;
  if (value.length > w) {
    value = value.substring(0, w);
  }
  if (value.length < w && align === window.RIGHT) {
    value = value.padStart(w);
  }
  if (align === window.LEFT) {
    res = value + _.repeat(' ', w - value.length);
  }
  if (align === window.RIGHT) {
    res = _.repeat(' ', w - value.length) + value;
  }
  if (align === window.CENTER) {
    diff = w - value.length;
    lt = _.repeat(' ', Math.floor((1 + diff) / 2));
    rt = _.repeat(' ', Math.floor(diff / 2));
    res = lt + value + rt;
  }
  return res;
};

g.prBoth = function(score) {
  return ` ${'0½1'[score]} - ${'1½0'[score]} `;
};

//assert "   Sven   ", txtT "Sven",10

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFscy5qcyIsInNvdXJjZVJvb3QiOiIuLlxcIiwic291cmNlcyI6WyJjb2ZmZWVcXGdsb2JhbHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLEdBQUE7RUFBQTs7QUFBQSxPQUFBO0VBQVMsVUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsU0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBTyxLQUFBLEdBQVEsT0FBTyxDQUFDOztBQUN2QixPQUFBLElBQU8sS0FBQSxHQUFRLENBQUMsQ0FBQzs7QUFFakIsT0FBQSxJQUFPLENBQUEsR0FBSSxDQUFBOztBQUVYLENBQUMsQ0FBQyxHQUFGLEdBQVEsR0FYUjs7O0FBY0EsQ0FBQyxDQUFDLElBQUYsR0FBUyxZQWRUOztBQWVBLENBQUMsQ0FBQyxJQUFGLEdBQVMsS0FmVDs7QUFnQkEsQ0FBQyxDQUFDLE1BQUYsR0FBVyxFQWhCWDs7QUFrQkEsQ0FBQyxDQUFDLE1BQUYsR0FBVzs7QUFDWCxDQUFDLENBQUMsS0FBRixHQUFVOztBQUNWLENBQUMsQ0FBQyxTQUFGLEdBQWM7O0FBQ2QsQ0FBQyxDQUFDLFFBQUYsR0FBYTs7QUFFYixDQUFDLENBQUMsUUFBRixHQUFhLFFBQUEsQ0FBQyxDQUFELENBQUE7RUFBTyxJQUFHLE9BQU8sQ0FBUCxLQUFZLFFBQWY7V0FBNkIsQ0FBQSxDQUFBLENBQUEsQ0FBSSxDQUFKLENBQUEsQ0FBQSxFQUE3QjtHQUFBLE1BQUE7V0FBMkMsRUFBM0M7O0FBQVAsRUF2QmI7OztBQXlCQSxDQUFDLENBQUMsTUFBRixHQUFXLFFBQUEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFBO0VBQVMsSUFBRyxDQUFJLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBVixFQUFZLENBQVosQ0FBUDtXQUEw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QUFhLE9BQU0sRUFBbkI7SUFDTCxHQUFBLEdBQU0sRUFBQSxHQUFLLEtBQUwsR0FBYSxHQUpwQjs7U0FLQTtBQVZROztBQVlULENBQUMsQ0FBQyxNQUFGLEdBQVcsUUFBQSxDQUFDLEtBQUQsQ0FBQTtTQUFXLEVBQUEsQ0FBQSxDQUFJLEtBQUssQ0FBQyxLQUFELENBQVQsQ0FBQSxHQUFBLENBQUEsQ0FBc0IsS0FBSyxDQUFDLEtBQUQsQ0FBM0IsRUFBQTtBQUFYOztBQXhHWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRvdXJuYW1lbnQgfSBmcm9tICcuL3RvdXJuYW1lbnQuanMnIFxyXG5pbXBvcnQgeyBUYWJsZXMgfSBmcm9tICcuL3RhYmxlcy5qcycgXHJcbmltcG9ydCB7IE5hbWVzIH0gZnJvbSAnLi9uYW1lcy5qcycgXHJcbmltcG9ydCB7IFN0YW5kaW5ncyB9IGZyb20gJy4vc3RhbmRpbmdzLmpzJyBcclxuaW1wb3J0IHsgUGFpcmluZ3MgfSBmcm9tICcuL3BhaXJpbmdzLmpzJyBcclxuXHJcbmV4cG9ydCBwcmludCA9IGNvbnNvbGUubG9nXHJcbmV4cG9ydCByYW5nZSA9IF8ucmFuZ2VcclxuXHJcbmV4cG9ydCBnID0ge31cclxuXHJcbmcuTFBQID0gMTRcclxuXHJcbiMgcGFyYW1ldGVycyB0aGF0IHNvbWV3aGF0IGFmZmVjdHMgbWF0Y2hpbmdcclxuZy5DT1NUID0gJ1FVQURSQVRJQycgIyBRVUFEUkFUSUM9MS4wMSBvciBMSU5FQVI9MVxyXG5nLkRJRkYgPSAnSUQnICMgSUQgb3IgRUxPXHJcbmcuQ09MT1JTID0gMSAjIDEgb3IgMlxyXG5cclxuZy5UQUJMRVMgPSAwXHJcbmcuTkFNRVMgPSAxXHJcbmcuU1RBTkRJTkdTID0gMlxyXG5nLlBBSVJJTkdTID0gM1xyXG5cclxuZy5zaG93VHlwZSA9IChhKSAtPiBpZiB0eXBlb2YgYSA9PSAnc3RyaW5nJyB0aGVuIFwiJyN7YX0nXCIgZWxzZSBhXHJcbiNhc3NlcnQgPSAoYSxiKSAtPiBpZiBub3QgXy5pc0VxdWFsIGEsYiB0aGVuIHByaW50IFwiQXNzZXJ0IGZhaWx1cmU6ICN7c2hvd1R5cGUgYX0gIT0gI3tzaG93VHlwZSBifVwiXHJcbmcuYXNzZXJ0ID0gKGEsYikgLT4gaWYgbm90IF8uaXNFcXVhbCBhLGIgdGhlbiBwcmludCBcIkFzc2VydCBmYWlsdXJlOiAje0pTT04uc3RyaW5naWZ5IGF9ICE9ICN7SlNPTi5zdHJpbmdpZnkgYn1cIlxyXG5cclxuZy5vayA9IChwMCwgcDEpIC0+IHAwLmlkICE9IHAxLmlkIGFuZCBwMC5pZCBub3QgaW4gcDEub3BwIGFuZCBhYnMocDAuYmFsYW5zKCkgKyBwMS5iYWxhbnMoKSkgPD0gZy5DT0xPUlNcclxuZy5vdGhlciA9IChjb2wpIC0+IGlmIGNvbCA9PSAnYicgdGhlbiAndycgZWxzZSAnYidcclxuXHJcbmcubXlSb3VuZCA9ICh4LGRlY3MpIC0+IHgudG9GaXhlZCBkZWNzXHJcbmcuYXNzZXJ0IFwiMi4wXCIsIGcubXlSb3VuZCAxLjk5LDFcclxuZy5hc3NlcnQgXCIwLjZcIiwgZy5teVJvdW5kIDAuNjEsMVxyXG5cclxuZy5pbnRzMnN0cmluZ3MgPSAoaW50cykgLT4gXCIje2ludHN9XCJcclxuZy5hc3NlcnQgXCIxLDIsM1wiLCBnLmludHMyc3RyaW5ncyBbMSwyLDNdXHJcbmcuYXNzZXJ0IFwiMVwiLCBnLmludHMyc3RyaW5ncyBbMV1cclxuZy5hc3NlcnQgXCJcIiwgZy5pbnRzMnN0cmluZ3MgW11cclxuXHJcbmcucmVzMnN0cmluZyA9IChpbnRzKSAtPiAoaS50b1N0cmluZygpIGZvciBpIGluIGludHMpLmpvaW4gJydcclxuZy5hc3NlcnQgXCIxMjNcIiwgZy5yZXMyc3RyaW5nIFsxLDIsM11cclxuZy5hc3NlcnQgXCIxXCIsIGcucmVzMnN0cmluZyBbMV1cclxuZy5hc3NlcnQgXCJcIiwgZy5yZXMyc3RyaW5nIFtdXHJcblxyXG5nLnpvb21JbiAgPSAobikgLT4gZy5aT09NW2cuc3RhdGVdLS1cclxuZy56b29tT3V0ID0gKG4pIC0+IGcuWk9PTVtnLnN0YXRlXSsrXHJcbmcuc2V0U3RhdGUgPSAobmV3U3RhdGUpIC0+IGcuc3RhdGUgPSBuZXdTdGF0ZVxyXG5cclxuZy5pbnZlcnQgPSAoYXJyKSAtPlxyXG5cdHJlcyA9IFtdXHJcblx0Zm9yIGkgaW4gcmFuZ2UgYXJyLmxlbmd0aFxyXG5cdFx0cmVzW2FycltpXV0gPSBpXHJcblx0cmV0dXJuIHJlc1xyXG5nLmFzc2VydCBbMCwxLDIsM10sIGcuaW52ZXJ0IFswLDEsMiwzXVxyXG5nLmFzc2VydCBbMywyLDAsMV0sIGcuaW52ZXJ0IFsyLDMsMSwwXVxyXG5nLmFzc2VydCBbMiwzLDEsMF0sIGcuaW52ZXJ0IGcuaW52ZXJ0IFsyLDMsMSwwXVxyXG5cclxueHh4ID0gW1syLDFdLFsxMiwyXSxbMTIsMV0sWzMsNF1dXHJcbnh4eC5zb3J0IChhLGIpIC0+IFxyXG5cdGRpZmYgPSBhWzBdIC0gYlswXSBcclxuXHRpZiBkaWZmID09IDAgdGhlbiBhWzFdIC0gYlsxXSBlbHNlIGRpZmZcclxuZy5hc3NlcnQgW1syLDFdLCBbMyw0XSwgWzEyLDFdLCBbMTIsMl1dLCB4eHhcdFxyXG5nLmFzc2VydCB0cnVlLCBbMl0gPiBbMTJdXHJcbmcuYXNzZXJ0IHRydWUsIFwiMlwiID4gXCIxMlwiXHJcbmcuYXNzZXJ0IGZhbHNlLCAyID4gMTJcclxuXHJcbiMgeHh4ID0gW1syLDFdLFsxMiwyXSxbMTIsMV0sWzMsNF1dXHJcbiMgYXNzZXJ0IFtbMiwxXSxbMTIsMV0sWzEyLDJdLFszLDRdXSwgXy5zb3J0QnkoeHh4LCAoeCkgLT4gW3hbMF0seFsxXV0pXHJcbiMgYXNzZXJ0IFtbMyw0XSxbMiwxXSxbMTIsMV0sWzEyLDJdXSwgXy5zb3J0QnkoeHh4LCAoeCkgLT4gLXhbMF0pXHJcbiMgYXNzZXJ0IFtbMiwxXSxbMTIsMV0sWzMsNF0sWzEyLDJdXSwgXy5zb3J0QnkoeHh4LCAoeCkgLT4geFsxXSlcclxuIyBhc3NlcnQgW1szLDRdLFsxMiwxXSxbMiwxXSxbMTIsMl1dLCBfLnNvcnRCeSh4eHgsICh4KSAtPiAteFsxXSlcclxuXHJcbmcubm9ybWVyYSA9IChhLGIsaykgLT4gTWF0aC5yb3VuZCAoYiAtIGsqYSkgLyAoay0xKSAjIFLDpGtuYXIgdXQgdmFkIHNvbSBza2EgYWRkZXJhcyB0aWxsIGVsb3RhbGVuXHJcbmcuYXNzZXJ0ICAtNDA2LCBnLm5vcm1lcmEgMTQwNiwyNDA2LDIgICAjIDEwMDAsMjAwMFxyXG5nLmFzc2VydCAtMTkwMCwgZy5ub3JtZXJhIDE5NTAsMjAwMCwyICAgIyAgIDUwLDEwMFxyXG5nLmFzc2VydCAgICAgMCwgZy5ub3JtZXJhIDEwMDAsMjAwMCwyICAgIyAxMDAwLDIwMDBcclxuZy5hc3NlcnQgICAyMDAsIGcubm9ybWVyYSA5MDAsMjAwMCwyICAgICMgMTEwMCwyMjAwXHJcbmcuYXNzZXJ0IC0xMjAwLCBnLm5vcm1lcmEgMTYwMCwyMDAwLDIgICAjICA0MDAsODAwXHJcbmcuYXNzZXJ0ICAtNTAwLCBnLm5vcm1lcmEgMTAwMCwyMDAwLDMgICAjICA1MDAsMTUwMFxyXG5nLmFzc2VydCAtMTAwMCwgZy5ub3JtZXJhIDEyMDAsMTgwMCw0ICAgIyAgMjAwLDgwMFxyXG5nLmFzc2VydCAtMTA2NywgZy5ub3JtZXJhIDE0MDAsMjQwMCw0ICAgIyAgMzMzLDEzMzNcclxuZy5hc3NlcnQgIC04MDAsIGcubm9ybWVyYSAxNjAwLDIwMDAsMS41ICMgIDgwMCwxMjAwXHJcbmcuYXNzZXJ0ICAgNDAwLCBnLm5vcm1lcmEgMTYwMCwyMDAwLDEuMiAjIDIwMDAsMjQwMFxyXG5nLmFzc2VydCAgMjQwMCwgZy5ub3JtZXJhIDE2MDAsMjAwMCwxLjEgIyA0MDAwLDQ0MDBcclxuXHJcbmcuc3VtID0gKHMpIC0+XHJcblx0cmVzID0gMFxyXG5cdGZvciBpdGVtIGluIHNcclxuXHRcdHJlcyArPSBwYXJzZUZsb2F0IGl0ZW1cclxuXHRyZXNcclxuZy5hc3NlcnQgNiwgZy5zdW0gJzAxMjAxMidcclxuXHJcbmcudHh0VCA9ICh2YWx1ZSwgdywgYWxpZ249d2luZG93LkNFTlRFUikgLT4gXHJcblx0aWYgdmFsdWUubGVuZ3RoID4gdyB0aGVuIHZhbHVlID0gdmFsdWUuc3Vic3RyaW5nIDAsd1xyXG5cdGlmIHZhbHVlLmxlbmd0aCA8IHcgYW5kIGFsaWduPT13aW5kb3cuUklHSFQgdGhlbiB2YWx1ZSA9IHZhbHVlLnBhZFN0YXJ0IHdcclxuXHRpZiBhbGlnbj09d2luZG93LkxFRlQgdGhlbiByZXMgPSB2YWx1ZSArIF8ucmVwZWF0ICcgJyx3LXZhbHVlLmxlbmd0aFxyXG5cdGlmIGFsaWduPT13aW5kb3cuUklHSFQgdGhlbiByZXMgPSBfLnJlcGVhdCgnICcsdy12YWx1ZS5sZW5ndGgpICsgdmFsdWVcclxuXHRpZiBhbGlnbj09d2luZG93LkNFTlRFUiBcclxuXHRcdGRpZmYgPSB3LXZhbHVlLmxlbmd0aFxyXG5cdFx0bHQgPSBfLnJlcGVhdCAnICcsKDErZGlmZikvLzJcclxuXHRcdHJ0ID0gXy5yZXBlYXQgJyAnLGRpZmYvLzJcclxuXHRcdHJlcyA9IGx0ICsgdmFsdWUgKyBydFxyXG5cdHJlc1xyXG5cclxuZy5wckJvdGggPSAoc2NvcmUpIC0+IFwiICN7JzDCvTEnW3Njb3JlXX0gLSAjeycxwr0wJ1tzY29yZV19IFwiXHJcblxyXG4jYXNzZXJ0IFwiICAgU3ZlbiAgIFwiLCB0eHRUIFwiU3ZlblwiLDEwIl19
//# sourceURL=c:\github\Dense\coffee\globals.coffee