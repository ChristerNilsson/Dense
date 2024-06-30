import { g,print,range } from './globals.js' 
import { Page } from './page.js' 
import { Button,spread } from './button.js' 
import { Lista } from './lista.js' 

export class Pairings extends Page

	constructor : ->
		super()
		@t = g.tournament
		@y = 1.3 * g.ZOOM[g.state]
		@h = 20
		@lista = new Lista

		@buttons.ArrowLeft  = new Button '', '', () => g.setState g.STANDINGS
		@buttons.ArrowRight = new Button '', '', () => g.setState g.TABLES

		@buttons.p = new Button 'Pair', 'P = Perform pairing', () => @t.lotta()
		@buttons[' '] = new Button 'toggle', 'space = Toggle pause/active', 
			() => @t.playersByName[g.pages[g.state].lista.currentRow].toggle()

		@buttons._.active = false
		@setLista()

	setLista : ->
		@lista = new Lista @t.playersByName, "Pause Name", @buttons, (p) ->
			s = if p.active then '      ' else 'pause '
			s + g.txtT p.name, 25, window.LEFT
		spread @buttons, 0.6*g.ZOOM[g.state],@y,@h

	draw : ->
		fill 'white'
		@showHeader @t.round
		@lista.draw()
		for key of @buttons
			button = @buttons[key]
			button.draw()

	mouseWheel : (event )-> @lista.mouseWheel event
	mousePressed : (event) -> @lista.mousePressed event
	keyPressed : (event) -> @buttons[key].click()