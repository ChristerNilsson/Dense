// Generated by CoffeeScript 2.7.0
var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } },
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

import {
  g,
  print,
  range
} from './globals.js';

import {
  Page
} from './page.js';

import {
  Button,
  spread
} from './button.js';

import {
  Lista
} from './lista.js';

export var Tables = class Tables extends Page {
  constructor() {
    super();
    this.handleResult = this.handleResult.bind(this);
    this.t = g.tournament;
    this.y = 1.3 * g.ZOOM[g.state];
    this.h = 20;
    this.errors = [];
    this.lista = new Lista();
    this.buttons.ArrowLeft = new Button('', '', () => {
      return g.setState(g.PAIRINGS);
    });
    this.buttons.ArrowRight = new Button('', '', () => {
      return g.setState(g.NAMES);
    });
    this.buttons.K1 = new Button('1', '1 = White Win', () => {
      return this.handleResult('1');
    });
    this.buttons[' '] = new Button('½', 'space = Draw', () => {
      return this.handleResult(' ');
    });
    this.buttons.K0 = new Button('0', '0 = White Loss', () => {
      return this.handleResult('0');
    });
    this.buttons.Delete = new Button('Del', 'delete = Remove result', () => {
      return this.handleDelete();
    });
    this.buttons.r = new Button('R', 'R = Random results', () => {
      return this.randomResult();
    });
    this.buttons.t.active = false;
  }

  setLista() {
    var header;
    print('Lista', this.t.pairs.length);
    header = "";
    header += g.txtT('Tbl', 3, window.RIGHT);
    header += ' ' + g.txtT('Elo', 4, window.RIGHT);
    header += ' ' + g.txtT('White', 25, window.LEFT);
    header += ' ' + g.txtT('Result', 7, window.CENTER);
    header += ' ' + g.txtT('Black', 25, window.LEFT);
    header += ' ' + g.txtT('Elo', 4, window.RIGHT);
    this.lista = new Lista(this.t.pairs, header, this.buttons, (pair, index) => {
      var a, b, both, nr, pa, pb, s;
      // s = if p.active then '      ' else 'pause '
      // s + g.txtT p.name, 25, window.LEFT

        // print pair,index

        // return pair
      [a, b] = pair;
      // print 'lista',a,b
      pa = this.t.persons[a];
      pb = this.t.persons[b];
      // y += g.ZOOM[g.state]
      // sa = g.myRound pa.score(), 1
      // sb = g.myRound pb.score(), 1
      both = pa.res.length === pa.col.length ? g.prBoth(_.last(pa.res)) : "   -   ";
      nr = index + 1;
      s = "";
      s += g.txtT(nr.toString(), 3, window.RIGHT);
      s += ' ' + g.txtT(pa.elo.toString(), 4, window.RIGHT);
      s += ' ' + g.txtT(pa.name, 25, window.LEFT);
      s += ' ' + g.txtT(both, 7, window.CENTER);
      s += ' ' + g.txtT(pb.name, 25, window.LEFT);
      s += ' ' + g.txtT(pb.elo.toString(), 4, window.RIGHT);
      return s;
    });
    return spread(this.buttons, 0.6 * g.ZOOM[g.state], this.y, this.h);
  }

  mouseWheel(event) {
    return this.lista.mouseWheel(event);
  }

  mousePressed(event) {
    return this.lista.mousePressed(event);
  }

  keyPressed(event, key) {
    return this.buttons[key].click();
  }

  draw() {
    var button, key, ref;
    fill('white');
    this.showHeader(this.t.round);
    ref = this.buttons;
    for (key in ref) {
      button = ref[key];
      button.draw();
    }
    return this.lista.draw();
  }

  // y = 4.0 * g.ZOOM[g.state]
  // textAlign window.LEFT
  // text s,10,y

    // for i in range g.tournament.pairs.length

    // if i == @currentTable
  // 	fill  'yellow'
  // 	noStroke()
  // 	rect 0, y-0.6 * g.ZOOM[g.state], width, g.ZOOM[g.state]
  // 	fill 'black'
  // else
  // 	if i in g.errors then fill 'red' else fill 'black'
  // text s,10,y
  elo_probabilities(R_W, R_B, draw = 0.2) {
    var E_W, index, loss, win, x;
    E_W = 1 / (1 + 10 ** ((R_B - R_W) / 400));
    win = E_W - draw / 2;
    loss = (1 - E_W) - draw / 2;
    x = _.random(0, 1, true);
    index = 2;
    if (x < loss + draw) {
      index = 1;
    }
    if (x < loss) {
      index = 0;
    }
    return index;
  }

  handleResult(key) {
    var a, b, ch, index, pa, pb;
    boundMethodCheck(this, Tables);
    [a, b] = this.t.pairs[this.lista.currentRow];
    pa = this.t.persons[a];
    pb = this.t.persons[b];
    index = '0 1'.indexOf(key);
    ch = "012"[index];
    if (pa.res.length === pa.col.length) {
      if (ch !== _.last(pa.res)) {
        this.errors.push(this.lista.currentRow);
        print('errors', this.errors);
      }
    } else {
      if (pa.res.length < pa.col.length) {
        pa.res += "012"[index];
      }
      if (pb.res.length < pb.col.length) {
        pb.res += "210"[index];
      }
    }
    return this.lista.currentRow = modulo(this.lista.currentRow + 1, this.t.pairs.length);
  }

  randomResult() {
    var a, b, i, j, len, pa, pb, ref, res, results;
    ref = range(this.t.pairs.length);
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      [a, b] = this.t.pairs[i];
      pa = this.t.persons[a];
      pb = this.t.persons[b];
      res = this.elo_probabilities(pa.elo, pb.elo);
      if (pa.res.length < pa.col.length) {
        pa.res += "012"[res];
      }
      if (pb.res.length < pb.col.length) {
        results.push(pb.res += "210"[res]);
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  handleDelete() {
    var a, b, e, i, pa, pb;
    i = this.lista.currentRow;
    [a, b] = this.t.pairs[i];
    pa = this.t.persons[a];
    pb = this.t.persons[b];
    this.errors = (function() {
      var j, len, ref, results;
      ref = this.errors;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        e = ref[j];
        if (e !== i) {
          results.push(e);
        }
      }
      return results;
    }).call(this);
    if (pa.res.length === pb.res.length) {
      [a, b] = this.t.pairs[i];
      pa = this.t.persons[a];
      pb = this.t.persons[b];
      pa.res = pa.res.substring(0, pa.res.length - 1);
      pb.res = pb.res.substring(0, pb.res.length - 1);
    }
    return this.lista.currentRow = modulo(this.lista.currentRow + 1, this.t.pairs.length);
  }

  make(header, res) {
    var a, b, i, j, len, pa, pb, ref, results;
    res.push("TABLES" + header);
    res.push("");
    ref = range(g.tournament.pairs.length);
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      [a, b] = g.tournament.pairs[i];
      if (i % g.tournament.tpp === 0) {
        res.push(`Table      ${g.RINGS.w}`.padEnd(25) + _.pad("", 28 + 10) + `${g.RINGS.b}`);
      }
      pa = g.tournament.persons[a];
      pb = g.tournament.persons[b];
      res.push("");
      res.push(_.pad(i + 1, 6) + pa.elo + ' ' + g.txtT(pa.name, 25, window.LEFT) + ' ' + _.pad("|____| - |____|", 20) + ' ' + pb.elo + ' ' + g.txtT(pb.name, 25, window.LEFT));
      if (i % g.tournament.tpp === g.tournament.tpp - 1) {
        results.push(res.push("\f"));
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGVzLmpzIiwic291cmNlUm9vdCI6Ii4uXFwiLCJzb3VyY2VzIjpbImNvZmZlZVxcdGFibGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQTs7O0FBQUEsT0FBQTtFQUFTLENBQVQ7RUFBVyxLQUFYO0VBQWlCLEtBQWpCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7RUFBZ0IsTUFBaEI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFFQSxPQUFBLElBQWEsU0FBTixNQUFBLE9BQUEsUUFBcUIsS0FBckI7RUFFTixXQUFjLENBQUEsQ0FBQTs7UUE4RmQsQ0FBQSxtQkFBQSxDQUFBO0lBNUZDLElBQUMsQ0FBQSxDQUFELEdBQUssQ0FBQyxDQUFDO0lBQ1AsSUFBQyxDQUFBLENBQUQsR0FBSyxHQUFBLEdBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSDtJQUNqQixJQUFDLENBQUEsQ0FBRCxHQUFLO0lBQ0wsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxLQUFKLENBQUE7SUFFVCxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVQsR0FBc0IsSUFBSSxNQUFKLENBQVcsRUFBWCxFQUFlLEVBQWYsRUFBbUIsQ0FBQSxDQUFBLEdBQUE7YUFBTSxDQUFDLENBQUMsUUFBRixDQUFXLENBQUMsQ0FBQyxRQUFiO0lBQU4sQ0FBbkI7SUFDdEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCLElBQUksTUFBSixDQUFXLEVBQVgsRUFBZSxFQUFmLEVBQW1CLENBQUEsQ0FBQSxHQUFBO2FBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxDQUFDLENBQUMsS0FBYjtJQUFOLENBQW5CO0lBRXRCLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBVCxHQUFrQixJQUFJLE1BQUosQ0FBVyxHQUFYLEVB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QixDQUFDLENBQUMsVUFBVSxDQUFDLEdBQWIsR0FBaUIsQ0FBNUM7cUJBQW1ELEdBQUcsQ0FBQyxJQUFKLENBQVMsSUFBVCxHQUFuRDtPQUFBLE1BQUE7NkJBQUE7O0lBUEQsQ0FBQTs7RUFITTs7QUF0SUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnLHByaW50LHJhbmdlIH0gZnJvbSAnLi9nbG9iYWxzLmpzJyBcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZS5qcycgXHJcbmltcG9ydCB7IEJ1dHRvbixzcHJlYWQgfSBmcm9tICcuL2J1dHRvbi5qcycgXHJcbmltcG9ydCB7IExpc3RhIH0gZnJvbSAnLi9saXN0YS5qcycgXHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVzIGV4dGVuZHMgUGFnZVxyXG5cclxuXHRjb25zdHJ1Y3RvciA6ICgpIC0+XHJcblx0XHRzdXBlcigpXHJcblx0XHRAdCA9IGcudG91cm5hbWVudFxyXG5cdFx0QHkgPSAxLjMgKiBnLlpPT01bZy5zdGF0ZV1cclxuXHRcdEBoID0gMjBcclxuXHRcdEBlcnJvcnMgPSBbXVxyXG5cdFx0QGxpc3RhID0gbmV3IExpc3RhXHJcblxyXG5cdFx0QGJ1dHRvbnMuQXJyb3dMZWZ0ICA9IG5ldyBCdXR0b24gJycsICcnLCAoKSA9PiBnLnNldFN0YXRlIGcuUEFJUklOR1NcclxuXHRcdEBidXR0b25zLkFycm93UmlnaHQgPSBuZXcgQnV0dG9uICcnLCAnJywgKCkgPT4gZy5zZXRTdGF0ZSBnLk5BTUVTXHJcblxyXG5cdFx0QGJ1dHRvbnMuSzEgICAgID0gbmV3IEJ1dHRvbiAnMScsICAgJzEgPSBXaGl0ZSBXaW4nLCAgICAgICAgICAoKSA9PiBAaGFuZGxlUmVzdWx0ICcxJ1xyXG5cdFx0QGJ1dHRvbnNbJyAnXSAgID0gbmV3IEJ1dHRvbiAnwr0nLCAgICdzcGFjZSA9IERyYXcnLCAgICAgICAgICAgKCkgPT4gQGhhbmRsZVJlc3VsdCAnICdcclxuXHRcdEBidXR0b25zLkswICAgICA9IG5ldyBCdXR0b24gJzAnLCAgICcwID0gV2hpdGUgTG9zcycsICAgICAgICAgKCkgPT4gQGhhbmRsZVJlc3VsdCAnMCdcclxuXHRcdEBidXR0b25zLkRlbGV0ZSA9IG5ldyBCdXR0b24gJ0RlbCcsICdkZWxldGUgPSBSZW1vdmUgcmVzdWx0JywgKCkgPT4gQGhhbmRsZURlbGV0ZSgpXHJcblx0XHRAYnV0dG9ucy5yICAgICAgPSBuZXcgQnV0dG9uICdSJywgICAnUiA9IFJhbmRvbSByZXN1bHRzJywgICAgICgpID0+IEByYW5kb21SZXN1bHQoKVxyXG5cclxuXHRcdEBidXR0b25zLnQuYWN0aXZlID0gZmFsc2VcclxuXHJcblx0c2V0TGlzdGEgOiAtPlxyXG5cdFx0cHJpbnQgJ0xpc3RhJywgQHQucGFpcnMubGVuZ3RoXHJcblx0XHRoZWFkZXIgPSBcIlwiXHJcblx0XHRoZWFkZXIgKz0gICAgICAgZy50eHRUICdUYmwnLCAgICAzLHdpbmRvdy5SSUdIVFxyXG5cdFx0aGVhZGVyICs9ICcgJyArIGcudHh0VCAnRWxvJywgICAgNCx3aW5kb3cuUklHSFRcclxuXHRcdGhlYWRlciArPSAnICcgKyBnLnR4dFQgJ1doaXRlJywgMjUsd2luZG93LkxFRlRcclxuXHRcdGhlYWRlciArPSAnICcgKyBnLnR4dFQgJ1Jlc3VsdCcsIDcsd2luZG93LkNFTlRFUlxyXG5cdFx0aGVhZGVyICs9ICcgJyArIGcudHh0VCAnQmxhY2snLCAyNSx3aW5kb3cuTEVGVFxyXG5cdFx0aGVhZGVyICs9ICcgJyArIGcudHh0VCAnRWxvJywgICAgNCx3aW5kb3cuUklHSFRcclxuXHJcblx0XHRAbGlzdGEgPSBuZXcgTGlzdGEgQHQucGFpcnMsIGhlYWRlciwgQGJ1dHRvbnMsIChwYWlyLGluZGV4KSA9PlxyXG5cdFx0XHQjIHMgPSBpZiBwLmFjdGl2ZSB0aGVuICcgICAgICAnIGVsc2UgJ3BhdXNlICdcclxuXHRcdFx0IyBzICsgZy50eHRUIHAubmFtZSwgMjUsIHdpbmRvdy5MRUZUXHJcblxyXG5cdFx0XHQjIHByaW50IHBhaXIsaW5kZXhcclxuXHJcblx0XHRcdCMgcmV0dXJuIHBhaXJcclxuXHJcblx0XHRcdFthLGJdID0gcGFpclxyXG5cdFx0XHQjIHByaW50ICdsaXN0YScsYSxiXHJcblx0XHRcdHBhID0gQHQucGVyc29uc1thXVxyXG5cdFx0XHRwYiA9IEB0LnBlcnNvbnNbYl1cclxuXHRcdFx0IyB5ICs9IGcuWk9PTVtnLnN0YXRlXVxyXG5cdFx0XHQjIHNhID0gZy5teVJvdW5kIHBhLnNjb3JlKCksIDFcclxuXHRcdFx0IyBzYiA9IGcubXlSb3VuZCBwYi5zY29yZSgpLCAxXHJcblx0XHRcdGJvdGggPSBpZiBwYS5yZXMubGVuZ3RoID09IHBhLmNvbC5sZW5ndGggdGhlbiBnLnByQm90aCBfLmxhc3QocGEucmVzKSBlbHNlIFwiICAgLSAgIFwiXHJcblxyXG5cdFx0XHRuciA9IGluZGV4ICsgMVxyXG5cdFx0XHRzID0gXCJcIlxyXG5cdFx0XHRzICs9IGcudHh0VCBuci50b1N0cmluZygpLCAzLCB3aW5kb3cuUklHSFRcclxuXHRcdFx0cyArPSAnICcgKyBnLnR4dFQgcGEuZWxvLnRvU3RyaW5nKCksIDQsIHdpbmRvdy5SSUdIVFxyXG5cdFx0XHRzICs9ICcgJyArIGcudHh0VCBwYS5uYW1lLCAyNSwgd2luZG93LkxFRlRcclxuXHRcdFx0cyArPSAnICcgKyBnLnR4dFQgYm90aCw3LCB3aW5kb3cuQ0VOVEVSXHJcblx0XHRcdHMgKz0gJyAnICsgZy50eHRUIHBiLm5hbWUsIDI1LCB3aW5kb3cuTEVGVFxyXG5cdFx0XHRzICs9ICcgJyArIGcudHh0VCBwYi5lbG8udG9TdHJpbmcoKSwgNCwgd2luZG93LlJJR0hUXHJcblx0XHRcdHNcclxuXHJcblx0XHRzcHJlYWQgQGJ1dHRvbnMsIDAuNiAqIGcuWk9PTVtnLnN0YXRlXSwgQHksIEBoXHJcblxyXG5cdG1vdXNlV2hlZWwgICA6IChldmVudCApLT4gQGxpc3RhLm1vdXNlV2hlZWwgZXZlbnRcclxuXHRtb3VzZVByZXNzZWQgOiAoZXZlbnQpIC0+IEBsaXN0YS5tb3VzZVByZXNzZWQgZXZlbnRcclxuXHRrZXlQcmVzc2VkICAgOiAoZXZlbnQsa2V5KSAtPiBAYnV0dG9uc1trZXldLmNsaWNrKClcclxuXHJcblx0ZHJhdyA6IC0+XHJcblx0XHRmaWxsICd3aGl0ZSdcclxuXHRcdEBzaG93SGVhZGVyIEB0LnJvdW5kXHJcblx0XHRmb3Iga2V5LGJ1dHRvbiBvZiBAYnV0dG9uc1xyXG5cdFx0XHRidXR0b24uZHJhdygpXHJcblx0XHRAbGlzdGEuZHJhdygpXHJcblxyXG5cdFx0IyB5ID0gNC4wICogZy5aT09NW2cuc3RhdGVdXHJcblx0XHQjIHRleHRBbGlnbiB3aW5kb3cuTEVGVFxyXG5cdFx0IyB0ZXh0IHMsMTAseVxyXG5cclxuXHRcdCMgZm9yIGkgaW4gcmFuZ2UgZy50b3VybmFtZW50LnBhaXJzLmxlbmd0aFxyXG5cclxuXHRcdFx0IyBpZiBpID09IEBjdXJyZW50VGFibGVcclxuXHRcdFx0IyBcdGZpbGwgICd5ZWxsb3cnXHJcblx0XHRcdCMgXHRub1N0cm9rZSgpXHJcblx0XHRcdCMgXHRyZWN0IDAsIHktMC42ICogZy5aT09NW2cuc3RhdGVdLCB3aWR0aCwgZy5aT09NW2cuc3RhdGVdXHJcblx0XHRcdCMgXHRmaWxsICdibGFjaydcclxuXHRcdFx0IyBlbHNlXHJcblx0XHRcdCMgXHRpZiBpIGluIGcuZXJyb3JzIHRoZW4gZmlsbCAncmVkJyBlbHNlIGZpbGwgJ2JsYWNrJ1xyXG5cdFx0XHQjIHRleHQgcywxMCx5XHJcblxyXG5cdGVsb19wcm9iYWJpbGl0aWVzIDogKFJfVywgUl9CLCBkcmF3PTAuMikgLT5cclxuXHRcdEVfVyA9IDEgLyAoMSArIDEwICoqICgoUl9CIC0gUl9XKSAvIDQwMCkpXHJcblx0XHR3aW4gPSBFX1cgLSBkcmF3IC8gMlxyXG5cdFx0bG9zcyA9ICgxIC0gRV9XKSAtIGRyYXcgLyAyXHJcblx0XHR4ID0gXy5yYW5kb20gMCwxLHRydWVcclxuXHRcdGluZGV4ID0gMlxyXG5cdFx0aWYgeCA8IGxvc3MgKyBkcmF3IHRoZW4gaW5kZXggPSAxXHJcblx0XHRpZiB4IDwgbG9zcyB0aGVuIGluZGV4ID0gMFxyXG5cdFx0aW5kZXhcclxuXHJcblx0aGFuZGxlUmVzdWx0IDogKGtleSkgPT5cclxuXHRcdFthLGJdID0gQHQucGFpcnNbQGxpc3RhLmN1cnJlbnRSb3ddXHJcblx0XHRwYSA9IEB0LnBlcnNvbnNbYV1cclxuXHRcdHBiID0gQHQucGVyc29uc1tiXVxyXG5cdFx0aW5kZXggPSAnMCAxJy5pbmRleE9mIGtleVxyXG5cdFx0Y2ggPSBcIjAxMlwiW2luZGV4XVxyXG5cdFx0aWYgcGEucmVzLmxlbmd0aCA9PSBwYS5jb2wubGVuZ3RoIFxyXG5cdFx0XHRpZiBjaCAhPSBfLmxhc3QgcGEucmVzXHJcblx0XHRcdFx0QGVycm9ycy5wdXNoIEBsaXN0YS5jdXJyZW50Um93XHJcblx0XHRcdFx0cHJpbnQgJ2Vycm9ycycsQGVycm9yc1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRpZiBwYS5yZXMubGVuZ3RoIDwgcGEuY29sLmxlbmd0aCB0aGVuIHBhLnJlcyArPSBcIjAxMlwiW2luZGV4XVxyXG5cdFx0XHRpZiBwYi5yZXMubGVuZ3RoIDwgcGIuY29sLmxlbmd0aCB0aGVuIHBiLnJlcyArPSBcIjIxMFwiW2luZGV4XVxyXG5cdFx0QGxpc3RhLmN1cnJlbnRSb3cgPSAoQGxpc3RhLmN1cnJlbnRSb3cgKyAxKSAlJSBAdC5wYWlycy5sZW5ndGhcclxuXHJcblx0cmFuZG9tUmVzdWx0IDogLT5cclxuXHRcdGZvciBpIGluIHJhbmdlIEB0LnBhaXJzLmxlbmd0aFxyXG5cdFx0XHRbYSxiXSA9IEB0LnBhaXJzW2ldXHJcblx0XHRcdHBhID0gQHQucGVyc29uc1thXVxyXG5cdFx0XHRwYiA9IEB0LnBlcnNvbnNbYl1cclxuXHRcdFx0cmVzID0gQGVsb19wcm9iYWJpbGl0aWVzIHBhLmVsbywgcGIuZWxvXHJcblx0XHRcdGlmIHBhLnJlcy5sZW5ndGggPCBwYS5jb2wubGVuZ3RoIHRoZW4gcGEucmVzICs9IFwiMDEyXCJbcmVzXSBcclxuXHRcdFx0aWYgcGIucmVzLmxlbmd0aCA8IHBiLmNvbC5sZW5ndGggdGhlbiBwYi5yZXMgKz0gXCIyMTBcIltyZXNdXHJcblxyXG5cdGhhbmRsZURlbGV0ZSA6IC0+XHJcblx0XHRpID0gQGxpc3RhLmN1cnJlbnRSb3dcclxuXHRcdFthLGJdID0gQHQucGFpcnNbaV1cclxuXHRcdHBhID0gQHQucGVyc29uc1thXVxyXG5cdFx0cGIgPSBAdC5wZXJzb25zW2JdXHJcblx0XHRAZXJyb3JzID0gKGUgZm9yIGUgaW4gQGVycm9ycyB3aGVuIGUgIT0gaSlcclxuXHRcdGlmIHBhLnJlcy5sZW5ndGggPT0gcGIucmVzLmxlbmd0aFxyXG5cdFx0XHRbYSxiXSA9IEB0LnBhaXJzW2ldXHJcblx0XHRcdHBhID0gQHQucGVyc29uc1thXVxyXG5cdFx0XHRwYiA9IEB0LnBlcnNvbnNbYl1cclxuXHRcdFx0cGEucmVzID0gcGEucmVzLnN1YnN0cmluZyAwLHBhLnJlcy5sZW5ndGgtMVxyXG5cdFx0XHRwYi5yZXMgPSBwYi5yZXMuc3Vic3RyaW5nIDAscGIucmVzLmxlbmd0aC0xXHJcblx0XHRAbGlzdGEuY3VycmVudFJvdyA9IChAbGlzdGEuY3VycmVudFJvdyArIDEpICUlIEB0LnBhaXJzLmxlbmd0aFxyXG5cclxuXHRtYWtlIDogKGhlYWRlcixyZXMpIC0+XHJcblx0XHRyZXMucHVzaCBcIlRBQkxFU1wiICsgaGVhZGVyXHJcblx0XHRyZXMucHVzaCBcIlwiXHJcblx0XHRmb3IgaSBpbiByYW5nZSBnLnRvdXJuYW1lbnQucGFpcnMubGVuZ3RoXHJcblx0XHRcdFthLGJdID0gZy50b3VybmFtZW50LnBhaXJzW2ldXHJcblx0XHRcdGlmIGkgJSBnLnRvdXJuYW1lbnQudHBwID09IDAgdGhlbiByZXMucHVzaCBcIlRhYmxlICAgICAgI3tnLlJJTkdTLnd9XCIucGFkRW5kKDI1KSArIF8ucGFkKFwiXCIsMjgrMTApICsgXCIje2cuUklOR1MuYn1cIiAjLnBhZEVuZCgyNSlcclxuXHRcdFx0cGEgPSBnLnRvdXJuYW1lbnQucGVyc29uc1thXVxyXG5cdFx0XHRwYiA9IGcudG91cm5hbWVudC5wZXJzb25zW2JdXHJcblx0XHRcdHJlcy5wdXNoIFwiXCJcclxuXHRcdFx0cmVzLnB1c2ggXy5wYWQoaSsxLDYpICsgcGEuZWxvICsgJyAnICsgZy50eHRUKHBhLm5hbWUsIDI1LCB3aW5kb3cuTEVGVCkgKyAnICcgKyBfLnBhZChcInxfX19ffCAtIHxfX19ffFwiLDIwKSArICcgJyArIHBiLmVsbyArICcgJyArIGcudHh0VChwYi5uYW1lLCAyNSwgd2luZG93LkxFRlQpXHJcblx0XHRcdGlmIGkgJSBnLnRvdXJuYW1lbnQudHBwID09IGcudG91cm5hbWVudC50cHAtMSB0aGVuIHJlcy5wdXNoIFwiXFxmXCIiXX0=
//# sourceURL=c:\github\Dense\coffee\tables.coffee