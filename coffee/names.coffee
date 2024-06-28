import { g,print,range } from './globals.js' 
import { Page } from './page.js' 
import { Button,spread } from './button.js' 

export class Names extends Page

	constructor : () ->
		super()
		t = g.tournament
		y = 1.4 * g.ZOOM[g.state]
		h = 20
		@currentPlayer = 0
		@buttons = {}

		@buttons.t = new Button 'Tables',  'T = Tables',       () => setState 0
		@buttons.n = new Button 'Names',   'Names',            () => setState 1 #
		@buttons.s = new Button 'Standings',  'S = Standings', () => setState 2
		@buttons.p = new Button 'Pairings', 'P = pause/activate and pair',   () => setState 3

		@buttons.i = new Button 'I',      'I = zoom In',       () => zoomIn N
		@buttons.o = new Button 'O',      'O = zoom Out',      () => zoomOut N

		@buttons.ArrowLeft  = new Button '', '',     () => setState 0
		@buttons.ArrowRight = new Button '', '',     () => setState 2

		@buttons.ArrowUp = new Button '', '',     () =>
			@currentPlayer = (@currentPlayer - 1) %% N 
			event.preventDefault()
		@buttons.ArrowDown = new Button '', '',   () =>
			@currentPlayer = (@currentPlayer + 1) %% N 
			event.preventDefault()

		@buttons.n.active = false
		spread @buttons, 0.6*g.ZOOM[g.state], y, h

	mousePressed : -> 
		if mouseY > 4 * g.ZOOM[g.state]
			@currentPlayer = int mouseY / g.ZOOM[g.state] - 4.5
		else
			for key of @buttons
				button = @buttons[key]
				if button.inside mouseX,mouseY then button.click()

	keyPressed : (event, key)-> @buttons[key].click()

	make : (header,players,res) -> # players sorterad på namn
		temp = _.clone players
		temp.sort (a,b) -> b[0].eloSum() - a[0].eloSum()

		for p,i in temp
			p[0].position = ""
			if p[0].eloSum() > 0 then p[0].position = "##{i+1}"

		res.push "NAMES" + header
		res.push ""
		r = g.tournament.round
		for p,i in players
			if i % @ppp == 0 then res.push "Table Name"
			res.push "#{str(1 + p[1]//2).padStart(3)} #{RINGS[p[0].col[r][0]]} #{p[0].name} #{p[0].position}" 
			if i % @ppp == @ppp-1 then res.push "\f"
		res.push "\f"

	draw : ->

		fill 'white'
		@showHeader g.tournament.round

		y = 4.0 * g.ZOOM[g.state]
		s = ""
		s += g.txtT 'Table',     6,window.LEFT
		s += g.txtT 'Name',     25,window.LEFT
		s += g.txtT 'Pos', 4,window.RIGHT
		textAlign window.LEFT
		text s,10,y

		playersByEloSum = _.clone g.tournament.persons
		playersByEloSum.sort (a,b) -> b.eloSum() - a.eloSum()

		for player,i in playersByEloSum
			p = g.tournament.persons[player.id]
			p.position = ""
			if p.eloSum() > 0 then p.position = "#{i+1}"

		fill 'black'
		r = g.tournament.round - 1
		for p,i in g.tournament.playersByName
			y += g.ZOOM[g.state]
			s = ""
			if g.tournament.round == 0
				s += if p.active then '      ' else ' paus '
				s += g.txtT p.name,                     25, window.LEFT
			else
				if p.active and p.name != 'BYE'
					s += g.txtT (1 + p.chair//2).toString(), 3, window.RIGHT
					s += g.txtT RINGS[p.col[r][0]],          3, window.CENTER
					s += g.txtT p.name,                     25, window.LEFT
					s += g.txtT p.position.toString(),       4, window.RIGHT
				else
					s += '      '
					s += g.txtT p.name,                     25, window.LEFT

			if i == @currentPlayer
				fill  'yellow'
				noStroke()
				rect 0,y-0.6 * g.ZOOM[g.state],width, g.ZOOM[g.state]
				fill 'black'

			text s,10,y

		for key of @buttons
			button = @buttons[key]
			button.draw()
		
