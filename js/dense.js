// Generated by CoffeeScript 2.7.0
var ALFABET, ASCII, datum;

import {
  parseExpr
} from './parser.js';

import {
  g,
  print,
  range
} from './globals.js';

import {
  Button,
  spread
} from './button.js';

import {
  Lista
} from './lista.js';

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

g.LPP = 14;

g.RINGS = {
  'b': '•',
  ' ': ' ',
  'w': 'o'
};

ASCII = '0123456789abcdefg';

ALFABET = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // 62 ronder maximalt

datum = '';

g.tournament = null;

g.errors = []; // id för motsägelsefulla resultat. Tas bort med Delete

g.pages = [];

// resultat = [] # 012 sorterad på id
// message = '' #This is a tutorial g.tournament. Use it or edit the URL'
window.windowResized = function() {
  resizeCanvas(windowWidth, windowHeight - 4);
  return g.LPP = Math.floor(height / g.ZOOM[g.state]) - 4;
};

window.setup = function() {
  createCanvas(windowWidth - 4, windowHeight - 4);
  textFont('Courier New');
  // textAlign window.LEFT,window.TOP
  textAlign(CENTER, CENTER);
  rectMode(window.CORNER);
  noStroke();
  g.ZOOM = [
    20,
    20,
    20,
    20 // vertical line distance for four states
  ];
  g.state = g.TABLES;
  g.N = 0; // number of players
  g.tournament = new Tournament();
  g.state = g.ACTIVE;
  g.pages = [new Tables(), new Names(), new Standings(), new Active()];
  print(g.pages);
  return window.windowResized();
};

window.draw = function() {
  background('gray');
  textSize(g.ZOOM[g.state]);
  return g.pages[g.state].draw();
};

window.mousePressed = function(event) {
  return g.pages[g.state].mousePressed(event);
};

window.mouseWheel = function(event) {
  return g.pages[g.state].mouseWheel(event);
};

