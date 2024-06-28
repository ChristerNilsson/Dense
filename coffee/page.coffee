import { g,print,range } from './globals.js' 

export class Page
 
	constructor : ->
		@buttons = []

	showHeader : (round) ->
		y = 0.6 * g.ZOOM[g.state]
		textAlign LEFT,CENTER
		s = ''
		s += g.txtT "#{g.tournament.title} #{g.tournament.datum}" , 30, window.LEFT
		s += ' ' + g.txtT 'Round ' + round, 26, window.RIGHT
		text s,10,y

	txt : (value, x, y, align=null, color=null) ->
		push()
		if align then textAlign align,window.CENTER
		if color then fill color
		text value,x,y
		pop()

