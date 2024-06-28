import { g,print,range } from './globals.js' 
import { Page } from './page.js' 
import { Button,spread } from './button.js' 

export class Tables extends Page

	constructor : () ->
		super()
		t = g.tournament
		y = 1.4 * g.ZOOM[g.state]

		h = 20
		@currentTable = 0
		@buttons = {}

		@buttons.t = new Button 'Tables', 'Shows all the table',            () => g.setState TABLES
		@buttons.n = new Button 'Names',  'N = Shows names alphabetically', () => g.setState NAMES
		@buttons.s = new Button 'Standings', 'S = Shows the standings',     () => g.setState STANDINGS
		@buttons.p = new Button 'Pairings', 'P = pause/activate and pair',  () => g.setState PAIRINGS

		@buttons.K1     = new Button '1',  '1 = White Win',           () => @handleResult t, '1'
		@buttons[' ']   = new Button '½',  'space = Draw',            () => @handleResult t, ' '
		@buttons.K0     = new Button '0',   '0 = White Loss',         () => @handleResult t, '0'
		@buttons.Delete = new Button 'Del', 'delete = Remove result', () => @handleDelete t
		@buttons.i      = new Button 'I',   'I = zoom In',            () => g.zoomIn N//2
		@buttons.o      = new Button 'O',   'O = zoom Out',           () => g.zoomOut N//2
		@buttons.r      = new Button 'R',   'R = Random results',     () => @fakeInput()

		@buttons.Home = new Button '',  '', () => @currentTable = 0
		@buttons.End  = new Button '',  '', () => @currentTable = g.tournament.pairs.length - 1

		@buttons.ArrowLeft  = new Button '', '', () => g.setState PAIRINGS
		@buttons.ArrowRight = new Button '', '', () => g.setState NAMES

		@buttons.ArrowUp = new Button '', '',    () =>
			@currentTable = (@currentTable - 1) %% g.tournament.pairs.length
			event.preventDefault()
		@buttons.ArrowDown = new Button '', '',  () =>
			@currentTable = (@currentTable + 1) %% g.tournament.pairs.length
			event.preventDefault()

		@buttons.t.active = false
		spread @buttons, 0.6 * g.ZOOM[g.state], y, h

	mousePressed : -> 
		if mouseY > 4 * g.ZOOM[g.state]
			@currentTable = int mouseY / g.ZOOM[g.state] - 4.5
		else
			for key of @buttons
				button = @buttons[key]
				if button.inside mouseX,mouseY then button.click()

	keyPressed : (event, key)-> 
		if key in '01' then key = 'K' + key
		if key not of @buttons then return
		@buttons[key].click()

	elo_probabilities : (R_W, R_B, draw=0.2) ->
		E_W = 1 / (1 + 10 ** ((R_B - R_W) / 400))
		win = E_W - draw / 2
		loss = (1 - E_W) - draw / 2
		x = _.random 0,1,true
		index = 2
		if x < loss + draw then index = 1
		if x < loss then index = 0
		index

	handleResult : (t,key) =>
		[a,b] = t.pairs[@currentTable]
		pa = t.persons[a]
		pb = t.persons[b]
		index = '0 1'.indexOf key
		ch = "012"[index]
		if pa.res.length == pa.col.length 
			if ch != _.last pa.res
				errors.push @currentTable
				print 'errors',errors
		else
			if pa.res.length < pa.col.length then pa.res += "012"[index]
			if pb.res.length < pb.col.length then pb.res += "210"[index]
		@currentTable = (@currentTable + 1) %% g.tournament.pairs.length

	fakeInput : ->
		currentTable = 0 
		for i in range g.tournament.pairs.length
			[a,b] = g.tournament.pairs[i]
			pa = g.tournament.persons[a]
			pb = g.tournament.persons[b]
			res = @elo_probabilities pa.elo, pb.elo
			if pa.res.length < pa.col.length then pa.res += "012"[res] 
			if pb.res.length < pb.col.length then pb.res += "210"[res]

	handleDelete : ->
		[a,b] = g.tournament.pairs[@currentTable]
		pa = g.tournament.persons[a]
		pb = g.tournament.persons[b]
		i = @currentTable
		errors = (e for e in errors when e != i)
		if pa.res.length == pb.res.length
			[a,b] = g.tournament.pairs[i]
			pa = g.tournament.persons[a]
			pb = g.tournament.persons[b]
			pa.res = pa.res.substring 0,pa.res.length-1
			pb.res = pb.res.substring 0,pb.res.length-1
		@currentTable = (@currentTable + 1) %% g.tournament.pairs.length

	make : (header,res) ->
		res.push "TABLES" + header
		res.push ""
		for i in range g.tournament.pairs.length
			[a,b] = g.tournament.pairs[i]
			if i % g.tournament.tpp == 0 then res.push "Table      #{RINGS.w}".padEnd(25) + _.pad("",28+10) + "#{RINGS.b}" #.padEnd(25)
			pa = g.tournament.persons[a]
			pb = g.tournament.persons[b]
			res.push ""
			res.push _.pad(i+1,6) + pa.elo + ' ' + g.txtT(pa.name, 25, window.LEFT) + ' ' + _.pad("|____| - |____|",20) + ' ' + pb.elo + ' ' + g.txtT(pb.name, 25, window.LEFT)
			if i % g.tournament.tpp == g.tournament.tpp-1 then res.push "\f"

	draw : ->
		fill 'white'
		@showHeader g.tournament.round
		for key of @buttons
			button = @buttons[key]
			button.draw()

		y = 4.0 * g.ZOOM[g.state]
		s = ""
		s +=       g.txtT 'Tbl',    3,window.RIGHT
		s += ' ' + g.txtT 'Elo',    4,window.RIGHT
		s += ' ' + g.txtT 'White', 25,window.LEFT
		s += ' ' + g.txtT 'Result', 7,window.CENTER
		s += ' ' + g.txtT 'Black', 25,window.LEFT
		s += ' ' + g.txtT 'Elo',    4,window.RIGHT
		textAlign window.LEFT
		text s,10,y

		for i in range g.tournament.pairs.length
			[a,b] = g.tournament.pairs[i]
			a = g.tournament.persons[a]
			b = g.tournament.persons[b]
			y += g.ZOOM[g.state]
			pa = myRound a.score(), 1
			pb = myRound b.score(), 1
			both = if a.res.length == a.col.length then prBoth _.last(a.res) else "   -   "

			nr = i+1
			s = ""
			s += g.txtT nr.toString(), 3, window.RIGHT
			s += ' ' + g.txtT a.elo.toString(), 4, window.RIGHT
			s += ' ' + g.txtT a.name, 25, window.LEFT
			s += ' ' + g.txtT both,7, window.CENTER
			s += ' ' + g.txtT b.name, 25, window.LEFT
			s += ' ' + g.txtT b.elo.toString(), 4, window.RIGHT

			if i == @currentTable
				fill  'yellow'
				noStroke()
				rect 0, y-0.6 * g.ZOOM[g.state], width, g.ZOOM[g.state]
				fill 'black'
			else
				if i in errors then fill 'red' else fill 'black'
			text s,10,y

