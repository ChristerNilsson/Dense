// Generated by CoffeeScript 2.7.0
var xxx,
  indexOf = [].indexOf;

import {
  Tournament
} from './tournament.js';

import {
  Tables
} from './page_tables.js';

import {
  Names
} from './page_names.js';

import {
  Standings
} from './page_standings.js';

import {
  Active
} from './page_active.js';

export var print = console.log;

export var range = _.range;

export var scalex = function(x) {
  return x * g.ZOOM[g.state] / 20;
};

export var scaley = function(y) {
  return y * g.ZOOM[g.state];
};

export var g = {};

g.LPP = 14;

// parameters that somewhat affects matching
g.COST = 'QUADRATIC'; // QUADRATIC=1.01 or LINEAR=1

g.DIFF = 'ID'; // ID or ELO

g.COLORS = 1; // 1 or 2

g.TABLES = 0;

g.NAMES = 1;

g.STANDINGS = 2;

g.ACTIVE = 3;

g.message = "";

g.showType = function(a) {
  if (typeof a === 'string') {
    return `'${a}'`;
  } else {
    return a;
  }
};

export var assert = function(a, b) {
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

assert("2.0", g.myRound(1.99, 1));

assert("0.6", g.myRound(0.61, 1));

g.ints2strings = function(ints) {
  return `${ints}`;
};

assert("1,2,3", g.ints2strings([1, 2, 3]));

assert("1", g.ints2strings([1]));

assert("", g.ints2strings([]));

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

assert("123", g.res2string([1, 2, 3]));

assert("1", g.res2string([1]));

assert("", g.res2string([]));

g.zoomIn = function(n) {
  return g.ZOOM[g.state]++;
};

g.zoomOut = function(n) {
  return g.ZOOM[g.state]--;
};

g.setState = function(newState) {
  if (g.tournament.round > 0) {
    return g.state = newState;
  }
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

assert([0, 1, 2, 3], g.invert([0, 1, 2, 3]));

assert([3, 2, 0, 1], g.invert([2, 3, 1, 0]));

assert([2, 3, 1, 0], g.invert(g.invert([2, 3, 1, 0])));

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

assert([[2, 1], [3, 4], [12, 1], [12, 2]], xxx);

assert(true, [2] > [12]);

assert(true, "2" > "12");

assert(false, 2 > 12);

// xxx = [[2,1],[12,2],[12,1],[3,4]]
// assert [[2,1],[12,1],[12,2],[3,4]], _.sortBy(xxx, (x) -> [x[0],x[1]])
// assert [[3,4],[2,1],[12,1],[12,2]], _.sortBy(xxx, (x) -> -x[0])
// assert [[2,1],[12,1],[3,4],[12,2]], _.sortBy(xxx, (x) -> x[1])
// assert [[3,4],[12,1],[2,1],[12,2]], _.sortBy(xxx, (x) -> -x[1])
g.normera = function(a, b, k) {
  return Math.round((b - k * a) / (k - 1)); // Räknar ut vad som ska adderas till elotalen
};

assert(-406, g.normera(1406, 2406, 2)); // 1000,2000

assert(-1900, g.normera(1950, 2000, 2)); //   50,100

assert(0, g.normera(1000, 2000, 2)); // 1000,2000

assert(200, g.normera(900, 2000, 2)); // 1100,2200

assert(-1200, g.normera(1600, 2000, 2)); //  400,800

assert(-500, g.normera(1000, 2000, 3)); //  500,1500

assert(-1000, g.normera(1200, 1800, 4)); //  200,800

assert(-1067, g.normera(1400, 2400, 4)); //  333,1333

assert(-800, g.normera(1600, 2000, 1.5)); //  800,1200

assert(400, g.normera(1600, 2000, 1.2)); // 2000,2400

assert(2400, g.normera(1600, 2000, 1.1)); // 4000,4400

g.calcMissing = function() {
  var j, len, missing, p, ref;
  missing = 0;
  ref = g.tournament.persons;
  for (j = 0, len = ref.length; j < len; j++) {
    p = ref[j];
    if (p.active && p.res.length < p.col.length) {
      missing++;
    }
  }
  g.message = `${Math.floor(missing / 2)} results missing`;
  return missing === 0;
};

g.sum = function(s) {
  var item, j, len, res;
  res = 0;
  for (j = 0, len = s.length; j < len; j++) {
    item = s[j];
    res += parseFloat(item);
  }
  return res;
};

assert(6, g.sum('012012'));

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFscy5qcyIsInNvdXJjZVJvb3QiOiIuLlxcIiwic291cmNlcyI6WyJjb2ZmZWVcXGdsb2JhbHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLEdBQUE7RUFBQTs7QUFBQSxPQUFBO0VBQVMsVUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsU0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBTyxLQUFBLEdBQVEsT0FBTyxDQUFDOztBQUN2QixPQUFBLElBQU8sS0FBQSxHQUFRLENBQUMsQ0FBQzs7QUFDakIsT0FBQSxJQUFPLE1BQUEsR0FBUyxRQUFBLENBQUMsQ0FBRCxDQUFBO1NBQU8sQ0FBQSxHQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUgsQ0FBVixHQUFzQjtBQUE3Qjs7QUFDaEIsT0FBQSxJQUFPLE1BQUEsR0FBUyxRQUFBLENBQUMsQ0FBRCxDQUFBO1NBQU8sQ0FBQSxHQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUg7QUFBakI7O0FBRWhCLE9BQUEsSUFBTyxDQUFBLEdBQUksQ0FBQTs7QUFFWCxDQUFDLENBQUMsR0FBRixHQUFRLEdBYlI7OztBQWdCQSxDQUFDLENBQUMsSUFBRixHQUFTLFlBaEJUOztBQWlCQSxDQUFDLENBQUMsSUFBRixHQUFTLEtBakJUOztBQWtCQSxDQUFDLENBQUMsTUFBRixHQUFXLEVBbEJYOztBQW9CQSxDQUFDLENBQUMsTUFBRixHQUFjOztBQUNkLENBQUMsQ0FBQyxLQUFGLEdBQWM7O0FBQ2QsQ0FBQyxDQUFDLFNBQUYsR0FBYzs7QUFDZCxDQUFDLENBQUMsTUFBRixHQUFjOztBQUVkLENBQUMsQ0FBQyxPQUFGLEdBQVk7O0FBRVosQ0FBQyxDQUFDLFFBQUYsR0FBYSxR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OztFQUNBLElBQUcsS0FBQSxLQUFPLE1BQU0sQ0FBQyxLQUFqQjtJQUE0QixHQUFBLEdBQU0sQ0FBQyxDQUFDLE1BQUYsQ0FBUyxHQUFULEVBQWEsQ0FBQSxHQUFFLEtBQUssQ0FBQyxNQUFyQixDQUFBLEdBQStCLE1BQWpFOztFQUNBLElBQUcsS0FBQSxLQUFPLE1BQU0sQ0FBQyxNQUFqQjtJQUNDLElBQUEsR0FBTyxDQUFBLEdBQUUsS0FBSyxDQUFDO0lBQ2YsRUFBQSxHQUFLLENBQUMsQ0FBQyxNQUFGLENBQVMsR0FBVCxhQUFhLENBQUMsQ0FBQSxHQUFFLElBQUgsSUFBVSxFQUF2QjtJQUNMLEVBQUEsR0FBSyxDQUFDLENBQUMsTUFBRixDQUFTLEdBQVQsYUFBYSxPQUFNLEVBQW5CO0lBQ0wsR0FBQSxHQUFNLEVBQUEsR0FBSyxLQUFMLEdBQWEsR0FKcEI7O1NBS0E7QUFWUTs7QUFZVCxDQUFDLENBQUMsTUFBRixHQUFXLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FBVyxFQUFBLENBQUEsQ0FBSSxLQUFLLENBQUMsS0FBRCxDQUFULENBQUEsR0FBQSxDQUFBLENBQXNCLEtBQUssQ0FBQyxLQUFELENBQTNCLEVBQUE7QUFBWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRvdXJuYW1lbnQgfSBmcm9tICcuL3RvdXJuYW1lbnQuanMnIFxyXG5pbXBvcnQgeyBUYWJsZXMgfSBmcm9tICcuL3BhZ2VfdGFibGVzLmpzJyBcclxuaW1wb3J0IHsgTmFtZXMgfSBmcm9tICcuL3BhZ2VfbmFtZXMuanMnIFxyXG5pbXBvcnQgeyBTdGFuZGluZ3MgfSBmcm9tICcuL3BhZ2Vfc3RhbmRpbmdzLmpzJyBcclxuaW1wb3J0IHsgQWN0aXZlIH0gZnJvbSAnLi9wYWdlX2FjdGl2ZS5qcycgXHJcblxyXG5leHBvcnQgcHJpbnQgPSBjb25zb2xlLmxvZ1xyXG5leHBvcnQgcmFuZ2UgPSBfLnJhbmdlXHJcbmV4cG9ydCBzY2FsZXggPSAoeCkgLT4geCAqIGcuWk9PTVtnLnN0YXRlXSAvIDIwXHJcbmV4cG9ydCBzY2FsZXkgPSAoeSkgLT4geSAqIGcuWk9PTVtnLnN0YXRlXVxyXG5cclxuZXhwb3J0IGcgPSB7fVxyXG5cclxuZy5MUFAgPSAxNFxyXG5cclxuIyBwYXJhbWV0ZXJzIHRoYXQgc29tZXdoYXQgYWZmZWN0cyBtYXRjaGluZ1xyXG5nLkNPU1QgPSAnUVVBRFJBVElDJyAjIFFVQURSQVRJQz0xLjAxIG9yIExJTkVBUj0xXHJcbmcuRElGRiA9ICdJRCcgIyBJRCBvciBFTE9cclxuZy5DT0xPUlMgPSAxICMgMSBvciAyXHJcblxyXG5nLlRBQkxFUyAgICA9IDBcclxuZy5OQU1FUyAgICAgPSAxXHJcbmcuU1RBTkRJTkdTID0gMlxyXG5nLkFDVElWRSAgICA9IDNcclxuXHJcbmcubWVzc2FnZSA9IFwiXCJcclxuXHJcbmcuc2hvd1R5cGUgPSAoYSkgLT4gaWYgdHlwZW9mIGEgPT0gJ3N0cmluZycgdGhlbiBcIicje2F9J1wiIGVsc2UgYVxyXG5leHBvcnQgYXNzZXJ0ID0gKGEsYikgLT4gaWYgbm90IF8uaXNFcXVhbCBhLGIgdGhlbiBwcmludCBcIkFzc2VydCBmYWlsdXJlOiAje0pTT04uc3RyaW5naWZ5IGF9ICE9ICN7SlNPTi5zdHJpbmdpZnkgYn1cIlxyXG5cclxuZy5vayA9IChwMCwgcDEpIC0+IHAwLmlkICE9IHAxLmlkIGFuZCBwMC5pZCBub3QgaW4gcDEub3BwIGFuZCBhYnMocDAuYmFsYW5zKCkgKyBwMS5iYWxhbnMoKSkgPD0gZy5DT0xPUlNcclxuZy5vdGhlciA9IChjb2wpIC0+IGlmIGNvbCA9PSAnYicgdGhlbiAndycgZWxzZSAnYidcclxuXHJcbmcubXlSb3VuZCA9ICh4LGRlY3MpIC0+IHgudG9GaXhlZCBkZWNzXHJcbmFzc2VydCBcIjIuMFwiLCBnLm15Um91bmQgMS45OSwxXHJcbmFzc2VydCBcIjAuNlwiLCBnLm15Um91bmQgMC42MSwxXHJcblxyXG5nLmludHMyc3RyaW5ncyA9IChpbnRzKSAtPiBcIiN7aW50c31cIlxyXG5hc3NlcnQgXCIxLDIsM1wiLCBnLmludHMyc3RyaW5ncyBbMSwyLDNdXHJcbmFzc2VydCBcIjFcIiwgZy5pbnRzMnN0cmluZ3MgWzFdXHJcbmFzc2VydCBcIlwiLCBnLmludHMyc3RyaW5ncyBbXVxyXG5cclxuZy5yZXMyc3RyaW5nID0gKGludHMpIC0+IChpLnRvU3RyaW5nKCkgZm9yIGkgaW4gaW50cykuam9pbiAnJ1xyXG5hc3NlcnQgXCIxMjNcIiwgZy5yZXMyc3RyaW5nIFsxLDIsM11cclxuYXNzZXJ0IFwiMVwiLCBnLnJlczJzdHJpbmcgWzFdXHJcbmFzc2VydCBcIlwiLCBnLnJlczJzdHJpbmcgW11cclxuXHJcbmcuem9vbUluICA9IChuKSAtPiBnLlpPT01bZy5zdGF0ZV0rK1xyXG5nLnpvb21PdXQgPSAobikgLT4gZy5aT09NW2cuc3RhdGVdLS1cclxuZy5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgLT4gaWYgZy50b3VybmFtZW50LnJvdW5kID4gMCB0aGVuIGcuc3RhdGUgPSBuZXdTdGF0ZVxyXG5cclxuZy5pbnZlcnQgPSAoYXJyKSAtPlxyXG5cdHJlcyA9IFtdXHJcblx0Zm9yIGkgaW4gcmFuZ2UgYXJyLmxlbmd0aFxyXG5cdFx0cmVzW2FycltpXV0gPSBpXHJcblx0cmV0dXJuIHJlc1xyXG5hc3NlcnQgWzAsMSwyLDNdLCBnLmludmVydCBbMCwxLDIsM11cclxuYXNzZXJ0IFszLDIsMCwxXSwgZy5pbnZlcnQgWzIsMywxLDBdXHJcbmFzc2VydCBbMiwzLDEsMF0sIGcuaW52ZXJ0IGcuaW52ZXJ0IFsyLDMsMSwwXVxyXG5cclxueHh4ID0gW1syLDFdLFsxMiwyXSxbMTIsMV0sWzMsNF1dXHJcbnh4eC5zb3J0IChhLGIpIC0+IFxyXG5cdGRpZmYgPSBhWzBdIC0gYlswXSBcclxuXHRpZiBkaWZmID09IDAgdGhlbiBhWzFdIC0gYlsxXSBlbHNlIGRpZmZcclxuYXNzZXJ0IFtbMiwxXSwgWzMsNF0sIFsxMiwxXSwgWzEyLDJdXSwgeHh4XHRcclxuYXNzZXJ0IHRydWUsIFsyXSA+IFsxMl1cclxuYXNzZXJ0IHRydWUsIFwiMlwiID4gXCIxMlwiXHJcbmFzc2VydCBmYWxzZSwgMiA+IDEyXHJcblxyXG4jIHh4eCA9IFtbMiwxXSxbMTIsMl0sWzEyLDFdLFszLDRdXVxyXG4jIGFzc2VydCBbWzIsMV0sWzEyLDFdLFsxMiwyXSxbMyw0XV0sIF8uc29ydEJ5KHh4eCwgKHgpIC0+IFt4WzBdLHhbMV1dKVxyXG4jIGFzc2VydCBbWzMsNF0sWzIsMV0sWzEyLDFdLFsxMiwyXV0sIF8uc29ydEJ5KHh4eCwgKHgpIC0+IC14WzBdKVxyXG4jIGFzc2VydCBbWzIsMV0sWzEyLDFdLFszLDRdLFsxMiwyXV0sIF8uc29ydEJ5KHh4eCwgKHgpIC0+IHhbMV0pXHJcbiMgYXNzZXJ0IFtbMyw0XSxbMTIsMV0sWzIsMV0sWzEyLDJdXSwgXy5zb3J0QnkoeHh4LCAoeCkgLT4gLXhbMV0pXHJcblxyXG5nLm5vcm1lcmEgPSAoYSxiLGspIC0+IE1hdGgucm91bmQgKGIgLSBrKmEpIC8gKGstMSkgIyBSw6RrbmFyIHV0IHZhZCBzb20gc2thIGFkZGVyYXMgdGlsbCBlbG90YWxlblxyXG5hc3NlcnQgIC00MDYsIGcubm9ybWVyYSAxNDA2LDI0MDYsMiAgICMgMTAwMCwyMDAwXHJcbmFzc2VydCAtMTkwMCwgZy5ub3JtZXJhIDE5NTAsMjAwMCwyICAgIyAgIDUwLDEwMFxyXG5hc3NlcnQgICAgIDAsIGcubm9ybWVyYSAxMDAwLDIwMDAsMiAgICMgMTAwMCwyMDAwXHJcbmFzc2VydCAgIDIwMCwgZy5ub3JtZXJhIDkwMCwyMDAwLDIgICAgIyAxMTAwLDIyMDBcclxuYXNzZXJ0IC0xMjAwLCBnLm5vcm1lcmEgMTYwMCwyMDAwLDIgICAjICA0MDAsODAwXHJcbmFzc2VydCAgLTUwMCwgZy5ub3JtZXJhIDEwMDAsMjAwMCwzICAgIyAgNTAwLDE1MDBcclxuYXNzZXJ0IC0xMDAwLCBnLm5vcm1lcmEgMTIwMCwxODAwLDQgICAjICAyMDAsODAwXHJcbmFzc2VydCAtMTA2NywgZy5ub3JtZXJhIDE0MDAsMjQwMCw0ICAgIyAgMzMzLDEzMzNcclxuYXNzZXJ0ICAtODAwLCBnLm5vcm1lcmEgMTYwMCwyMDAwLDEuNSAjICA4MDAsMTIwMFxyXG5hc3NlcnQgICA0MDAsIGcubm9ybWVyYSAxNjAwLDIwMDAsMS4yICMgMjAwMCwyNDAwXHJcbmFzc2VydCAgMjQwMCwgZy5ub3JtZXJhIDE2MDAsMjAwMCwxLjEgIyA0MDAwLDQ0MDBcclxuXHJcbmcuY2FsY01pc3NpbmcgPSAtPlxyXG5cdG1pc3NpbmcgPSAwXHJcblx0Zm9yIHAgaW4gZy50b3VybmFtZW50LnBlcnNvbnNcclxuXHRcdGlmIHAuYWN0aXZlIGFuZCBwLnJlcy5sZW5ndGggPCBwLmNvbC5sZW5ndGggdGhlbiBtaXNzaW5nKytcclxuXHRnLm1lc3NhZ2UgPSBcIiN7bWlzc2luZy8vMn0gcmVzdWx0cyBtaXNzaW5nXCJcclxuXHRtaXNzaW5nID09IDBcclxuXHJcbmcuc3VtID0gKHMpIC0+XHJcblx0cmVzID0gMFxyXG5cdGZvciBpdGVtIGluIHNcclxuXHRcdHJlcyArPSBwYXJzZUZsb2F0IGl0ZW1cclxuXHRyZXNcclxuYXNzZXJ0IDYsIGcuc3VtICcwMTIwMTInXHJcblxyXG5nLnR4dFQgPSAodmFsdWUsIHcsIGFsaWduPXdpbmRvdy5DRU5URVIpIC0+IFxyXG5cdGlmIHZhbHVlLmxlbmd0aCA+IHcgdGhlbiB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZyAwLHdcclxuXHRpZiB2YWx1ZS5sZW5ndGggPCB3IGFuZCBhbGlnbj09d2luZG93LlJJR0hUIHRoZW4gdmFsdWUgPSB2YWx1ZS5wYWRTdGFydCB3XHJcblx0aWYgYWxpZ249PXdpbmRvdy5MRUZUIHRoZW4gcmVzID0gdmFsdWUgKyBfLnJlcGVhdCAnICcsdy12YWx1ZS5sZW5ndGhcclxuXHRpZiBhbGlnbj09d2luZG93LlJJR0hUIHRoZW4gcmVzID0gXy5yZXBlYXQoJyAnLHctdmFsdWUubGVuZ3RoKSArIHZhbHVlXHJcblx0aWYgYWxpZ249PXdpbmRvdy5DRU5URVIgXHJcblx0XHRkaWZmID0gdy12YWx1ZS5sZW5ndGhcclxuXHRcdGx0ID0gXy5yZXBlYXQgJyAnLCgxK2RpZmYpLy8yXHJcblx0XHRydCA9IF8ucmVwZWF0ICcgJyxkaWZmLy8yXHJcblx0XHRyZXMgPSBsdCArIHZhbHVlICsgcnRcclxuXHRyZXNcclxuXHJcbmcucHJCb3RoID0gKHNjb3JlKSAtPiBcIiAjeycwwr0xJ1tzY29yZV19IC0gI3snMcK9MCdbc2NvcmVdfSBcIlxyXG4iXX0=
//# sourceURL=c:\github\Dense\coffee\globals.coffee