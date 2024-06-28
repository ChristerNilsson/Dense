import { g,print,range } from './globals.js' 
import { Page } from './page.js' 
import { Button,spread } from './button.js' 
import { Lista } from './lista.js' 

export class Pairings extends Page

	constructor : () ->
		super()
		t = g.tournament
		y = 1.3 * g.ZOOM[g.state]
		h = 20

		@lista = new Lista t.playersByName, "Pause Name", (p) ->
			s = if p.active then '      ' else 'pause '
			s + g.txtT p.name, 25, window.LEFT

		@timestamp = 0
		@buttons = {}

		@buttons.t = new Button 'Tables', 'T = Tables',       () => g.setState 0
		@buttons.n = new Button 'Names',  'N = Names',        () => g.setState 1
		@buttons.s = new Button 'Standings', 'S = Standings', () => g.setState 2
		@buttons._ = new Button 'Pairings',     'Pair',       () => g.setState 3 #

		@buttons[' '] = new Button 'toggle',  'space = Toggles paused/active', () => t.playersByName[g.pages[g.state].lista.currentRow].toggle()

		@buttons.p = new Button 'Pair',     'P = Perform pairing',   () => t.lotta()
		@buttons.i = new Button 'I',        'I = zoom In',    () => g.zoomIn g.N//2
		@buttons.o = new Button 'O',        'O = zoom Out',   () => g.zoomOut g.N//2

		@buttons.ArrowLeft  = new Button '', '',    () => g.setState 2
		@buttons.ArrowRight = new Button '', '',    () => g.setState 0

		@buttons.ArrowUp = new Button '', '',     () => @lista.ArrowUp()
		@buttons.ArrowDown = new Button '','',    () => @lista.ArrowDown()

		@buttons.PageUp = new Button '', '',     () => @lista.PageUp()
		@buttons.PageDown = new Button '','',    () => @lista.PageDown()

		@buttons._.active = false
		spread @buttons, 0.6*g.ZOOM[g.state],y,h

	draw : ->
		fill 'white'
		@showHeader g.tournament.round

		@lista.draw()

		for key of @buttons
			button = @buttons[key]
			button.draw()

	mouseWheel : (event )-> @lista.mouseWheel event
	mousePressed : (event) -> 
		if mouseY < 4 * g.ZOOM[g.state]
			print 'pressed',mouseY,4 * g.ZOOM[g.state]
			print '@buttons',@buttons
			for key of @buttons
				button = @buttons[key]
				print button.title
				if button.inside mouseX,mouseY then button.click()
		else
			@lista.mousePressed event

	keyPressed : (event) -> @buttons[key].click()

