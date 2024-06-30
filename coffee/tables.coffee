import { g,print,range } from './globals.js' 
import { Page } from './page.js' 
import { Button,spread } from './button.js' 
import { Lista } from './lista.js' 

export class Tables extends Page

	constructor : () ->
		super()
		@t = g.tournament
		@y = 1.3 * g.ZOOM[g.state]
		@h = 20
		@errors = []
		@lista = new Lista

		@buttons.ArrowLeft  = new Button '', '', () => g.setState g.PAIRINGS
		@buttons.ArrowRight = new Button '', '', () => g.setState g.NAMES

		@buttons.K1     = new Button '1',   '1 = White Win',          () => @handleResult '1'
		@buttons[' ']   = new Button '½',   'space = Draw',           () => @handleResult ' '
		@buttons.K0     = new Button '0',   '0 = White Loss',         () => @handleResult '0'
		@buttons.Delete = new Button 'Del', 'delete = Remove result', () => @handleDelete()
		@buttons.r      = new Button 'R',   'R = Random results',     () => @randomResult()

		@buttons.t.active = false

	setLista : ->
		print 'Lista', @t.pairs.length
		header = ""
		header +=       g.txtT 'Tbl',    3,window.RIGHT
		header += ' ' + g.txtT 'Elo',    4,window.RIGHT
		header += ' ' + g.txtT 'White', 25,window.LEFT
		header += ' ' + g.txtT 'Result', 7,window.CENTER
		header += ' ' + g.txtT 'Black', 25,window.LEFT
		header += ' ' + g.txtT 'Elo',    4,window.RIGHT

		@lista = new Lista @t.pairs, header, @buttons, (pair,index) =>
			# s = if p.active then '      ' else 'pause '
			# s + g.txtT p.name, 25, window.LEFT

			# print pair,index

			# return pair

			[a,b] = pair
			# print 'lista',a,b
			pa = @t.persons[a]
			pb = @t.persons[b]
			# y += g.ZOOM[g.state]
			# sa = g.myRound pa.score(), 1
			# sb = g.myRound pb.score(), 1
			both = if pa.res.length == pa.col.length then g.prBoth _.last(pa.res) else "   -   "

			nr = index + 1
			s = ""
			s += g.txtT nr.toString(), 3, window.RIGHT
			s += ' ' + g.txtT pa.elo.toString(), 4, window.RIGHT
			s += ' ' + g.txtT pa.name, 25, window.LEFT
			s += ' ' + g.txtT both,7, window.CENTER
			s += ' ' + g.txtT pb.name, 25, window.LEFT
			s += ' ' + g.txtT pb.elo.toString(), 4, window.RIGHT
			s

		spread @buttons, 0.6 * g.ZOOM[g.state], @y, @h

	mouseWheel   : (event )-> @lista.mouseWheel event
	mousePressed : (event) -> @lista.mousePressed event
	keyPressed   : (event,key) -> @buttons[key].click()

	draw : ->
		fill 'white'
		@showHeader @t.round
		for key,button of @buttons
			button.draw()
		@lista.draw()

		# y = 4.0 * g.ZOOM[g.state]
		# textAlign window.LEFT
		# text s,10,y

		# for i in range g.tournament.pairs.length

			# if i == @currentTable
			# 	fill  'yellow'
			# 	noStroke()
			# 	rect 0, y-0.6 * g.ZOOM[g.state], width, g.ZOOM[g.state]
			# 	fill 'black'
			# else
			# 	if i in g.errors then fill 'red' else fill 'black'
			# text s,10,y

	elo_probabilities : (R_W, R_B, draw=0.2) ->
		E_W = 1 / (1 + 10 ** ((R_B - R_W) / 400))
		win = E_W - draw / 2
		loss = (1 - E_W) - draw / 2
		x = _.random 0,1,true
		index = 2
		if x < loss + draw then index = 1
		if x < loss then index = 0
		index

	handleResult : (key) =>
		[a,b] = @t.pairs[@lista.currentRow]
		pa = @t.persons[a]
		pb = @t.persons[b]
		index = '0 1'.indexOf key
		ch = "012"[index]
		if pa.res.length == pa.col.length 
			if ch != _.last pa.res
				@errors.push @lista.currentRow
				print 'errors',@errors
		else
			if pa.res.length < pa.col.length then pa.res += "012"[index]
			if pb.res.length < pb.col.length then pb.res += "210"[index]
		@lista.currentRow = (@lista.currentRow + 1) %% @t.pairs.length

	randomResult : ->
		for i in range @t.pairs.length
			[a,b] = @t.pairs[i]
			pa = @t.persons[a]
			pb = @t.persons[b]
			res = @elo_probabilities pa.elo, pb.elo
			if pa.res.length < pa.col.length then pa.res += "012"[res] 
			if pb.res.length < pb.col.length then pb.res += "210"[res]

	handleDelete : ->
		i = @lista.currentRow
		[a,b] = @t.pairs[i]
		pa = @t.persons[a]
		pb = @t.persons[b]
		@errors = (e for e in @errors when e != i)
		if pa.res.length == pb.res.length
			[a,b] = @t.pairs[i]
			pa = @t.persons[a]
			pb = @t.persons[b]
			pa.res = pa.res.substring 0,pa.res.length-1
			pb.res = pb.res.substring 0,pb.res.length-1
		@lista.currentRow = (@lista.currentRow + 1) %% @t.pairs.length

	make : (header,res) ->
		res.push "TABLES" + header
		res.push ""
		for i in range g.tournament.pairs.length
			[a,b] = g.tournament.pairs[i]
			if i % g.tournament.tpp == 0 then res.push "Table      #{g.RINGS.w}".padEnd(25) + _.pad("",28+10) + "#{g.RINGS.b}" #.padEnd(25)
			pa = g.tournament.persons[a]
			pb = g.tournament.persons[b]
			res.push ""
			res.push _.pad(i+1,6) + pa.elo + ' ' + g.txtT(pa.name, 25, window.LEFT) + ' ' + _.pad("|____| - |____|",20) + ' ' + pb.elo + ' ' + g.txtT(pb.name, 25, window.LEFT)
			if i % g.tournament.tpp == g.tournament.tpp-1 then res.push "\f"