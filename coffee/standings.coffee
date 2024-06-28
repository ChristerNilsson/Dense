import { g,print,range } from './globals.js' 
import { Page } from './page.js' 
import { Button,spread } from './button.js' 

export class Standings extends Page

	constructor : () ->
		super()
		t = g.tournament
		y = 1.4 * g.ZOOM[g.state]
		h = 20
		@buttons = {}

		@buttons.t = new Button 'Tables', 'T = Tables',   () => g.setState 0
		@buttons.n = new Button 'Names',  'N = Names',    () => g.setState 1
		@buttons.s = new Button 'Standings', 'Standings', () => g.setState 2
		@buttons.p = new Button 'Pairings', 'P = pause/activate and pair',   () => g.setState 3

		@buttons.i = new Button 'I',     'I = zoom In',   () => g.zoomIn N
		@buttons.o = new Button 'O',     'O = zoom Out',  () => g.zoomOut N

		@buttons.ArrowLeft = new Button '', '',           () => g.setState 1
		@buttons.ArrowRight = new Button '', '',          () => g.setState 3

		@buttons.s.active = false
		spread @buttons, 0.6 * g.ZOOM[g.state], y, h

	mousePressed : ->
		for key of @buttons
			button = @buttons[key]
			if button.inside mouseX,mouseY then button.click()

	keyPressed : (event, key)-> @buttons[key].click()

	make : (header,res) ->
		if g.tournament.pairs.length == 0 then res.push "This ROUND can't be paired! (Too many rounds)"

		temp = _.clone g.tournament.persons
		temp.sort (a,b) -> 
			diff = b.eloSum() - a.eloSum()
			if diff != 0 then return diff
			return b.elo - a.elo

		inv = invert (p.id for p in temp)

		res.push "STANDINGS" + header
		res.push ""

		header = ""
		header +=       g.txtT "#",     2
		header += ' ' + g.txtT "Elo",   4,window.RIGHT
		header += ' ' + g.txtT "Name", 25,window.LEFT
		for r in range g.tournament.round
			header += g.txtT "#{r+1}",6,window.RIGHT
		header += '  ' + g.txtT "EloSum", 8,window.RIGHT
		if g.tournament.round <= @expl then header += '  ' + g.txtT "Explanation", 12,window.LEFT
		
		for person,i in temp
			if i % g.tournament.ppp == 0 then res.push header
			s = ""
			s +=       g.txtT (1+i).toString(),          2, window.RIGHT
			s += ' ' + g.txtT person.elo.toString(),     4, window.RIGHT
			s += ' ' + g.txtT person.name,              25, window.LEFT
			s += ' '
			for r in range g.tournament.round
				if person.opp[r] == -1
					s += '      '
				else 
					s += g.txtT "#{1+inv[person.opp[r]]}#{RINGS[person.col[r][0]]}#{"0½1"[person.res[r]]}", 6, window.RIGHT			
			s += ' ' + g.txtT person.eloSum().toFixed(1),  8, window.RIGHT
			terms = []
			print 'expl',g.tournament.round,@expl,g.tournament.round < @expl
			if g.tournament.round <= @expl
				for r in range g.tournament.round
					if person.opp[r] == -1
						terms.push "0 * 0"
					else
						key = person.col[r][0]+person.res[r]
						elo = @persons[person.opp[r]].elo
						terms.push "#{g.tournament.bonus[key]} * #{elo}"
				s += '  (' + terms.join(' + ') + ')'
			res.push s 
			if i % g.tournament.ppp == g.tournament.ppp-1 then res.push "\f"
		res.push "\f"

	lightbulb : (color, x, y, result, opponent) ->
		if result == "" then return
		push()
		result = '012'.indexOf result
		fill 'red gray green'.split(' ')[result]
		rectMode window.CENTER
		rect x,y,0.84 * g.ZOOM[g.state],0.9 * g.ZOOM[g.state]
		fill {b:'black', ' ':'yellow', w:'white'}[color]
		noStroke()
		strokeWeight = 0
		@txt opponent,x,y+1,window.CENTER
		pop()

	draw : ->

		noStroke()
		fill 'white'

		@showHeader g.tournament.round-1

		# if g.tournament.pairs.length == 0
		# 	print "This ROUND can't be paired! (Too many rounds)"
		# 	return

		playersByEloSum = _.clone g.tournament.persons.slice 0,N
		playersByEloSum.sort (a,b) -> 
			diff = b.eloSum() - a.eloSum()
			if diff != 0 then return diff
			return b.elo - a.elo

		inv = invert (p.id for p in playersByEloSum)

		y = 4.0 * g.ZOOM[g.state] # + currentResult
		textAlign LEFT
		rheader = _.map range(1,g.tournament.rounds+1), (i) -> "#{i%10} "
		rheader = rheader.join ' '
		s = ""
		s +=       g.txtT "Pos",          3,window.RIGHT
		s += ' ' + g.txtT "Elo",          4,window.RIGHT
		s += ' ' + g.txtT "Name",        25,window.LEFT
		s += ' ' + g.txtT rheader,3*@rounds,window.LEFT 
		s += ' ' + g.txtT "EloSum",       7,window.RIGHT
		text s,10,y

		fill 'black' 
		for person,i in playersByEloSum
			# print "Standings.draw: #{person}"
			y += g.ZOOM[g.state]
			s = ""
			s +=       g.txtT (1+i).toString(),           3, window.RIGHT
			s += ' ' + g.txtT person.elo.toString(),      4, window.RIGHT
			s += ' ' + g.txtT person.name,               25, window.LEFT
			s += ' ' + g.txtT '',       3*g.tournament.rounds, window.CENTER
			s += ' ' + g.txtT person.eloSum().toFixed(1), 7, window.RIGHT

			text s,10,y

			for r in range g.tournament.round-1
				x = g.ZOOM[g.state] * (10.85 + 0.9*r)
				if person.opp[r] == -1
					@txt "P",x,y+1,window.CENTER,'black'
				else if person.opp[r] == N
					@txt "BYE",x,y+1,window.CENTER,'black'
				else
					@lightbulb person.col[r][0], x, y, person.res[r], 1+inv[person.opp[r]]

		for key of @buttons
			button = @buttons[key]
			button.draw()

