// Generated by CoffeeScript 2.7.0
import {
  g,
  print,
  range
} from './globals.js';

import {
  Button,
  spread
} from './button.js';

export var Page = class Page {
  constructor() {
    this.buttons = {};
    this.buttons.t = new Button('Tables', 'T = Tables', () => {
      return g.setState(g.TABLES);
    });
    this.buttons.n = new Button('Names', 'N = Names', () => {
      return g.setState(g.NAMES);
    });
    this.buttons.s = new Button('Standings', 'S = Standings', () => {
      return g.setState(g.STANDINGS);
    });
    this.buttons.a = new Button('Active', 'A = Active', () => {
      return g.setState(g.ACTIVE);
    });
    this.buttons.ArrowUp = new Button('', '', () => {
      return this.lista.ArrowUp();
    });
    this.buttons.ArrowDown = new Button('', '', () => {
      return this.lista.ArrowDown();
    });
    this.buttons.PageUp = new Button('', '', () => {
      return this.lista.PageUp();
    });
    this.buttons.PageDown = new Button('', '', () => {
      return this.lista.PageDown();
    });
    this.buttons.Home = new Button('', '', () => {
      return this.lista.Home();
    });
    this.buttons.End = new Button('', '', () => {
      return this.lista.End();
    });
    this.buttons.i = new Button('In', 'I = zoom In', () => {
      return g.zoomIn(Math.floor(g.N / 2));
    });
    this.buttons.o = new Button('Out', 'O = zoom Out', () => {
      return g.zoomOut(Math.floor(g.N / 2));
    });
  }

  showHeader(round) {
    var s, y;
    y = 0.6 * g.ZOOM[g.state];
    textAlign(LEFT, CENTER);
    s = '';
    s += g.txtT(`${g.tournament.title} ${g.tournament.datum}`, 30, window.LEFT);
    s += g.txtT(`${g.message}`, 30, window.CENTER);
    s += ' ' + g.txtT('Round ' + round, 12, window.RIGHT);
    return text(s, 10, y);
  }

  txt(value, x, y, align = null, color = null) {
    push();
    if (align) {
      textAlign(align, window.CENTER);
    }
    if (color) {
      fill(color);
    }
    text(value, x, y);
    return pop();
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiIuLlxcIiwic291cmNlcyI6WyJjb2ZmZWVcXHBhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFBO0VBQVMsQ0FBVDtFQUFXLEtBQVg7RUFBaUIsS0FBakI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxNQUFUO0VBQWdCLE1BQWhCO0NBQUEsTUFBQTs7QUFFQSxPQUFBLElBQWEsT0FBTixNQUFBLEtBQUE7RUFFTixXQUFjLENBQUEsQ0FBQTtJQUNiLElBQUMsQ0FBQSxPQUFELEdBQVcsQ0FBQTtJQUVYLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBVCxHQUFhLElBQUksTUFBSixDQUFXLFFBQVgsRUFBcUIsWUFBckIsRUFBeUMsQ0FBQSxDQUFBLEdBQUE7YUFBTSxDQUFDLENBQUMsUUFBRixDQUFXLENBQUMsQ0FBQyxNQUFiO0lBQU4sQ0FBekM7SUFDYixJQUFDLENBQUEsT0FBTyxDQUFDLENBQVQsR0FBYSxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQXFCLFdBQXJCLEVBQXlDLENBQUEsQ0FBQSxHQUFBO2FBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxDQUFDLENBQUMsS0FBYjtJQUFOLENBQXpDO0lBQ2IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxDQUFULEdBQWEsSUFBSSxNQUFKLENBQVcsV0FBWCxFQUF3QixlQUF4QixFQUF5QyxDQUFBLENBQUEsR0FBQTthQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBQyxDQUFDLFNBQWI7SUFBTixDQUF6QztJQUNiLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBVCxHQUFhLElBQUksTUFBSixDQUFXLFFBQVgsRUFBc0IsWUFBdEIsRUFBeUMsQ0FBQSxDQUFBLEdBQUE7YUFBTSxDQUFDLENBQUMsUUFBRixDQUFXLENBQUMsQ0FBQyxNQUFiO0lBQU4sQ0FBekM7SUFFYixJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBbUIsSUFBSSxNQUFKLENBQVcsRUFBWCxFQUFl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Q0EsSUFBQSxDQUFLLEtBQUwsRUFBVyxDQUFYLEVBQWEsQ0FBYjtXQUNBLEdBQUEsQ0FBQTtFQUxLOztBQS9CQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGcscHJpbnQscmFuZ2UgfSBmcm9tICcuL2dsb2JhbHMuanMnIFxyXG5pbXBvcnQgeyBCdXR0b24sc3ByZWFkIH0gZnJvbSAnLi9idXR0b24uanMnIFxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VcclxuIFxyXG5cdGNvbnN0cnVjdG9yIDogLT5cclxuXHRcdEBidXR0b25zID0ge31cclxuXHJcblx0XHRAYnV0dG9ucy50ID0gbmV3IEJ1dHRvbiAnVGFibGVzJywgJ1QgPSBUYWJsZXMnLCAgICAgICAoKSA9PiBnLnNldFN0YXRlIGcuVEFCTEVTXHJcblx0XHRAYnV0dG9ucy5uID0gbmV3IEJ1dHRvbiAnTmFtZXMnLCAgJ04gPSBOYW1lcycsICAgICAgICAoKSA9PiBnLnNldFN0YXRlIGcuTkFNRVNcclxuXHRcdEBidXR0b25zLnMgPSBuZXcgQnV0dG9uICdTdGFuZGluZ3MnLCAnUyA9IFN0YW5kaW5ncycsICgpID0+IGcuc2V0U3RhdGUgZy5TVEFORElOR1NcclxuXHRcdEBidXR0b25zLmEgPSBuZXcgQnV0dG9uICdBY3RpdmUnLCAgJ0EgPSBBY3RpdmUnLCAgICAgICgpID0+IGcuc2V0U3RhdGUgZy5BQ1RJVkVcclxuXHJcblx0XHRAYnV0dG9ucy5BcnJvd1VwID0gbmV3IEJ1dHRvbiAnJywgJycsICgpID0+IEBsaXN0YS5BcnJvd1VwKClcclxuXHRcdEBidXR0b25zLkFycm93RG93biA9IG5ldyBCdXR0b24gJycsJycsICgpID0+IEBsaXN0YS5BcnJvd0Rvd24oKVxyXG5cclxuXHRcdEBidXR0b25zLlBhZ2VVcCA9IG5ldyBCdXR0b24gJycsICcnLCAoKSA9PiBAbGlzdGEuUGFnZVVwKClcclxuXHRcdEBidXR0b25zLlBhZ2VEb3duID0gbmV3IEJ1dHRvbiAnJywnJywgKCkgPT4gQGxpc3RhLlBhZ2VEb3duKClcclxuXHJcblx0XHRAYnV0dG9ucy5Ib21lID0gbmV3IEJ1dHRvbiAnJywgJycsICgpID0+IEBsaXN0YS5Ib21lKClcclxuXHRcdEBidXR0b25zLkVuZCA9IG5ldyBCdXR0b24gJycsJycsICgpID0+IEBsaXN0YS5FbmQoKVxyXG5cclxuXHRcdEBidXR0b25zLmkgPSBuZXcgQnV0dG9uICdJbicsICdJID0gem9vbSBJbicsICgpID0+IGcuem9vbUluIGcuTi8vMlxyXG5cdFx0QGJ1dHRvbnMubyA9IG5ldyBCdXR0b24gJ091dCcsICdPID0gem9vbSBPdXQnLCAoKSA9PiBnLnpvb21PdXQgZy5OLy8yXHJcblxyXG5cdHNob3dIZWFkZXIgOiAocm91bmQpIC0+XHJcblx0XHR5ID0gMC42ICogZy5aT09NW2cuc3RhdGVdXHJcblx0XHR0ZXh0QWxpZ24gTEVGVCxDRU5URVJcclxuXHRcdHMgPSAnJ1xyXG5cdFx0cyArPSBnLnR4dFQgXCIje2cudG91cm5hbWVudC50aXRsZX0gI3tnLnRvdXJuYW1lbnQuZGF0dW19XCIgLCAzMCwgd2luZG93LkxFRlRcclxuXHRcdHMgKz0gZy50eHRUIFwiI3tnLm1lc3NhZ2V9XCIgLCAzMCwgd2luZG93LkNFTlRFUlxyXG5cdFx0cyArPSAnICcgKyBnLnR4dFQgJ1JvdW5kICcgKyByb3VuZCwgMTIsIHdpbmRvdy5SSUdIVFxyXG5cdFx0dGV4dCBzLDEwLHlcclxuXHJcblx0dHh0IDogKHZhbHVlLCB4LCB5LCBhbGlnbj1udWxsLCBjb2xvcj1udWxsKSAtPlxyXG5cdFx0cHVzaCgpXHJcblx0XHRpZiBhbGlnbiB0aGVuIHRleHRBbGlnbiBhbGlnbix3aW5kb3cuQ0VOVEVSXHJcblx0XHRpZiBjb2xvciB0aGVuIGZpbGwgY29sb3JcclxuXHRcdHRleHQgdmFsdWUseCx5XHJcblx0XHRwb3AoKSJdfQ==
//# sourceURL=c:\github\Dense\coffee\page.coffee