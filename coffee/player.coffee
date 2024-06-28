import { g,print,range } from './globals.js' 

export class Player
	constructor : (@id, @name="", @elo="1400", @opp=[], @col="", @res="") -> @active = true
	toString : -> "#{@id} #{@name} elo:#{@elo} #{@col} res:#{@res} opp:[#{@opp}] score:#{@score().toFixed(1)} eloSum:#{@eloSum().toFixed(0)}"

	toggle : -> 
		@active = not @active
		print 'toggle1', g.tournament.persons
		g.tournament.paused = (p.id for p in g.tournament.persons when not p.active)
		print 'toggle2',g.tournament.paused

	eloSum : -> 
		summa = 0
		for i in range @res.length
			if @opp[i] != -1 then summa += normera(g.tournament.persons[@opp[i]].elo) * g.tournament.bonus[@col[i] + @res[i]] 
		summa

	avgEloDiff : ->
		res = []
		for id in @opp.slice 0, @opp.length - 1
			#res.push abs normera(@elo) - normera(tournament.persons[id].elo)
			if id != -1 then res.push abs @elo - g.tournament.persons[id].elo
		if res.length == 0 then 0 else sum(res) / res.length

	balans : -> # färgbalans
		result = 0
		for ch in @col
			if ch=='b' then result -= 1
			if ch=='w' then result += 1
		result

	score : ->
		result = 0
		n = g.tournament.round
		sp = g.tournament.sp
		for i in range n
			if i < @col.length and i < @res.length
				key = @col[i] + @res[i]
				#result += {'w2': 1-sp, 'b2': 1, 'w1': 0.5-sp, 'b1': 0.5+sp, 'w0': 0, 'b0': sp}[key]
				res = {'w2': 1, 'b2': 1+2*sp, 'w1': 0.5-sp, 'b1': 0.5+sp, 'w0': 0, 'b0': 0}[key]
		#print 'id,score',@id, @res, result,n
		result

	read : (player) -> 
		# (1234|Christer|(12w0|23b½|14w)) 
		# (1234|Christer) 
		# print 'read',player
		@elo = parseInt player[0]
		@name = player[1]
		@opp = []
		@col = ""
		@res = ""
		if player.length < 3 then return
		ocrs = player[2]
		for ocr in ocrs
			if 'w' in ocr then col='w' else col='b'
			arr = ocr.split col
			@opp.push parseInt arr[0]
			@col += col
			if arr.length == 2 and arr[1].length == 1
				@res += {'0':'0', '½':'1', '1':'2'}[arr[1]]  
		print @

	write : -> # (1234|Christer|(12w0|23b½|14w)) Elo:1234 Name:Christer opponent:23 color:b result:½
		res = []
		res.push @elo
		res.push @name.replaceAll ' ','_'
		nn = @opp.length - 1
		ocr = ("#{@opp[i]}#{@col[i]}#{if i < nn then "0½1"[@res[i]] else ''}" for i in range(nn)) 
		res.push '(' + ocr.join('|') + ')'
		res.join '|'