window.keyPressed = function(event) {
  var key2;
  key2 = key;
  if (key2 === 'Control' || key2 === 'Shift' || key2 === 'I') {
    return;
  }
  if (key2 === '1') {
    key2 = 'K1';
  }
  if (key2 === '0') {
    key2 = 'K0';
  }
  return g.pages[g.state].keyPressed(event, key2);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVuc2UuanMiLCJzb3VyY2VSb290IjoiLi5cXCIsInNvdXJjZXMiOlsiY29mZmVlXFxkZW5zZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsU0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLENBQVQ7RUFBVyxLQUFYO0VBQWlCLEtBQWpCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtFQUFnQixNQUFoQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxVQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxTQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBRUEsQ0FBQyxDQUFDLEdBQUYsR0FBUTs7QUFFUixDQUFDLENBQUMsS0FBRixHQUFVO0VBQUMsR0FBQSxFQUFJLEdBQUw7RUFBVSxHQUFBLEVBQUksR0FBZDtFQUFtQixHQUFBLEVBQUk7QUFBdkI7O0FBRVYsS0FBQSxHQUFROztBQUNSLE9BQUEsR0FBVSxnRUFmVjs7QUFpQkEsS0FBQSxHQUFROztBQUNSLENBQUMsQ0FBQyxVQUFGLEdBQWU7O0FBQ2YsQ0FBQyxDQUFDLE1BQUYsR0FBVyxHQW5CWDs7QUFxQkEsQ0FBQyxDQUFDLEtBQUYsR0FBVSxHQXJCVjs7OztBQXlCQSxNQUFNLENBQUMsYUFBUCxHQUF1QixRQUFBLENBQUEsQ0FBQTtFQUN0QixZQUFBLENBQWEsV0FBYixFQUEwQixZQUFBLEdBQWEsQ0FBdkM7U0FDQSxDQUFDLENBQUMsR0FBRixjQUFRLFNBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSCxFQUFoQixHQUE0QjtBQUZkOztBQUl2QixNQUFNLENBQUMsS0FBUCxHQUFlLFFBQUEsQ0FBQSxDQUFBO0VBQ2QsWUFBQSxDQUFhLFdBQUEsR0FBWSxDQUF6QixFQUEyQixZQUFBLEdBQWEsQ0FBeEM7RUFDQSxRQUFBLENBQVMsYUFBVCxFQUREOztFQUdDLFNBQUEsQ0FBVSxNQUFWLEVBQWlCLE1BQWpCO0VBQ0EsUUFBQSxDQUFTLE1BQU0sQ0FBQyxNQUFoQjtFQUNBLFFBQUEsQ0FBQTtFQUVBLENBQUMsQ0FBQyxJQUFGLEdBQVM7SUFBQyxFQUFEO0lBQUksRUFBSjtJQUFPLEVBQVA7SUFBVSxFQUFWOztFQUNULENBQUMsQ0FBQyxLQUFGLEdBQVUsQ0FBQyxDQUFDO0VBQ1osQ0FBQyxDQUFDLENBQUYsR0FBTSxFQVRQO0VBVUMsQ0FBQyxDQUFDLFVBQUYsR0FBZSxJQUFJLFVBQUosQ0FBQTtFQUNmLENBQUMsQ0FBQyxLQUFGLEdBQVUsQ0FBQyxDQUFDO0VBRVosQ0FBQyxDQUFDLEtBQUYsR0FBVSxDQUFDLElBQUksTUFBSixDQUFBLENBQUQsRUFBYSxJQUFJLEtBQUosQ0FBQSxDQUFiLEVBQXdCLElBQUksU0FBSixDQUFBLENBQXhCLEVBQXVDLElBQUksTUFBSixDQUFBLENBQXZDO0VBQ1YsS0FBQSxDQUFNLENBQUMsQ0FBQyxLQUFSO1NBRUEsTUFBTSxDQUFDLGFBQVAsQ0FBQTtBQWpCYzs7QUFtQmYsTUFBTSxDQUFDLElBQVAsR0FBYyxRQUFBLENBQUEsQ0FBQTtFQUNiLFVBQUEsQ0FBVyxNQUFYO0VBQ0EsUUFBQSxDQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUgsQ0FBZjtTQUNBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUgsQ0FBUyxDQUFDLElBQWpCLENBQUE7QUFIYTs7QUFLZCxNQUFNLENBQUMsWUFBUCxHQUFzQixRQUFBLENBQUMsS0FBRCxDQUFBO1NBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSCxDQUFTLENBQUMsWUFBakIsQ0FBOEIsS0FBOUI7QUFBWDs7QUFDdEIsTUFBTSxDQUFDLFVBQVAsR0FBc0IsUUFBQSxDQUFDLEtBQUQsQ0FBQTtTQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUgsQ0FBUyxDQUFDLFVBQWpCLENBQTRCLEtBQTVCO0FBQVg7O0FBQ3RCLE1BQU0sQ0FBQyxVQUFQLEdBQXNCLFFBQUEsQ0FBQyxLQUFELENBQUE7QUFDdEIsTUFBQTtFQUFDLElBQUEsR0FBTztFQUNQLElBQUcsU0FBUyxhQUFULFNBQW1CLFdBQW5CLFNBQTJCLEdBQTlCO0FBQXdDLFdBQXhDOztFQUNBLElBQUcsSUFBQSxLQUFRLEdBQVg7SUFBb0IsSUFBQSxHQUFPLEtBQTNCOztFQUNBLElBQUcsSUFBQSxLQUFRLEdBQVg7SUFBb0IsSUFBQSxHQUFPLEtBQTNCOztTQUNBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUgsQ0FBUyxDQUFDLFVBQWpCLENBQTRCLEtBQTVCLEVBQWtDLElBQWxDO0FBTHFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2VFeHByIH0gZnJvbSAnLi9wYXJzZXIuanMnXHJcbmltcG9ydCB7IGcscHJpbnQscmFuZ2UgfSBmcm9tICcuL2dsb2JhbHMuanMnIFxyXG5pbXBvcnQgeyBCdXR0b24sc3ByZWFkIH0gZnJvbSAnLi9idXR0b24uanMnIFxyXG5pbXBvcnQgeyBMaXN0YSB9IGZyb20gJy4vbGlzdGEuanMnIFxyXG5pbXBvcnQgeyBUb3VybmFtZW50IH0gZnJvbSAnLi90b3VybmFtZW50LmpzJyBcclxuaW1wb3J0IHsgVGFibGVzIH0gZnJvbSAnLi9wYWdlX3RhYmxlcy5qcycgXHJcbmltcG9ydCB7IE5hbWVzIH0gZnJvbSAnLi9wYWdlX25hbWVzLmpzJyBcclxuaW1wb3J0IHsgU3RhbmRpbmdzIH0gZnJvbSAnLi9wYWdlX3N0YW5kaW5ncy5qcycgXHJcbmltcG9ydCB7IEFjdGl2ZSB9IGZyb20gJy4vcGFnZV9hY3RpdmUuanMnIFxyXG5cclxuZy5MUFAgPSAxNFxyXG5cclxuZy5SSU5HUyA9IHsnYic6J+KAoicsICcgJzonICcsICd3Jzonbyd9XHJcblxyXG5BU0NJSSA9ICcwMTIzNDU2Nzg5YWJjZGVmZydcclxuQUxGQUJFVCA9ICcxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JyAjIDYyIHJvbmRlciBtYXhpbWFsdFxyXG5cclxuZGF0dW0gPSAnJ1xyXG5nLnRvdXJuYW1lbnQgPSBudWxsXHJcbmcuZXJyb3JzID0gW10gIyBpZCBmw7ZyIG1vdHPDpGdlbHNlZnVsbGEgcmVzdWx0YXQuIFRhcyBib3J0IG1lZCBEZWxldGVcclxuXHJcbmcucGFnZXMgPSBbXVxyXG4jIHJlc3VsdGF0ID0gW10gIyAwMTIgc29ydGVyYWQgcMOlIGlkXHJcbiMgbWVzc2FnZSA9ICcnICNUaGlzIGlzIGEgdHV0b3JpYWwgZy50b3VybmFtZW50LiBVc2UgaXQgb3IgZWRpdCB0aGUgVVJMJ1xyXG5cclxud2luZG93LndpbmRvd1Jlc2l6ZWQgPSAtPiBcclxuXHRyZXNpemVDYW52YXMgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodC00XHJcblx0Zy5MUFAgPSBoZWlnaHQgLy8gZy5aT09NW2cuc3RhdGVdIC0gNFxyXG5cclxud2luZG93LnNldHVwID0gLT5cclxuXHRjcmVhdGVDYW52YXMgd2luZG93V2lkdGgtNCx3aW5kb3dIZWlnaHQtNFxyXG5cdHRleHRGb250ICdDb3VyaWVyIE5ldydcclxuXHQjIHRleHRBbGlnbiB3aW5kb3cuTEVGVCx3aW5kb3cuVE9QXHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHRyZWN0TW9kZSB3aW5kb3cuQ09STkVSXHJcblx0bm9TdHJva2UoKVxyXG5cclxuXHRnLlpPT00gPSBbMjAsMjAsMjAsMjBdICMgdmVydGljYWwgbGluZSBkaXN0YW5jZSBmb3IgZm91ciBzdGF0ZXNcclxuXHRnLnN0YXRlID0gZy5UQUJMRVNcclxuXHRnLk4gPSAwICMgbnVtYmVyIG9mIHBsYXllcnNcclxuXHRnLnRvdXJuYW1lbnQgPSBuZXcgVG91cm5hbWVudCgpXHJcblx0Zy5zdGF0ZSA9IGcuQUNUSVZFXHJcblxyXG5cdGcucGFnZXMgPSBbbmV3IFRhYmxlcywgbmV3IE5hbWVzLCBuZXcgU3RhbmRpbmdzLCBuZXcgQWN0aXZlXVxyXG5cdHByaW50IGcucGFnZXNcclxuXHJcblx0d2luZG93LndpbmRvd1Jlc2l6ZWQoKVxyXG5cclxud2luZG93LmRyYXcgPSAtPlxyXG5cdGJhY2tncm91bmQgJ2dyYXknXHJcblx0dGV4dFNpemUgZy5aT09NW2cuc3RhdGVdXHJcblx0Zy5wYWdlc1tnLnN0YXRlXS5kcmF3KClcclxuXHJcbndpbmRvdy5tb3VzZVByZXNzZWQgPSAoZXZlbnQpIC0+IGcucGFnZXNbZy5zdGF0ZV0ubW91c2VQcmVzc2VkIGV2ZW50XHJcbndpbmRvdy5tb3VzZVdoZWVsICAgPSAoZXZlbnQpIC0+IGcucGFnZXNbZy5zdGF0ZV0ubW91c2VXaGVlbCBldmVudFxyXG53aW5kb3cua2V5UHJlc3NlZCAgID0gKGV2ZW50KSAtPiBcclxuXHRrZXkyID0ga2V5XHJcblx0aWYga2V5MiBpbiBbJ0NvbnRyb2wnLCdTaGlmdCcsJ0knXSB0aGVuIHJldHVyblxyXG5cdGlmIGtleTIgPT0gJzEnIHRoZW4ga2V5MiA9ICdLMSdcclxuXHRpZiBrZXkyID09ICcwJyB0aGVuIGtleTIgPSAnSzAnXHJcblx0Zy5wYWdlc1tnLnN0YXRlXS5rZXlQcmVzc2VkIGV2ZW50LGtleTJcclxuIl19
//# sourceURL=c:\github\Dense\coffee\dense.coffee