// Generated by CoffeeScript 2.7.0
var indexOf = [].indexOf;

import {
  g,
  print,
  range,
  scale
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

  // @t = g.tournament
  toString() {
    return `${this.id} ${this.name} elo:${this.elo} ${this.col} res:${this.res} opp:[${this.opp}] score:${this.score().toFixed(1)} eloSum:${this.eloSum().toFixed(0)}`;
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

  eloSum() {
    var j, len, r, ref, summa;
    if (g.tournament.round === 0) {
      return 0;
    }
    summa = 0;
    ref = range(g.tournament.round);
    // - 1
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6Ii4uXFwiLCJzb3VyY2VzIjpbImNvZmZlZVxccGxheWVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsQ0FBVDtFQUFXLEtBQVg7RUFBaUIsS0FBakI7RUFBdUIsS0FBdkI7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxTQUFOLE1BQUEsT0FBQTtFQUNOLFdBQWMsSUFBQSxTQUFZLEVBQVosUUFBcUIsTUFBckIsUUFBa0MsRUFBbEMsU0FBMkMsRUFBM0MsU0FBb0QsRUFBcEQsQ0FBQTtRQVVkLENBQUEsYUFBQSxDQUFBO0lBVmUsSUFBQyxDQUFBO0lBQUksSUFBQyxDQUFBO0lBQVMsSUFBQyxDQUFBO0lBQVksSUFBQyxDQUFBO0lBQVEsSUFBQyxDQUFBO0lBQVEsSUFBQyxDQUFBO0lBQzdELElBQUMsQ0FBQSxNQUFELEdBQVU7RUFERyxDQUFmOzs7RUFJQyxRQUFXLENBQUEsQ0FBQTtXQUFHLENBQUEsQ0FBQSxDQUFHLElBQUMsQ0FBQSxFQUFKLEVBQUEsQ0FBQSxDQUFVLElBQUMsQ0FBQSxJQUFYLENBQUEsS0FBQSxDQUFBLENBQXVCLElBQUMsQ0FBQSxHQUF4QixFQUFBLENBQUEsQ0FBK0IsSUFBQyxDQUFBLEdBQWhDLENBQUEsS0FBQSxDQUFBLENBQTJDLElBQUMsQ0FBQSxHQUE1QyxDQUFBLE1BQUEsQ0FBQSxDQUF3RCxJQUFDLENBQUEsR0FBekQsQ0FBQSxRQUFBLENBQUEsQ0FBdUUsSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUFRLENBQUMsT0FBVCxDQUFpQixDQUFqQixDQUF2RSxDQUFBLFFBQUEsQ0FBQSxDQUFxRyxJQUFDLENBQUEsTUFBRCxDQUFBLENBQVMsQ0FBQyxPQUFWLENBQWtCLENBQWxCLENBQXJHLENBQUE7RUFBSDs7RUFFWCxNQUFTLENBQUEsQ0FBQTtBQUNWLFFBQUE7SUFBRSxJQUFDLENBQUEsTUFBRCxHQUFVLENBQUksSUFBQyxDQUFB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QUFDLENBQUEsR0FBVjtJQUNBLEdBQUcsQ0FBQyxJQUFKLENBQVMsSUFBQyxDQUFBLElBQUksQ0FBQyxVQUFOLENBQWlCLEdBQWpCLEVBQXFCLEdBQXJCLENBQVQ7SUFDQSxFQUFBLEdBQUssSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEdBQWM7SUFDbkIsR0FBQTs7QUFBTztBQUFBO01BQUEsS0FBQSxxQ0FBQTs7cUJBQUEsQ0FBQSxDQUFBLENBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFELENBQVAsQ0FBQSxDQUFBLENBQWEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFELENBQWpCLENBQUEsQ0FBQSxDQUEwQixDQUFBLEdBQUksRUFBUCxHQUFlLEtBQUssQ0FBQyxJQUFDLENBQUEsR0FBRyxDQUFDLENBQUQsQ0FBTCxDQUFwQixHQUFtQyxFQUExRCxDQUFBO01BQUEsQ0FBQTs7O0lBQ1AsR0FBRyxDQUFDLElBQUosQ0FBUyxHQUFBLEdBQU0sR0FBRyxDQUFDLElBQUosQ0FBUyxHQUFULENBQU4sR0FBc0IsR0FBL0I7V0FDQSxHQUFHLENBQUMsSUFBSixDQUFTLEdBQVQ7RUFQTzs7QUFoRUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnLHByaW50LHJhbmdlLHNjYWxlIH0gZnJvbSAnLi9nbG9iYWxzLmpzJyBcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXJcclxuXHRjb25zdHJ1Y3RvciA6IChAaWQsIEBuYW1lPVwiXCIsIEBlbG89XCIxNDAwXCIsIEBvcHA9W10sIEBjb2w9XCJcIiwgQHJlcz1cIlwiKSAtPiBcclxuXHRcdEBhY3RpdmUgPSB0cnVlXHJcblx0XHQjIEB0ID0gZy50b3VybmFtZW50XHJcblxyXG5cdHRvU3RyaW5nIDogLT4gXCIje0BpZH0gI3tAbmFtZX0gZWxvOiN7QGVsb30gI3tAY29sfSByZXM6I3tAcmVzfSBvcHA6WyN7QG9wcH1dIHNjb3JlOiN7QHNjb3JlKCkudG9GaXhlZCgxKX0gZWxvU3VtOiN7QGVsb1N1bSgpLnRvRml4ZWQoMCl9XCJcclxuXHJcblx0dG9nZ2xlIDogLT4gXHJcblx0XHRAYWN0aXZlID0gbm90IEBhY3RpdmVcclxuXHRcdGcudG91cm5hbWVudC5wYXVzZWQgPSAocC5pZCBmb3IgcCBpbiBnLnRvdXJuYW1lbnQucGVyc29ucyB3aGVuIG5vdCBwLmFjdGl2ZSlcclxuXHJcblx0ZWxvU3VtIDogPT4gXHJcblx0XHRpZiBnLnRvdXJuYW1lbnQucm91bmQgPT0gMCB0aGVuIHJldHVybiAwXHJcblx0XHRzdW1tYSA9IDBcclxuXHRcdGZvciByIGluIHJhbmdlIGcudG91cm5hbWVudC5yb3VuZCAjIC0gMVxyXG5cdFx0XHRpZiBAb3BwW3JdICE9IC0xIHRoZW4gc3VtbWEgKz0gZy50b3VybmFtZW50LnBlcnNvbnNbQG9wcFtyXV0uZWxvICogZy50b3VybmFtZW50LmJvbnVzW0Bjb2xbcl0gKyBAcmVzW3JdXSBcclxuXHRcdHN1bW1hXHJcblxyXG5cdGF2Z0Vsb0RpZmYgOiAtPlxyXG5cdFx0cmVzID0gW11cclxuXHRcdGZvciBpZCBpbiBAb3BwLnNsaWNlIDAsIEBvcHAubGVuZ3RoIC0gMVxyXG5cdFx0XHQjcmVzLnB1c2ggYWJzIG5vcm1lcmEoQGVsbykgLSBub3JtZXJhKHRvdXJuYW1lbnQucGVyc29uc1tpZF0uZWxvKVxyXG5cdFx0XHRpZiBpZCAhPSAtMSB0aGVuIHJlcy5wdXNoIGFicyBAZWxvIC0gZy50b3VybmFtZW50LnBlcnNvbnNbaWRdLmVsb1xyXG5cdFx0aWYgcmVzLmxlbmd0aCA9PSAwIHRoZW4gMCBlbHNlIHN1bShyZXMpIC8gcmVzLmxlbmd0aFxyXG5cclxuXHRiYWxhbnMgOiAtPiAjIGbDpHJnYmFsYW5zXHJcblx0XHRyZXN1bHQgPSAwXHJcblx0XHRmb3IgY2ggaW4gQGNvbFxyXG5cdFx0XHRpZiBjaD09J2InIHRoZW4gcmVzdWx0IC09IDFcclxuXHRcdFx0aWYgY2g9PSd3JyB0aGVuIHJlc3VsdCArPSAxXHJcblx0XHRyZXN1bHRcclxuXHJcblx0c2NvcmUgOiAtPlxyXG5cdFx0cmVzdWx0ID0gMFxyXG5cdFx0biA9IGcudG91cm5hbWVudC5yb3VuZFxyXG5cdFx0c3AgPSBnLnRvdXJuYW1lbnQuc3BcclxuXHRcdGZvciBpIGluIHJhbmdlIG5cclxuXHRcdFx0aWYgaSA8IEBjb2wubGVuZ3RoIGFuZCBpIDwgQHJlcy5sZW5ndGhcclxuXHRcdFx0XHRrZXkgPSBAY29sW2ldICsgQHJlc1tpXVxyXG5cdFx0XHRcdCNyZXN1bHQgKz0geyd3Mic6IDEtc3AsICdiMic6IDEsICd3MSc6IDAuNS1zcCwgJ2IxJzogMC41K3NwLCAndzAnOiAwLCAnYjAnOiBzcH1ba2V5XVxyXG5cdFx0XHRcdHJlcyA9IHsndzInOiAxLCAnYjInOiAxKzIqc3AsICd3MSc6IDAuNS1zcCwgJ2IxJzogMC41K3NwLCAndzAnOiAwLCAnYjAnOiAwfVtrZXldXHJcblx0XHQjcHJpbnQgJ2lkLHNjb3JlJyxAaWQsIEByZXMsIHJlc3VsdCxuXHJcblx0XHRyZXN1bHRcclxuXHJcblx0cmVhZCA6IChwbGF5ZXIpIC0+IFxyXG5cdFx0IyAoMTIzNHxDaHJpc3RlcnwoMTJ3MHwyM2LCvXwxNHcpKSBcclxuXHRcdCMgKDEyMzR8Q2hyaXN0ZXIpIFxyXG5cdFx0IyBwcmludCAncmVhZCcscGxheWVyXHJcblx0XHRAZWxvID0gcGFyc2VJbnQgcGxheWVyWzBdXHJcblx0XHRAbmFtZSA9IHBsYXllclsxXVxyXG5cdFx0QG9wcCA9IFtdXHJcblx0XHRAY29sID0gXCJcIlxyXG5cdFx0QHJlcyA9IFwiXCJcclxuXHRcdGlmIHBsYXllci5sZW5ndGggPCAzIHRoZW4gcmV0dXJuXHJcblx0XHRvY3JzID0gcGxheWVyWzJdXHJcblx0XHRmb3Igb2NyIGluIG9jcnNcclxuXHRcdFx0aWYgJ3cnIGluIG9jciB0aGVuIGNvbD0ndycgZWxzZSBjb2w9J2InXHJcblx0XHRcdGFyciA9IG9jci5zcGxpdCBjb2xcclxuXHRcdFx0QG9wcC5wdXNoIHBhcnNlSW50IGFyclswXVxyXG5cdFx0XHRAY29sICs9IGNvbFxyXG5cdFx0XHRpZiBhcnIubGVuZ3RoID09IDIgYW5kIGFyclsxXS5sZW5ndGggPT0gMVxyXG5cdFx0XHRcdEByZXMgKz0geycwJzonMCcsICfCvSc6JzEnLCAnMSc6JzInfVthcnJbMV1dICBcclxuXHRcdHByaW50IEBcclxuXHJcblx0d3JpdGUgOiAtPiAjICgxMjM0fENocmlzdGVyfCgxMncwfDIzYsK9fDE0dykpIEVsbzoxMjM0IE5hbWU6Q2hyaXN0ZXIgb3Bwb25lbnQ6MjMgY29sb3I6YiByZXN1bHQ6wr1cclxuXHRcdHJlcyA9IFtdXHJcblx0XHRyZXMucHVzaCBAZWxvXHJcblx0XHRyZXMucHVzaCBAbmFtZS5yZXBsYWNlQWxsICcgJywnXydcclxuXHRcdG5uID0gQG9wcC5sZW5ndGggLSAxXHJcblx0XHRvY3IgPSAoXCIje0BvcHBbaV19I3tAY29sW2ldfSN7aWYgaSA8IG5uIHRoZW4gXCIwwr0xXCJbQHJlc1tpXV0gZWxzZSAnJ31cIiBmb3IgaSBpbiByYW5nZShubikpIFxyXG5cdFx0cmVzLnB1c2ggJygnICsgb2NyLmpvaW4oJ3wnKSArICcpJ1xyXG5cdFx0cmVzLmpvaW4gJ3wnIl19
//# sourceURL=c:\github\Dense\coffee\player.coffee