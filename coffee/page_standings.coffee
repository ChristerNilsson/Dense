import { g,print,range,scale } from './globals.js' 
import { Page } from './page.js' 
import { Button,spread } from './button.js'  
import { Lista } from './lista.js' 

export class Standings extends Page

	constructor : ->
		super()
		# @t = g.tournament
		# @y = 1.3
		# @h = 1
		# @lista = new Lista

		@buttons.ArrowLeft  = new Button '', '', () => g.setState g.NAMES
		@buttons.ArrowRight = new Button '', '', () => g.setState g.ACTIVE
		@buttons.s.active = false
		# spread @buttons, 0.6 * g.ZOOM[g.state], @y, @h

	setLista : ->

		rheader = _.map range(1,@t.rounds+1), (i) -> "#{i%10} "
		rheader = rheader.join ' '
		header = ""
		header +=       g.txtT "Pos",          3,window.RIGHT
		header += ' ' + g.txtT "Id",           3,window.RIGHT
		header += ' ' + g.txtT "Elo",          4,window.RIGHT
		header += ' ' + g.txtT "Name",        25,window.LEFT
		header += ' ' + g.txtT rheader,3*@rounds,window.LEFT 
		header += ' ' + g.txtT "EloSum",       8,window.RIGHT

		playersByEloSum = _.clone @t.persons.slice 0,g.N
		playersByEloSum.sort (a,b) -> 
			diff = b.eloSum() - a.eloSum()
			if diff != 0 then return diff
			return b.elo - a.elo

		@inv = g.invert (p.id for p in playersByEloSum)

		@lista = new Lista playersByEloSum, header, @buttons, (p,index) => # returnera strängen som ska skrivas ut. Dessutom ritas lightbulbs här.
			@y = (5 + index - @lista.offset) * g.ZOOM[g.state] 
			textAlign LEFT
			fill 'black' 
			s = ""
			s +=       g.txtT (1+index).toString(),   3, window.RIGHT
			s += ' ' + g.txtT (1+p.id).toString(),    3, window.RIGHT
			s += ' ' + g.txtT p.elo.toString(),       4, window.RIGHT
			s += ' ' + g.txtT p.name,                25, window.LEFT
			s += ' ' + g.txtT '',         3 * @t.rounds, window.CENTER
			s += ' ' + g.txtT p.eloSum().toFixed(1),  7, window.RIGHT

			for r in range g.tournament.round - 1
				x = g.ZOOM[g.state] * (24.2 + 1.8*r)
				if p.opp[r] == -1 then @txt "P", x, @y+1, window.CENTER, 'black'
				else if p.opp[r] == g.N then @txt "BYE", x, @y+1, window.CENTER, 'black'
				# else @lightbulb p.col[r], x, @y, p.res.slice(r,r+1), 1 + @inv[p.opp[r]]
				else @lightbulb p.col[r], x, @y, p.res.slice(r,r+1), 1 + p.opp[r]
			s
		@lista.paintYellowRow = false
		spread @buttons, 10, @y, @h

	mouseWheel   : (event )-> @lista.mouseWheel event
	mousePressed : (event) -> @lista.mousePressed event
	keyPressed   : (event) -> @buttons[key].click()

	draw : ->
		fill 'white'
		@showHeader @t.round-1
		@lista.draw()
		for key,button of @buttons
			button.draw()

	lightbulb : (color, x, y, result, opponent) ->
		if result == "" then return
		push()
		result = '012'.indexOf result
		fill 'red gray green'.split(' ')[result]
		rectMode window.CENTER
		rect x, y, 1.6 * g.ZOOM[g.state], 0.9 * g.ZOOM[g.state]
		fill {b:'black', ' ':'yellow', w:'white'}[color]
		@txt opponent,x,y+1,window.CENTER
		pop()			

	make : (header,res) ->
		if @t.pairs.length == 0 then res.push "This ROUND can't be paired! (Too many rounds)"

		temp = _.clone @t.persons
		temp.sort (a,b) -> 
			diff = b.eloSum() - a.eloSum()
			if diff != 0 then return diff
			return b.elo - a.elo

		inv = g.invert (p.id for p in temp)

		res.push "STANDINGS" + header
		res.push ""

		header = ""
		header +=       g.txtT "#",     2
		header += ' ' + g.txtT "Elo",   4,window.RIGHT
		header += ' ' + g.txtT "Name", 25,window.LEFT
		for r in range @t.round
			header += g.txtT "#{r+1}",6,window.RIGHT
		header += '   ' + g.txtT "EloSum", 8,window.RIGHT
		if @t.round <= @expl then header += '  ' + g.txtT "Explanation", 12,window.LEFT
		
		for person,i in temp
			if i % @t.ppp == 0 then res.push header
			s = ""
			s +=       g.txtT (1+i).toString(),          2, window.RIGHT
			s += ' ' + g.txtT person.elo.toString(),     4, window.RIGHT
			s += ' ' + g.txtT person.name,              25, window.LEFT
			s += ' '
			for r in range @t.round
				if person.opp[r] == -1
					s += '      '
				else 
					s += g.txtT "#{1+inv[person.opp[r]]}#{g.RINGS[person.col[r][0]]}#{"0½1"[person.res[r]]}", 6, window.RIGHT			
			s += ' ' + g.txtT person.eloSum().toFixed(1),  8, window.RIGHT
			terms = []
			print 'expl',@t.round,@expl,@t.round < @expl
			if @t.round <= @expl
				for r in range @t.round
					if person.opp[r] == -1
						terms.push "0 * 0"
					else
						key = person.col[r][0]+person.res[r]
						elo = @persons[person.opp[r]].elo
						terms.push "#{@t.bonus[key]} * #{elo}"
				s += '  (' + terms.join(' + ') + ')'
			res.push s 
			if i % @t.ppp == @t.ppp-1 then res.push "\f"
		res.push "\f"