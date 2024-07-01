// Generated by CoffeeScript 2.7.0
var indexOf = [].indexOf;

import {
  g,
  print,
  range,
  scalex,
  scaley
} from './globals.js';

export var Player = class Player {
  constructor(id1, name = "", elo = "1400", opp = [], col1 = "", res1 = "") {
    this.eloSum = this.eloSum.bind(this);
    this.id = id1;
    this.name = name;
    this.elo = elo;
    this.opp = opp;
    this.col = col1;
    this.res = res1;
    this.active = true;
  }

  toString() {
    return `${this.id} ${this.name} elo:${this.elo} ${this.col} res:${this.res} opp:[${this.opp}] score:${this.score().toFixed(1)} eloSum:${this.eloSum(g.tournament.round).toFixed(0)}`;
  }

  toggle() {
    var p;
    this.active = !this.active;
    return g.tournament.paused = (function() {
      var j, len, ref, results;
      ref = g.tournament.persons;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        p = ref[j];
        if (!p.active) {
          results.push(p.id);
        }
      }
      return results;
    })();
  }

  eloSum(rounds) {
    var j, len, r, ref, summa;
    if (g.tournament.round === 0) {
      return 0;
    }
    summa = 0;
    ref = range(rounds);
    for (j = 0, len = ref.length; j < len; j++) {
      r = ref[j];
      if (this.opp[r] !== -1) {
        summa += g.tournament.persons[this.opp[r]].elo * g.tournament.bonus[this.col[r] + this.res[r]];
      }
    }
    return summa;
  }

  avgEloDiff() {
    var id, j, len, ref, res;
    res = [];
    ref = this.opp.slice(0, this.opp.length - 1);
    for (j = 0, len = ref.length; j < len; j++) {
      id = ref[j];
      //res.push abs normera(@elo) - normera(tournament.persons[id].elo)
      if (id !== -1) {
        res.push(abs(this.elo - g.tournament.persons[id].elo));
      }
    }
    if (res.length === 0) {
      return 0;
    } else {
      return sum(res) / res.length;
    }
  }

  balans() { // färgbalans
    var ch, j, len, ref, result;
    result = 0;
    ref = this.col;
    for (j = 0, len = ref.length; j < len; j++) {
      ch = ref[j];
      if (ch === 'b') {
        result -= 1;
      }
      if (ch === 'w') {
        result += 1;
      }
    }
    return result;
  }

  score() {
    var i, j, key, len, n, ref, res, result, sp;
    result = 0;
    n = g.tournament.round;
    sp = g.tournament.sp;
    ref = range(n);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (i < this.col.length && i < this.res.length) {
        key = this.col[i] + this.res[i];
        //result += {'w2': 1-sp, 'b2': 1, 'w1': 0.5-sp, 'b1': 0.5+sp, 'w0': 0, 'b0': sp}[key]
        res = {
          'w2': 1,
          'b2': 1 + 2 * sp,
          'w1': 0.5 - sp,
          'b1': 0.5 + sp,
          'w0': 0,
          'b0': 0
        }[key];
      }
    }
    //print 'id,score',@id, @res, result,n
    return result;
  }

  read(player) {
    var arr, col, j, len, ocr, ocrs;
    
    // (1234|Christer|(12w0|23b½|14w)) 
    // (1234|Christer) 
    // print 'read',player
    this.elo = parseInt(player[0]);
    this.name = player[1];
    this.opp = [];
    this.col = "";
    this.res = "";
    if (player.length < 3) {
      return;
    }
    ocrs = player[2];
    for (j = 0, len = ocrs.length; j < len; j++) {
      ocr = ocrs[j];
      if (indexOf.call(ocr, 'w') >= 0) {
        col = 'w';
      } else {
        col = 'b';
      }
      arr = ocr.split(col);
      this.opp.push(parseInt(arr[0]));
      this.col += col;
      if (arr.length === 2 && arr[1].length === 1) {
        this.res += {
          '0': '0',
          '½': '1',
          '1': '2'
        }[arr[1]];
      }
    }
    return print(this);
  }

  write() { // (1234|Christer|(12w0|23b½|14w)) Elo:1234 Name:Christer opponent:23 color:b result:½
    var i, nn, ocr, res;
    res = [];
    res.push(this.elo);
    res.push(this.name.replaceAll(' ', '_'));
    nn = this.opp.length - 1;
    ocr = (function() {
      var j, len, ref, results;
      ref = range(nn);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        results.push(`${this.opp[i]}${this.col[i]}${i < nn ? "0½1"[this.res[i]] : ''}`);
      }
      return results;
    }).call(this);
    res.push('(' + ocr.join('|') + ')');
    return res.join('|');
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6Ii4uXFwiLCJzb3VyY2VzIjpbImNvZmZlZVxccGxheWVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsQ0FBVDtFQUFXLEtBQVg7RUFBaUIsS0FBakI7RUFBdUIsTUFBdkI7RUFBOEIsTUFBOUI7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxTQUFOLE1BQUEsT0FBQTtFQUNOLFdBQWMsSUFBQSxTQUFZLEVBQVosUUFBcUIsTUFBckIsUUFBa0MsRUFBbEMsU0FBMkMsRUFBM0MsU0FBb0QsRUFBcEQsQ0FBQTtRQVFkLENBQUEsYUFBQSxDQUFBO0lBUmUsSUFBQyxDQUFBO0lBQUksSUFBQyxDQUFBO0lBQVMsSUFBQyxDQUFBO0lBQVksSUFBQyxDQUFBO0lBQVEsSUFBQyxDQUFBO0lBQVEsSUFBQyxDQUFBO0lBQVcsSUFBQyxDQUFBLE1BQUQsR0FBVTtFQUFyRTs7RUFFZCxRQUFXLENBQUEsQ0FBQTtXQUFHLENBQUEsQ0FBQSxDQUFHLElBQUMsQ0FBQSxFQUFKLEVBQUEsQ0FBQSxDQUFVLElBQUMsQ0FBQSxJQUFYLENBQUEsS0FBQSxDQUFBLENBQXVCLElBQUMsQ0FBQSxHQUF4QixFQUFBLENBQUEsQ0FBK0IsSUFBQyxDQUFBLEdBQWhDLENBQUEsS0FBQSxDQUFBLENBQTJDLElBQUMsQ0FBQSxHQUE1QyxDQUFBLE1BQUEsQ0FBQSxDQUF3RCxJQUFDLENBQUEsR0FBekQsQ0FBQSxRQUFBLENBQUEsQ0FBdUUsSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUFRLENBQUMsT0FBVCxDQUFpQixDQUFqQixDQUF2RSxDQUFBLFFBQUEsQ0FBQSxDQUFxRyxJQUFDLENBQUEsTUFBRCxDQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBckIsQ0FBMkIsQ0FBQyxPQUE1QixDQUFvQyxDQUFwQyxDQUFyRyxDQUFBO0VBQUg7O0VBRVgsTUFBUyxDQUFBLENBQUE7QUFDVixRQUFBO0lBQUUs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RSxHQUFBLEdBQU07SUFDTixHQUFHLENBQUMsSUFBSixDQUFTLElBQUMsQ0FBQSxHQUFWO0lBQ0EsR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFDLENBQUEsSUFBSSxDQUFDLFVBQU4sQ0FBaUIsR0FBakIsRUFBcUIsR0FBckIsQ0FBVDtJQUNBLEVBQUEsR0FBSyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsR0FBYztJQUNuQixHQUFBOztBQUFPO0FBQUE7TUFBQSxLQUFBLHFDQUFBOztxQkFBQSxDQUFBLENBQUEsQ0FBRyxJQUFDLENBQUEsR0FBRyxDQUFDLENBQUQsQ0FBUCxDQUFBLENBQUEsQ0FBYSxJQUFDLENBQUEsR0FBRyxDQUFDLENBQUQsQ0FBakIsQ0FBQSxDQUFBLENBQTBCLENBQUEsR0FBSSxFQUFQLEdBQWUsS0FBSyxDQUFDLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBRCxDQUFMLENBQXBCLEdBQW1DLEVBQTFELENBQUE7TUFBQSxDQUFBOzs7SUFDUCxHQUFHLENBQUMsSUFBSixDQUFTLEdBQUEsR0FBTSxHQUFHLENBQUMsSUFBSixDQUFTLEdBQVQsQ0FBTixHQUFzQixHQUEvQjtXQUNBLEdBQUcsQ0FBQyxJQUFKLENBQVMsR0FBVDtFQVBPOztBQTlERiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGcscHJpbnQscmFuZ2Usc2NhbGV4LHNjYWxleSB9IGZyb20gJy4vZ2xvYmFscy5qcycgXHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyXHJcblx0Y29uc3RydWN0b3IgOiAoQGlkLCBAbmFtZT1cIlwiLCBAZWxvPVwiMTQwMFwiLCBAb3BwPVtdLCBAY29sPVwiXCIsIEByZXM9XCJcIikgLT4gQGFjdGl2ZSA9IHRydWVcclxuXHJcblx0dG9TdHJpbmcgOiAtPiBcIiN7QGlkfSAje0BuYW1lfSBlbG86I3tAZWxvfSAje0Bjb2x9IHJlczoje0ByZXN9IG9wcDpbI3tAb3BwfV0gc2NvcmU6I3tAc2NvcmUoKS50b0ZpeGVkKDEpfSBlbG9TdW06I3tAZWxvU3VtKGcudG91cm5hbWVudC5yb3VuZCkudG9GaXhlZCgwKX1cIlxyXG5cclxuXHR0b2dnbGUgOiAtPiBcclxuXHRcdEBhY3RpdmUgPSBub3QgQGFjdGl2ZVxyXG5cdFx0Zy50b3VybmFtZW50LnBhdXNlZCA9IChwLmlkIGZvciBwIGluIGcudG91cm5hbWVudC5wZXJzb25zIHdoZW4gbm90IHAuYWN0aXZlKVxyXG5cclxuXHRlbG9TdW0gOiAocm91bmRzKSA9PiBcclxuXHRcdGlmIGcudG91cm5hbWVudC5yb3VuZCA9PSAwIHRoZW4gcmV0dXJuIDBcclxuXHRcdHN1bW1hID0gMFxyXG5cdFx0Zm9yIHIgaW4gcmFuZ2Ugcm91bmRzXHJcblx0XHRcdGlmIEBvcHBbcl0gIT0gLTEgdGhlbiBzdW1tYSArPSBnLnRvdXJuYW1lbnQucGVyc29uc1tAb3BwW3JdXS5lbG8gKiBnLnRvdXJuYW1lbnQuYm9udXNbQGNvbFtyXSArIEByZXNbcl1dIFxyXG5cdFx0c3VtbWFcclxuXHJcblx0YXZnRWxvRGlmZiA6IC0+XHJcblx0XHRyZXMgPSBbXVxyXG5cdFx0Zm9yIGlkIGluIEBvcHAuc2xpY2UgMCwgQG9wcC5sZW5ndGggLSAxXHJcblx0XHRcdCNyZXMucHVzaCBhYnMgbm9ybWVyYShAZWxvKSAtIG5vcm1lcmEodG91cm5hbWVudC5wZXJzb25zW2lkXS5lbG8pXHJcblx0XHRcdGlmIGlkICE9IC0xIHRoZW4gcmVzLnB1c2ggYWJzIEBlbG8gLSBnLnRvdXJuYW1lbnQucGVyc29uc1tpZF0uZWxvXHJcblx0XHRpZiByZXMubGVuZ3RoID09IDAgdGhlbiAwIGVsc2Ugc3VtKHJlcykgLyByZXMubGVuZ3RoXHJcblxyXG5cdGJhbGFucyA6IC0+ICMgZsOkcmdiYWxhbnNcclxuXHRcdHJlc3VsdCA9IDBcclxuXHRcdGZvciBjaCBpbiBAY29sXHJcblx0XHRcdGlmIGNoPT0nYicgdGhlbiByZXN1bHQgLT0gMVxyXG5cdFx0XHRpZiBjaD09J3cnIHRoZW4gcmVzdWx0ICs9IDFcclxuXHRcdHJlc3VsdFxyXG5cclxuXHRzY29yZSA6IC0+XHJcblx0XHRyZXN1bHQgPSAwXHJcblx0XHRuID0gZy50b3VybmFtZW50LnJvdW5kXHJcblx0XHRzcCA9IGcudG91cm5hbWVudC5zcFxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgblxyXG5cdFx0XHRpZiBpIDwgQGNvbC5sZW5ndGggYW5kIGkgPCBAcmVzLmxlbmd0aFxyXG5cdFx0XHRcdGtleSA9IEBjb2xbaV0gKyBAcmVzW2ldXHJcblx0XHRcdFx0I3Jlc3VsdCArPSB7J3cyJzogMS1zcCwgJ2IyJzogMSwgJ3cxJzogMC41LXNwLCAnYjEnOiAwLjUrc3AsICd3MCc6IDAsICdiMCc6IHNwfVtrZXldXHJcblx0XHRcdFx0cmVzID0geyd3Mic6IDEsICdiMic6IDErMipzcCwgJ3cxJzogMC41LXNwLCAnYjEnOiAwLjUrc3AsICd3MCc6IDAsICdiMCc6IDB9W2tleV1cclxuXHRcdCNwcmludCAnaWQsc2NvcmUnLEBpZCwgQHJlcywgcmVzdWx0LG5cclxuXHRcdHJlc3VsdFxyXG5cclxuXHRyZWFkIDogKHBsYXllcikgLT4gXHJcblx0XHQjICgxMjM0fENocmlzdGVyfCgxMncwfDIzYsK9fDE0dykpIFxyXG5cdFx0IyAoMTIzNHxDaHJpc3RlcikgXHJcblx0XHQjIHByaW50ICdyZWFkJyxwbGF5ZXJcclxuXHRcdEBlbG8gPSBwYXJzZUludCBwbGF5ZXJbMF1cclxuXHRcdEBuYW1lID0gcGxheWVyWzFdXHJcblx0XHRAb3BwID0gW11cclxuXHRcdEBjb2wgPSBcIlwiXHJcblx0XHRAcmVzID0gXCJcIlxyXG5cdFx0aWYgcGxheWVyLmxlbmd0aCA8IDMgdGhlbiByZXR1cm5cclxuXHRcdG9jcnMgPSBwbGF5ZXJbMl1cclxuXHRcdGZvciBvY3IgaW4gb2Nyc1xyXG5cdFx0XHRpZiAndycgaW4gb2NyIHRoZW4gY29sPSd3JyBlbHNlIGNvbD0nYidcclxuXHRcdFx0YXJyID0gb2NyLnNwbGl0IGNvbFxyXG5cdFx0XHRAb3BwLnB1c2ggcGFyc2VJbnQgYXJyWzBdXHJcblx0XHRcdEBjb2wgKz0gY29sXHJcblx0XHRcdGlmIGFyci5sZW5ndGggPT0gMiBhbmQgYXJyWzFdLmxlbmd0aCA9PSAxXHJcblx0XHRcdFx0QHJlcyArPSB7JzAnOicwJywgJ8K9JzonMScsICcxJzonMid9W2FyclsxXV0gIFxyXG5cdFx0cHJpbnQgQFxyXG5cclxuXHR3cml0ZSA6IC0+ICMgKDEyMzR8Q2hyaXN0ZXJ8KDEydzB8MjNiwr18MTR3KSkgRWxvOjEyMzQgTmFtZTpDaHJpc3RlciBvcHBvbmVudDoyMyBjb2xvcjpiIHJlc3VsdDrCvVxyXG5cdFx0cmVzID0gW11cclxuXHRcdHJlcy5wdXNoIEBlbG9cclxuXHRcdHJlcy5wdXNoIEBuYW1lLnJlcGxhY2VBbGwgJyAnLCdfJ1xyXG5cdFx0bm4gPSBAb3BwLmxlbmd0aCAtIDFcclxuXHRcdG9jciA9IChcIiN7QG9wcFtpXX0je0Bjb2xbaV19I3tpZiBpIDwgbm4gdGhlbiBcIjDCvTFcIltAcmVzW2ldXSBlbHNlICcnfVwiIGZvciBpIGluIHJhbmdlKG5uKSkgXHJcblx0XHRyZXMucHVzaCAnKCcgKyBvY3Iuam9pbignfCcpICsgJyknXHJcblx0XHRyZXMuam9pbiAnfCciXX0=
//# sourceURL=c:\github\Dense\coffee\player.coffee