// Generated by CoffeeScript 2.7.0
import {
  g,
  print,
  range,
  scale
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

export var Active = class Active extends Page {
  constructor() {
    super();
    this.buttons.t.active = false;
    this.buttons.n.active = false;
    this.buttons.s.active = false;
    this.buttons.ArrowLeft = new Button('', '', () => {
      return g.setState(g.STANDINGS);
    });
    this.buttons.ArrowRight = new Button('', '', () => {
      return g.setState(g.TABLES);
    });
    this.buttons.p = new Button('Pair', 'P = Perform pairing now', () => {
      this.buttons.t.active = true;
      this.buttons.n.active = true;
      this.buttons.s.active = true;
      return this.t.lotta();
    });
    this.buttons[' '] = new Button('toggle', 'space = pause/activate', () => {
      return this.t.playersByName[g.pages[g.state].lista.currentRow].toggle();
    });
    this.buttons.a.active = false;
    this.setLista();
  }

  setLista() {
    this.lista = new Lista(this.t.playersByName, "Pause Name", this.buttons, function(p) {
      var s;
      s = p.active ? '      ' : 'pause ';
      return s + g.txtT(p.name, 25, window.LEFT);
    });
    return spread(this.buttons, 10, this.y, this.h);
  }

  draw() {
    var button, key, ref, results;
    fill('white');
    this.showHeader(this.t.round);
    this.lista.draw();
    ref = this.buttons;
    results = [];
    for (key in ref) {
      button = ref[key];
      results.push(button.draw());
    }
    return results;
  }

  mouseWheel(event) {
    return this.lista.mouseWheel(event);
  }

  mousePressed(event) {
    return this.lista.mousePressed(event);
  }

  keyPressed(event) {
    if (this.buttons[key].active || (key === 'p' || key === ' ')) {
      return this.buttons[key].click();
    }
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZV9hY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi5cXCIsInNvdXJjZXMiOlsiY29mZmVlXFxwYWdlX2FjdGl2ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQUE7RUFBUyxDQUFUO0VBQVcsS0FBWDtFQUFpQixLQUFqQjtFQUF1QixLQUF2QjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxNQUFUO0VBQWdCLE1BQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBRUEsT0FBQSxJQUFhLFNBQU4sTUFBQSxPQUFBLFFBQXFCLEtBQXJCO0VBRU4sV0FBYyxDQUFBLENBQUE7U0FDYixDQUFBO0lBRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBWCxHQUFvQjtJQUNwQixJQUFDLENBQUEsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFYLEdBQW9CO0lBQ3BCLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQVgsR0FBb0I7SUFFcEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXNCLElBQUksTUFBSixDQUFXLEVBQVgsRUFBZSxFQUFmLEVBQW1CLENBQUEsQ0FBQSxHQUFBO2FBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxDQUFDLENBQUMsU0FBYjtJQUFOLENBQW5CO0lBQ3RCLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUFzQixJQUFJLE1BQUosQ0FBVyxFQUFYLEVBQWUsRUFBZixFQUFtQixDQUFBLENBQUEsR0FBQTthQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBQyxDQUFDLE1BQWI7SUFBTixDQUFuQjtJQUN0QixJQUFDLENBQUEsT0FBTyxDQUFDLENBQVQsR0FBc0IsSUFBSSxNQUFKLENBQVcsTUFBWCxFQUFrQix5QkFBbEIsRUFBNkMsQ0FBQSxDQUFBLEdBQUE7TUFDbEUsSUFBQyxDQUFBLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBWCxHQUFvQjtNQUNwQixJQUFDLENBQUEsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFYLEdBQW9CO01BQ3BCLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQVgsR0FBb0I7YUFDcEIsSUFBQyxDQUFBLENBQUMsQ0FBQyxLQUFILENBQUE7SUFKa0UsQ0FBN0M7SUFLdEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxHQUFELENBQVIsR0FBc0IsSUFBSSxNQUFKLENBQVcsUUFBWCxFQUFxQix3QkFBckIsRUFDckIsQ0FBQSxDQUFBLEdBQUE7YUFBTSxJQUFDLENBQUEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFILENBQVMsQ0FBQyxLQUFLLENBQUMsVUFBeEIsQ0FBbUMsQ0FBQyxNQUFwRCxDQUFBO0lBQU4sQ0FEcUI7SUFHdEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBWCxHQUFvQjtJQUNwQixJQUFDLENBQUEsUUFBRCxDQUFBO0VBbEJhOztFQW9CZCxRQUFXLENBQUEsQ0FBQTtJQUNWLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxLQUFKLENBQVUsSUFBQyxDQUFBLENBQUMsQ0FBQyxhQUFiLEVBQTRCLFlBQTVCLEVBQTBDLElBQUMsQ0FBQSxPQUEzQyxFQUFvRCxRQUFBLENBQUMsQ0FBRCxDQUFBO0FBQy9ELFVBQUE7TUFBRyxDQUFBLEdBQU8sQ0FBQyxDQUFDLE1BQUwsR0FBaUIsUUFBakIsR0FBK0I7YUFDbkMsQ0FBQSxHQUFJLENBQUMsQ0FBQyxJQUFGLENBQU8sQ0FBQyxDQUFDLElBQVQsRUFBZSxFQUFmLEVBQW1CLE1BQU0sQ0FBQyxJQUExQjtJQUZ3RCxDQUFwRDtXQUdULE1BQUEsQ0FBTyxJQUFDLENBQUEsT0FBUixFQUFpQixFQUFqQixFQUFxQixJQUFDLENBQUEsQ0FBdEIsRUFBeUIsSUFBQyxDQUFBLENBQTFCO0VBSlU7O0VBTVgsSUFBTyxDQUFBLENBQUE7QUFDUixRQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUUsSUFBQSxDQUFLLE9BQUw7SUFDQSxJQUFDLENBQUEsVUFBRCxDQUFZLElBQUMsQ0FBQSxDQUFDLENBQUMsS0FBZjtJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFBO0FBQ0E7QUFBQTtJQUFBLEtBQUEsVUFBQTs7bUJBQ0MsTUFBTSxDQUFDLElBQVAsQ0FBQTtJQURELENBQUE7O0VBSk07O0VBT1AsVUFBYSxDQUFDLEtBQUQsQ0FBQTtXQUFXLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBUCxDQUFrQixLQUFsQjtFQUFYOztFQUNiLFlBQWUsQ0FBQyxLQUFELENBQUE7V0FBVyxJQUFDLENBQUEsS0FBSyxDQUFDLFlBQVAsQ0FBb0IsS0FBcEI7RUFBWDs7RUFDZixVQUFhLENBQUMsS0FBRCxDQUFBO0lBQVcsSUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDLEdBQUQsQ0FBSyxDQUFDLE1BQWQsS0FBd0IsUUFBUSxPQUFSLFFBQVksSUFBdkM7YUFBaUQsSUFBQyxDQUFBLE9BQU8sQ0FBQyxHQUFELENBQUssQ0FBQyxLQUFkLENBQUEsRUFBakQ7O0VBQVg7O0FBckNQIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZyxwcmludCxyYW5nZSxzY2FsZSB9IGZyb20gJy4vZ2xvYmFscy5qcycgXHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3BhZ2UuanMnIFxyXG5pbXBvcnQgeyBCdXR0b24sc3ByZWFkIH0gZnJvbSAnLi9idXR0b24uanMnIFxyXG5pbXBvcnQgeyBMaXN0YSB9IGZyb20gJy4vbGlzdGEuanMnIFxyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGl2ZSBleHRlbmRzIFBhZ2UgXHJcblxyXG5cdGNvbnN0cnVjdG9yIDogLT5cclxuXHRcdHN1cGVyKClcclxuXHJcblx0XHRAYnV0dG9ucy50LmFjdGl2ZSA9IGZhbHNlXHJcblx0XHRAYnV0dG9ucy5uLmFjdGl2ZSA9IGZhbHNlXHJcblx0XHRAYnV0dG9ucy5zLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG5cdFx0QGJ1dHRvbnMuQXJyb3dMZWZ0ICA9IG5ldyBCdXR0b24gJycsICcnLCAoKSA9PiBnLnNldFN0YXRlIGcuU1RBTkRJTkdTXHJcblx0XHRAYnV0dG9ucy5BcnJvd1JpZ2h0ID0gbmV3IEJ1dHRvbiAnJywgJycsICgpID0+IGcuc2V0U3RhdGUgZy5UQUJMRVNcclxuXHRcdEBidXR0b25zLnAgICAgICAgICAgPSBuZXcgQnV0dG9uICdQYWlyJywnUCA9IFBlcmZvcm0gcGFpcmluZyBub3cnLCAoKSA9PiBcclxuXHRcdFx0QGJ1dHRvbnMudC5hY3RpdmUgPSB0cnVlXHJcblx0XHRcdEBidXR0b25zLm4uYWN0aXZlID0gdHJ1ZVxyXG5cdFx0XHRAYnV0dG9ucy5zLmFjdGl2ZSA9IHRydWVcclxuXHRcdFx0QHQubG90dGEoKVxyXG5cdFx0QGJ1dHRvbnNbJyAnXSAgICAgICA9IG5ldyBCdXR0b24gJ3RvZ2dsZScsICdzcGFjZSA9IHBhdXNlL2FjdGl2YXRlJywgXHJcblx0XHRcdCgpID0+IEB0LnBsYXllcnNCeU5hbWVbZy5wYWdlc1tnLnN0YXRlXS5saXN0YS5jdXJyZW50Um93XS50b2dnbGUoKVxyXG5cclxuXHRcdEBidXR0b25zLmEuYWN0aXZlID0gZmFsc2VcclxuXHRcdEBzZXRMaXN0YSgpXHJcblxyXG5cdHNldExpc3RhIDogLT5cclxuXHRcdEBsaXN0YSA9IG5ldyBMaXN0YSBAdC5wbGF5ZXJzQnlOYW1lLCBcIlBhdXNlIE5hbWVcIiwgQGJ1dHRvbnMsIChwKSAtPlxyXG5cdFx0XHRzID0gaWYgcC5hY3RpdmUgdGhlbiAnICAgICAgJyBlbHNlICdwYXVzZSAnXHJcblx0XHRcdHMgKyBnLnR4dFQgcC5uYW1lLCAyNSwgd2luZG93LkxFRlRcclxuXHRcdHNwcmVhZCBAYnV0dG9ucywgMTAsIEB5LCBAaFxyXG5cclxuXHRkcmF3IDogLT5cclxuXHRcdGZpbGwgJ3doaXRlJ1xyXG5cdFx0QHNob3dIZWFkZXIgQHQucm91bmRcclxuXHRcdEBsaXN0YS5kcmF3KClcclxuXHRcdGZvciBrZXksYnV0dG9uIG9mIEBidXR0b25zXHJcblx0XHRcdGJ1dHRvbi5kcmF3KClcclxuXHJcblx0bW91c2VXaGVlbCA6IChldmVudCApLT4gQGxpc3RhLm1vdXNlV2hlZWwgZXZlbnRcclxuXHRtb3VzZVByZXNzZWQgOiAoZXZlbnQpIC0+IEBsaXN0YS5tb3VzZVByZXNzZWQgZXZlbnRcclxuXHRrZXlQcmVzc2VkIDogKGV2ZW50KSAtPiBpZiBAYnV0dG9uc1trZXldLmFjdGl2ZSBvciBrZXkgaW4gWydwJywnICddIHRoZW4gQGJ1dHRvbnNba2V5XS5jbGljaygpIl19
//# sourceURL=c:\github\Dense\coffee\page_active.coffee