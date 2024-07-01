import { g,print,range } from './globals.js' 
import { Button,spread } from './button.js' 

export class Page
 
	constructor : ->
		@buttons = {}

		@buttons.t = new Button 'Tables', 'T = Tables',       () => g.setState g.TABLES
		@buttons.n = new Button 'Names',  'N = Names',        () => g.setState g.NAMES
		@buttons.s = new Button 'Standings', 'S = Standings', () => g.setState g.STANDINGS
		@buttons.a = new Button 'Active',  'A = Active',      () => g.setState g.ACTIVE

		@buttons.ArrowUp = new Button '', '', () => @lista.ArrowUp()
		@buttons.ArrowDown = new Button '','', () => @lista.ArrowDown()

		@buttons.PageUp = new Button '', '', () => @lista.PageUp()
		@buttons.PageDown = new Button '','', () => @lista.PageDown()

		@buttons.Home = new Button '', '', () => @lista.Home()
		@buttons.End = new Button '','', () => @lista.End()

		@buttons.i = new Button 'In', 'I = zoom In', () => g.zoomIn g.N//2
		@buttons.o = new Button 'Out', 'O = zoom Out', () => g.zoomOut g.N//2

	showHeader : (round) ->
		y = 0.6 * g.ZOOM[g.state]
		textAlign LEFT,CENTER
		s = ''
		s += g.txtT "#{g.tournament.title} #{g.tournament.datum}" , 30, window.LEFT
		s += g.txtT "#{g.message}" , 30, window.CENTER
		s += ' ' + g.txtT 'Round ' + round, 12, window.RIGHT
		text s,10,y

	txt : (value, x, y, align=null, color=null) ->
		push()
		if align then textAlign align,window.CENTER
		if color then fill color
		text value,x,y
		pop()