import { g,print,range } from './globals.js' 
import { Page } from './page.js' 
import { Button,spread } from './button.js' 
import { Lista } from './lista.js'  

export class Names extends Page

	constructor : ->
		super()
		@t = g.tournament
		@y = 1.3 * g.ZOOM[g.state]
		@h = 20
		@lista = new Lista

		@buttons.n.active = false
		@buttons.ArrowLeft  = new Button '', '', () => g.setState g.TABLES
		@buttons.ArrowRight = new Button '', '', () => g.setState g.STANDINGS

	setLista : ->
		@lista = new Lista @t.playersByName, "Table Name", @buttons, (p) =>
			r = @t.round - 1
			s = if p.active then "#{str(1 + p.chair // 2).padStart(3)} #{g.RINGS[p.col[r][0]]} " else 'pause '
			s + g.txtT p.name, 25, window.LEFT

		spread @buttons, 0.6*g.ZOOM[g.state], @y, @h

	mouseWheel   : (event )-> @lista.mouseWheel event
	mousePressed : (event) -> @lista.mousePressed event
	keyPressed   : (event) -> @buttons[key].click()

	make : (header,players,res) -> # players sorterad på namn
		return
		temp = _.clone players
		temp.sort (a,b) -> b[0].eloSum() - a[0].eloSum()

		for p,i in temp
			p[0].position = ""
			if p[0].eloSum() > 0 then p[0].position = "##{i+1}"

		res.push "NAMES" + header
		res.push ""
		r = @t.round
		for p,i in players
			if i % @ppp == 0 then res.push "Table Name"
			res.push "#{str(1 + p[1]//2).padStart(3)} #{RINGS[p[0].col[r][0]]} #{p[0].name} #{p[0].position}" 
			if i % @ppp == @ppp-1 then res.push "\f"
		res.push "\f"

	draw : ->
		fill 'white'
		@showHeader @t.round

		@lista.draw()
		for key,button of @buttons
			button.draw()