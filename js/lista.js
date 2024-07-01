// Generated by CoffeeScript 2.7.0
import {
  g,
  print,
  range,
  scale
} from './globals.js';

export var Lista = class Lista {
  constructor(objects = [], columnTitles = "", buttons = {}, drawFunction = null) { // a list of players. Or a list of pairs of players
    this.objects = objects;
    this.columnTitles = columnTitles;
    this.buttons = buttons;
    this.drawFunction = drawFunction;
    this.offset = 0;
    this.currentRow = 0;
    this.N = this.objects.length;
    this.paintYellowRow = true;
  }

  draw() { // ritar de rader som syns i fönstret enbart
    var i, iRow, len, p, r, ref, results, s, w, y;
    y = 4;
    s = this.columnTitles;
    textAlign(window.LEFT);
    text(s, 10, scale(y));
    fill('black');
    r = g.tournament.round - 1;
    ref = range(this.offset, this.offset + g.LPP);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      iRow = ref[i];
      if (iRow >= this.N) {
        continue;
      }
      p = this.objects[iRow];
      y++;
      s = this.drawFunction(p, iRow);
      if (iRow === this.currentRow) {
        fill('yellow');
        w = this.paintYellowRow ? width : scale(23.4);
        rect(0, scale(y - 0.5), w, scale(1));
        fill('black');
      }
      results.push(text(s, 10, scale(y)));
    }
    return results;
  }

  keyPressed(event, key) {
    return this.buttons[key].click();
  }

  mouseWheel(event) {
    return this.move(event.delta < 0 ? Math.floor(-g.LPP / 2) : Math.floor(g.LPP / 2));
  }

  mousePressed() {
    var button, key, ref, results;
    if (mouseY > scale(4)) {
      return this.currentRow = this.offset + int(mouseY / g.ZOOM[g.state] - 4.5);
    } else {
      ref = this.buttons;
      results = [];
      for (key in ref) {
        button = ref[key];
        if (button.active && button.inside(mouseX, mouseY)) {
          results.push(button.click());
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  }

  ArrowUp() {
    return this.move(-1);
  }

  ArrowDown() {
    return this.move(1);
  }

  PageUp() {
    return this.move(Math.floor(-g.LPP / 2));
  }

  PageDown() {
    return this.move(Math.floor(g.LPP / 2));
  }

  Home() {
    return this.move(-this.currentRow);
  }

  End() {
    return this.move(this.N - this.currentRow);
  }

  move(delta) {
    this.currentRow += delta;
    if (this.currentRow < 0) {
      this.currentRow = 0;
    }
    if (this.currentRow >= this.N) {
      this.currentRow = this.N - 1;
    }
    if (this.currentRow < this.offset) {
      this.offset = this.currentRow;
    }
    if (this.currentRow >= this.offset + g.LPP) {
      this.offset = this.currentRow - g.LPP + 1;
    }
    return event.preventDefault();
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGEuanMiLCJzb3VyY2VSb290IjoiLi5cXCIsInNvdXJjZXMiOlsiY29mZmVlXFxsaXN0YS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQUE7RUFBUyxDQUFUO0VBQVcsS0FBWDtFQUFpQixLQUFqQjtFQUF1QixLQUF2QjtDQUFBLE1BQUE7O0FBRUEsT0FBQSxJQUFhLFFBQU4sTUFBQSxNQUFBO0VBQ04sV0FBYyxXQUFVLEVBQVYsaUJBQTRCLEVBQTVCLFlBQXlDLENBQUEsQ0FBekMsaUJBQTJELElBQTNELENBQUEsRUFBQTtJQUFDLElBQUMsQ0FBQTtJQUFZLElBQUMsQ0FBQTtJQUFpQixJQUFDLENBQUE7SUFBWSxJQUFDLENBQUE7SUFDM0QsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxVQUFELEdBQWM7SUFDZCxJQUFDLENBQUEsQ0FBRCxHQUFLLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDZCxJQUFDLENBQUEsY0FBRCxHQUFrQjtFQUpMOztFQU1kLElBQU8sQ0FBQSxDQUFBLEVBQUE7QUFDUixRQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0lBQUUsQ0FBQSxHQUFJO0lBQ0osQ0FBQSxHQUFJLElBQUMsQ0FBQTtJQUNMLFNBQUEsQ0FBVSxNQUFNLENBQUMsSUFBakI7SUFDQSxJQUFBLENBQUssQ0FBTCxFQUFPLEVBQVAsRUFBVSxLQUFBLENBQU0sQ0FBTixDQUFWO0lBRUEsSUFBQSxDQUFLLE9BQUw7SUFDQSxDQUFBLEdBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFiLEdBQXFCO0FBQ3pCO0FBQUE7SUFBQSxLQUFBLHFDQUFBOztNQUNDLElBQUcsSUFBQSxJQUFRLElBQUMsQ0FBQSxDQUFaO0FBQW1CLGlCQUFuQjs7TUFDQSxDQUFBLEdBQUksSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFEO01BQ1osQ0FBQTtNQUNBLENBQUEsR0FBSSxJQUFDLENBQUEsWUFBRCxDQUFjLENBQWQsRUFBaUIsSUFBakI7TUFDSixJQUFHLElBQUEsS0FBUSxJQUFDLENBQUEsVUFBWjtRQUNDLElBQUEsQ0FBSyxRQUFMO1FBQ0EsQ0FBQSxHQUFPLElBQUMsQ0FBQSxjQUFKLEdBQXdCLEtBQXhCLEdBQW1DLEtBQUEsQ0FBTSxJQUFOO1FBQ3ZDLElBQUEsQ0FBSyxDQUFMLEVBQVEsS0FBQSxDQUFNLENBQUEsR0FBSSxHQUFWLENBQVIsRUFBd0IsQ0FBeEIsRUFBMkIsS0FBQSxDQUFNLENBQU4sQ0FBM0I7UUFDQSxJQUFBLENBQUssT0FBTCxFQUpEOzttQkFLQSxJQUFBLENBQUssQ0FBTCxFQUFPLEVBQVAsRUFBVyxLQUFBLENBQU0sQ0FBTixDQUFYO0lBVkQsQ0FBQTs7RUFSTTs7RUFvQlAsVUFBYSxDQUFDLEtBQUQsRUFBUSxHQUFSLENBQUE7V0FBZ0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxHQUFELENBQUssQ0FBQyxLQUFkLENBQUE7RUFBaEI7O0VBQ2IsVUFBYSxDQUFDLEtBQUQsQ0FBQTtXQUFXLElBQUMsQ0FBQSxJQUFELENBQVMsS0FBSyxDQUFDLEtBQU4sR0FBYyxDQUFqQixjQUF3QixDQUFDLENBQUMsQ0FBQyxNQUFLLEVBQWhDLGNBQXVDLENBQUMsQ0FBQyxNQUFLLEVBQXBEO0VBQVg7O0VBQ2IsWUFBZSxDQUFBLENBQUE7QUFDaEIsUUFBQSxNQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtJQUFFLElBQUcsTUFBQSxHQUFTLEtBQUEsQ0FBTSxDQUFOLENBQVo7YUFDQyxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxNQUFELEdBQVUsR0FBQSxDQUFJLE1BQUEsR0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFILENBQWYsR0FBMkIsR0FBL0IsRUFEekI7S0FBQSxNQUFBO0FBR0M7QUFBQTtNQUFBLEtBQUEsVUFBQTs7UUFDQyxJQUFHLE1BQU0sQ0FBQyxNQUFQLElBQWtCLE1BQU0sQ0FBQyxNQUFQLENBQWMsTUFBZCxFQUFxQixNQUFyQixDQUFyQjt1QkFBc0QsTUFBTSxDQUFDLEtBQVAsQ0FBQSxHQUF0RDtTQUFBLE1BQUE7K0JBQUE7O01BREQsQ0FBQTtxQkFIRDs7RUFEYzs7RUFPZixPQUFZLENBQUEsQ0FBQTtXQUFHLElBQUMsQ0FBQSxJQUFELENBQU0sQ0FBQyxDQUFQO0VBQUg7O0VBQ1osU0FBWSxDQUFBLENBQUE7V0FBRyxJQUFDLENBQUEsSUFBRCxDQUFNLENBQU47RUFBSDs7RUFDWixNQUFZLENBQUEsQ0FBQTtXQUFHLElBQUMsQ0FBQSxJQUFELFlBQU0sQ0FBQyxDQUFDLENBQUMsTUFBSyxFQUFkO0VBQUg7O0VBQ1osUUFBWSxDQUFBLENBQUE7V0FBRyxJQUFDLENBQUEsSUFBRCxZQUFNLENBQUMsQ0FBQyxNQUFLLEVBQWI7RUFBSDs7RUFDWixJQUFZLENBQUEsQ0FBQTtXQUFHLElBQUMsQ0FBQSxJQUFELENBQU0sQ0FBQyxJQUFDLENBQUEsVUFBUjtFQUFIOztFQUNaLEdBQVksQ0FBQSxDQUFBO1dBQUcsSUFBQyxDQUFBLElBQUQsQ0FBTSxJQUFDLENBQUEsQ0FBRCxHQUFLLElBQUMsQ0FBQSxVQUFaO0VBQUg7O0VBRVosSUFBTyxDQUFDLEtBQUQsQ0FBQTtJQUNOLElBQUMsQ0FBQSxVQUFELElBQWU7SUFDZixJQUFHLElBQUMsQ0FBQSxVQUFELEdBQWMsQ0FBakI7TUFBd0IsSUFBQyxDQUFBLFVBQUQsR0FBYyxFQUF0Qzs7SUFDQSxJQUFHLElBQUMsQ0FBQSxVQUFELElBQWUsSUFBQyxDQUFBLENBQW5CO01BQTBCLElBQUMsQ0FBQSxVQUFELEdBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxFQUEzQzs7SUFDQSxJQUFHLElBQUMsQ0FBQSxVQUFELEdBQWMsSUFBQyxDQUFBLE1BQWxCO01BQThCLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLFdBQXpDOztJQUNBLElBQUcsSUFBQyxDQUFBLFVBQUQsSUFBZSxJQUFDLENBQUEsTUFBRCxHQUFVLENBQUMsQ0FBQyxHQUE5QjtNQUF1QyxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxVQUFELEdBQWMsQ0FBQyxDQUFDLEdBQWhCLEdBQXNCLEVBQXZFOztXQUNBLEtBQUssQ0FBQyxjQUFOLENBQUE7RUFOTTs7QUEzQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnLHByaW50LHJhbmdlLHNjYWxlIH0gZnJvbSAnLi9nbG9iYWxzLmpzJyBcclxuXHJcbmV4cG9ydCBjbGFzcyBMaXN0YVxyXG5cdGNvbnN0cnVjdG9yIDogKEBvYmplY3RzPVtdLCBAY29sdW1uVGl0bGVzPVwiXCIsIEBidXR0b25zPXt9LCBAZHJhd0Z1bmN0aW9uPW51bGwpIC0+ICMgYSBsaXN0IG9mIHBsYXllcnMuIE9yIGEgbGlzdCBvZiBwYWlycyBvZiBwbGF5ZXJzXHJcblx0XHRAb2Zmc2V0ID0gMFxyXG5cdFx0QGN1cnJlbnRSb3cgPSAwXHJcblx0XHRATiA9IEBvYmplY3RzLmxlbmd0aFxyXG5cdFx0QHBhaW50WWVsbG93Um93ID0gdHJ1ZVxyXG5cclxuXHRkcmF3IDogLT4gIyByaXRhciBkZSByYWRlciBzb20gc3lucyBpIGbDtm5zdHJldCBlbmJhcnRcclxuXHRcdHkgPSA0XHJcblx0XHRzID0gQGNvbHVtblRpdGxlc1xyXG5cdFx0dGV4dEFsaWduIHdpbmRvdy5MRUZUXHJcblx0XHR0ZXh0IHMsMTAsc2NhbGUoeSlcclxuXHJcblx0XHRmaWxsICdibGFjaydcclxuXHRcdHIgPSBnLnRvdXJuYW1lbnQucm91bmQgLSAxXHJcblx0XHRmb3IgaVJvdyBpbiByYW5nZSBAb2Zmc2V0LEBvZmZzZXQgKyBnLkxQUFxyXG5cdFx0XHRpZiBpUm93ID49IEBOIHRoZW4gY29udGludWVcclxuXHRcdFx0cCA9IEBvYmplY3RzW2lSb3ddXHJcblx0XHRcdHkrK1xyXG5cdFx0XHRzID0gQGRyYXdGdW5jdGlvbiBwLCBpUm93XHJcblx0XHRcdGlmIGlSb3cgPT0gQGN1cnJlbnRSb3dcclxuXHRcdFx0XHRmaWxsICd5ZWxsb3cnXHJcblx0XHRcdFx0dyA9IGlmIEBwYWludFllbGxvd1JvdyB0aGVuIHdpZHRoIGVsc2Ugc2NhbGUoMjMuNClcclxuXHRcdFx0XHRyZWN0IDAsIHNjYWxlKHkgLSAwLjUpLCB3LCBzY2FsZSgxKVxyXG5cdFx0XHRcdGZpbGwgJ2JsYWNrJ1xyXG5cdFx0XHR0ZXh0IHMsMTAsIHNjYWxlKHkpXHJcblxyXG5cdGtleVByZXNzZWQgOiAoZXZlbnQsIGtleSkgLT4gQGJ1dHRvbnNba2V5XS5jbGljaygpXHJcblx0bW91c2VXaGVlbCA6IChldmVudCkgLT4gQG1vdmUgaWYgZXZlbnQuZGVsdGEgPCAwIHRoZW4gLWcuTFBQLy8yIGVsc2UgZy5MUFAvLzJcclxuXHRtb3VzZVByZXNzZWQgOiAtPiBcclxuXHRcdGlmIG1vdXNlWSA+IHNjYWxlKDQpXHJcblx0XHRcdEBjdXJyZW50Um93ID0gQG9mZnNldCArIGludCBtb3VzZVkgLyBnLlpPT01bZy5zdGF0ZV0gLSA0LjVcclxuXHRcdGVsc2VcclxuXHRcdFx0Zm9yIGtleSxidXR0b24gb2YgQGJ1dHRvbnNcclxuXHRcdFx0XHRpZiBidXR0b24uYWN0aXZlIGFuZCBidXR0b24uaW5zaWRlIG1vdXNlWCxtb3VzZVkgdGhlbiBidXR0b24uY2xpY2soKVxyXG5cclxuXHRBcnJvd1VwICAgOiAtPiBAbW92ZSAtMVxyXG5cdEFycm93RG93biA6IC0+IEBtb3ZlIDFcclxuXHRQYWdlVXAgICAgOiAtPiBAbW92ZSAtZy5MUFAvLzIgXHJcblx0UGFnZURvd24gIDogLT4gQG1vdmUgZy5MUFAvLzJcclxuXHRIb21lICAgICAgOiAtPiBAbW92ZSAtQGN1cnJlbnRSb3dcclxuXHRFbmQgICAgICAgOiAtPiBAbW92ZSBATiAtIEBjdXJyZW50Um93XHJcblxyXG5cdG1vdmUgOiAoZGVsdGEpIC0+XHJcblx0XHRAY3VycmVudFJvdyArPSBkZWx0YVxyXG5cdFx0aWYgQGN1cnJlbnRSb3cgPCAwIHRoZW4gQGN1cnJlbnRSb3cgPSAwXHJcblx0XHRpZiBAY3VycmVudFJvdyA+PSBATiB0aGVuIEBjdXJyZW50Um93ID0gQE4tMVxyXG5cdFx0aWYgQGN1cnJlbnRSb3cgPCBAb2Zmc2V0IHRoZW4gQG9mZnNldCA9IEBjdXJyZW50Um93XHJcblx0XHRpZiBAY3VycmVudFJvdyA+PSBAb2Zmc2V0ICsgZy5MUFAgdGhlbiBAb2Zmc2V0ID0gQGN1cnJlbnRSb3cgLSBnLkxQUCArIDFcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCkiXX0=
//# sourceURL=c:\github\Dense\coffee\lista.coffee