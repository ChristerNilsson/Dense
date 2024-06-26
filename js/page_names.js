// Generated by CoffeeScript 2.7.0
import {
  g,
  print,
  range,
  scalex,
  scaley
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

export var Names = class Names extends Page {
  constructor() {
    super();
    this.buttons.n.active = false;
    this.buttons.ArrowLeft = new Button('', '', () => {
      return g.setState(g.TABLES);
    });
    this.buttons.ArrowRight = new Button('', '', () => {
      return g.setState(g.STANDINGS);
    });
  }

  setLista() {
    this.lista = new Lista(this.t.playersByName, "Table Name", this.buttons, (p) => {
      var r, s;
      r = this.t.round - 1;
      s = p.active ? `${str(1 + Math.floor(p.chair / 2)).padStart(3)} ${g.RINGS[p.col[r][0]]} ` : 'pause ';
      return s + g.txtT(p.name, 25, window.LEFT);
    });
    return spread(this.buttons, 10, this.y, this.h);
  }

  mouseWheel(event) {
    return this.lista.mouseWheel(event);
  }

  mousePressed(event) {
    return this.lista.mousePressed(event);
  }

  keyPressed(event) {
    return this.buttons[key].click();
  }

  make(res, header, players) {
    var i, index, j, len, player, r;
    print('make.@t.round', this.t.round);
    res.push("NAMES" + header);
    res.push("");
    r = this.t.round;
    for (i = j = 0, len = players.length; j < len; i = ++j) {
      [player, index] = players[i];
      print('player,index', player, index);
      if (i % this.ppp === 0) {
        res.push("Table Name");
      }
      res.push(`${str(1 + Math.floor(index / 2)).padStart(3)} ${g.RINGS[player.col[r][0]]} ${player.name}`);
      if (i % this.ppp === this.ppp - 1) {
        res.push("\f");
      }
    }
    return res.push("\f");
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

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZV9uYW1lcy5qcyIsInNvdXJjZVJvb3QiOiIuLlxcIiwic291cmNlcyI6WyJjb2ZmZWVcXHBhZ2VfbmFtZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFBO0VBQVMsQ0FBVDtFQUFXLEtBQVg7RUFBaUIsS0FBakI7RUFBdUIsTUFBdkI7RUFBOEIsTUFBOUI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtFQUFnQixNQUFoQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxRQUFOLE1BQUEsTUFBQSxRQUFvQixLQUFwQjtFQUVOLFdBQWMsQ0FBQSxDQUFBO1NBQ2IsQ0FBQTtJQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQVgsR0FBb0I7SUFDcEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXNCLElBQUksTUFBSixDQUFXLEVBQVgsRUFBZSxFQUFmLEVBQW1CLENBQUEsQ0FBQSxHQUFBO2FBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxDQUFDLENBQUMsTUFBYjtJQUFOLENBQW5CO0lBQ3RCLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUFzQixJQUFJLE1BQUosQ0FBVyxFQUFYLEVBQWUsRUFBZixFQUFtQixDQUFBLENBQUEsR0FBQTthQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBQyxDQUFDLFNBQWI7SUFBTixDQUFuQjtFQUpUOztFQU1kLFFBQVcsQ0FBQSxDQUFBO0lBQ1YsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLEtBQUosQ0FBVSxJQUFDLENBQUEsQ0FBQyxDQUFDLGFBQWIsRUFBNEIsWUFBNUIsRUFBMEMsSUFBQyxDQUFBLE9BQTNDLEVBQW9ELENBQUMsQ0FBRCxDQUFBLEdBQUE7QUFDL0QsVUFBQSxDQUFBLEVBQUE7TUFBRyxDQUFBLEdBQUksSUFBQyxDQUFBLENBQUMsQ0FBQyxLQUFILEdBQVc7TUFDZixDQUFBLEdBQU8sQ0FBQyxDQUFDLE1BQUwsR0FBaUIsQ0FBQSxDQUFBLENBQUcsR0FBQSxDQUFJLENBQUEsY0FBSSxDQUFDLENBQUMsUUFBUyxFQUFuQixDQUFxQixDQUFDLFFBQXRCLENBQStCLENBQS9CLENBQUgsRUFBQSxDQUFBLENBQXdDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFELENBQUcsQ0FBQyxDQUFELENBQVQsQ0FBL0MsRUFBQSxDQUFqQixHQUFzRjthQUMxRixDQUFBLEdBQUksQ0FBQyxDQUFDLElBQUYsQ0FBTyxDQUFDLENBQUMsSUFBVCxFQUFlLEVBQWYsRUFBbUIsTUFBTSxDQUFDLElBQTFCO0lBSHdELENBQXBEO1dBSVQsTUFBQSxDQUFPLElBQUMsQ0FBQSxPQUFSLEVBQWlCLEVBQWpCLEVBQXFCLElBQUMsQ0FBQSxDQUF0QixFQUF5QixJQUFDLENBQUEsQ0FBMUI7RUFMVTs7RUFPWCxVQUFlLENBQUMsS0FBRCxDQUFBO1dBQVcsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLENBQWtCLEtBQWxCO0VBQVg7O0VBQ2YsWUFBZSxDQUFDLEtBQUQsQ0FBQTtXQUFXLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixLQUFwQjtFQUFYOztFQUNmLFVBQWUsQ0FBQyxLQUFELENBQUE7V0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDLEdBQUQsQ0FBSyxDQUFDLEtBQWQsQ0FBQTtFQUFYOztFQUVmLElBQU8sQ0FBQyxHQUFELEVBQUssTUFBTCxFQUFZLE9BQVosQ0FBQTtBQUNSLFFBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQTtJQUFFLEtBQUEsQ0FBTSxlQUFOLEVBQXNCLElBQUMsQ0FBQSxDQUFDLENBQUMsS0FBekI7SUFDQSxHQUFHLENBQUMsSUFBSixDQUFTLE9BQUEsR0FBVSxNQUFuQjtJQUNBLEdBQUcsQ0FBQyxJQUFKLENBQVMsRUFBVDtJQUNBLENBQUEsR0FBSSxJQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsS0FBQSxpREFBQTtNQUFJLENBQUMsTUFBRCxFQUFRLEtBQVI7TUFDSCxLQUFBLENBQU0sY0FBTixFQUFxQixNQUFyQixFQUE0QixLQUE1QjtNQUNBLElBQUcsQ0FBQSxHQUFJLElBQUMsQ0FBQSxHQUFMLEtBQVksQ0FBZjtRQUFzQixHQUFHLENBQUMsSUFBSixDQUFTLFlBQVQsRUFBdEI7O01BQ0EsR0FBRyxDQUFDLElBQUosQ0FBUyxDQUFBLENBQUEsQ0FBRyxHQUFBLENBQUksQ0FBQSxjQUFJLFFBQU8sRUFBZixDQUFpQixDQUFDLFFBQWxCLENBQTJCLENBQTNCLENBQUgsRUFBQSxDQUFBLENBQW9DLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFELENBQUcsQ0FBQyxDQUFELENBQWQsQ0FBM0MsRUFBQSxDQUFBLENBQWlFLE1BQU0sQ0FBQyxJQUF4RSxDQUFBLENBQVQ7TUFDQSxJQUFHLENBQUEsR0FBSSxJQUFDLENBQUEsR0FBTCxLQUFZLElBQUMsQ0FBQSxHQUFELEdBQUssQ0FBcEI7UUFBMkIsR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFULEVBQTNCOztJQUpEO1dBS0EsR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFUO0VBVk07O0VBWVAsSUFBTyxDQUFBLENBQUE7QUFDUixRQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUUsSUFBQSxDQUFLLE9BQUw7SUFDQSxJQUFDLENBQUEsVUFBRCxDQUFZLElBQUMsQ0FBQSxDQUFDLENBQUMsS0FBZjtJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFBO0FBQ0E7QUFBQTtJQUFBLEtBQUEsVUFBQTs7bUJBQ0MsTUFBTSxDQUFDLElBQVAsQ0FBQTtJQURELENBQUE7O0VBSk07O0FBL0JEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZyxwcmludCxyYW5nZSxzY2FsZXgsc2NhbGV5IH0gZnJvbSAnLi9nbG9iYWxzLmpzJyBcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZS5qcycgXHJcbmltcG9ydCB7IEJ1dHRvbixzcHJlYWQgfSBmcm9tICcuL2J1dHRvbi5qcycgXHJcbmltcG9ydCB7IExpc3RhIH0gZnJvbSAnLi9saXN0YS5qcycgIFxyXG5cclxuZXhwb3J0IGNsYXNzIE5hbWVzIGV4dGVuZHMgUGFnZVxyXG5cclxuXHRjb25zdHJ1Y3RvciA6IC0+XHJcblx0XHRzdXBlcigpXHJcblx0XHRAYnV0dG9ucy5uLmFjdGl2ZSA9IGZhbHNlXHJcblx0XHRAYnV0dG9ucy5BcnJvd0xlZnQgID0gbmV3IEJ1dHRvbiAnJywgJycsICgpID0+IGcuc2V0U3RhdGUgZy5UQUJMRVNcclxuXHRcdEBidXR0b25zLkFycm93UmlnaHQgPSBuZXcgQnV0dG9uICcnLCAnJywgKCkgPT4gZy5zZXRTdGF0ZSBnLlNUQU5ESU5HU1xyXG5cclxuXHRzZXRMaXN0YSA6IC0+XHJcblx0XHRAbGlzdGEgPSBuZXcgTGlzdGEgQHQucGxheWVyc0J5TmFtZSwgXCJUYWJsZSBOYW1lXCIsIEBidXR0b25zLCAocCkgPT5cclxuXHRcdFx0ciA9IEB0LnJvdW5kIC0gMVxyXG5cdFx0XHRzID0gaWYgcC5hY3RpdmUgdGhlbiBcIiN7c3RyKDEgKyBwLmNoYWlyIC8vIDIpLnBhZFN0YXJ0KDMpfSAje2cuUklOR1NbcC5jb2xbcl1bMF1dfSBcIiBlbHNlICdwYXVzZSAnXHJcblx0XHRcdHMgKyBnLnR4dFQgcC5uYW1lLCAyNSwgd2luZG93LkxFRlRcclxuXHRcdHNwcmVhZCBAYnV0dG9ucywgMTAsIEB5LCBAaFxyXG5cclxuXHRtb3VzZVdoZWVsICAgOiAoZXZlbnQgKS0+IEBsaXN0YS5tb3VzZVdoZWVsIGV2ZW50XHJcblx0bW91c2VQcmVzc2VkIDogKGV2ZW50KSAtPiBAbGlzdGEubW91c2VQcmVzc2VkIGV2ZW50XHJcblx0a2V5UHJlc3NlZCAgIDogKGV2ZW50KSAtPiBAYnV0dG9uc1trZXldLmNsaWNrKClcclxuXHJcblx0bWFrZSA6IChyZXMsaGVhZGVyLHBsYXllcnMpIC0+XHJcblx0XHRwcmludCAnbWFrZS5AdC5yb3VuZCcsQHQucm91bmRcclxuXHRcdHJlcy5wdXNoIFwiTkFNRVNcIiArIGhlYWRlclxyXG5cdFx0cmVzLnB1c2ggXCJcIlxyXG5cdFx0ciA9IEB0LnJvdW5kXHJcblx0XHRmb3IgW3BsYXllcixpbmRleF0saSBpbiBwbGF5ZXJzXHRcdFx0XHJcblx0XHRcdHByaW50ICdwbGF5ZXIsaW5kZXgnLHBsYXllcixpbmRleFxyXG5cdFx0XHRpZiBpICUgQHBwcCA9PSAwIHRoZW4gcmVzLnB1c2ggXCJUYWJsZSBOYW1lXCJcclxuXHRcdFx0cmVzLnB1c2ggXCIje3N0cigxICsgaW5kZXgvLzIpLnBhZFN0YXJ0KDMpfSAje2cuUklOR1NbcGxheWVyLmNvbFtyXVswXV19ICN7cGxheWVyLm5hbWV9XCJcclxuXHRcdFx0aWYgaSAlIEBwcHAgPT0gQHBwcC0xIHRoZW4gcmVzLnB1c2ggXCJcXGZcIlxyXG5cdFx0cmVzLnB1c2ggXCJcXGZcIlxyXG5cclxuXHRkcmF3IDogLT5cclxuXHRcdGZpbGwgJ3doaXRlJ1xyXG5cdFx0QHNob3dIZWFkZXIgQHQucm91bmRcclxuXHRcdEBsaXN0YS5kcmF3KClcclxuXHRcdGZvciBrZXksYnV0dG9uIG9mIEBidXR0b25zXHJcblx0XHRcdGJ1dHRvbi5kcmF3KCkiXX0=
//# sourceURL=c:\github\Dense\coffee\page_names.coffee