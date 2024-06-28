import { parseExpr } from './parser.js'
import { Edmonds } from './mattkrick.js' 
import { g,print,range } from './globals.js' 
import { Button,spread } from './button.js' 
import { Lista } from './lista.js' 
import { Tournament } from './tournament.js' 
import { Tables } from './tables.js' 
import { Names } from './names.js' 
import { Standings } from './standings.js' 
import { Pairings } from './pairings.js' 

# parameters that somewhat affects matching
COST = 'QUADRATIC' # QUADRATIC=1.01 or LINEAR=1
DIFF = 'ID' # ID or ELO
COLORS = 1 # 1 or 2

TABLES = 0
NAMES = 1
STANDINGS = 2
PAIRINGS = 3

g.LPP = 14

RINGS = {'b':'•', ' ':' ', 'w':'o'}

ASCII = '0123456789abcdefg'
ALFABET = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' # 62 ronder maximalt

datum = ''
g.tournament = null
errors = [] # id för motsägelsefulla resultat. Tas bort med Delete

g.pages = []
resultat = [] # 012 sorterad på id
message = '' #This is a tutorial g.tournament. Use it or edit the URL'

showType = (a) -> if typeof a == 'string' then "'#{a}'" else a
#assert = (a,b) -> if not _.isEqual a,b then print "Assert failure: #{showType a} != #{showType b}"
assert = (a,b) -> if not _.isEqual a,b then print "Assert failure: #{JSON.stringify a} != #{JSON.stringify b}"

ok = (p0, p1) -> p0.id != p1.id and p0.id not in p1.opp and abs(p0.balans() + p1.balans()) <= COLORS
other = (col) -> if col == 'b' then 'w' else 'b'

myRound = (x,decs) -> x.toFixed decs
assert "2.0", myRound 1.99,1
assert "0.6", myRound 0.61,1

ints2strings = (ints) -> "#{ints}"
assert "1,2,3", ints2strings [1,2,3]
assert "1", ints2strings [1]
assert "", ints2strings []

res2string = (ints) -> (i.toString() for i in ints).join ''
assert "123", res2string [1,2,3]
assert "1", res2string [1]
assert "", res2string []

xxx = [[2,1],[12,2],[12,1],[3,4]]
xxx.sort (a,b) -> 
	diff = a[0] - b[0] 
	if diff == 0 then a[1] - b[1] else diff
assert [[2,1], [3,4], [12,1], [12,2]], xxx	
assert true, [2] > [12]
assert true, "2" > "12"
assert false, 2 > 12

# xxx = [[2,1],[12,2],[12,1],[3,4]]
# assert [[2,1],[12,1],[12,2],[3,4]], _.sortBy(xxx, (x) -> [x[0],x[1]])
# assert [[3,4],[2,1],[12,1],[12,2]], _.sortBy(xxx, (x) -> -x[0])
# assert [[2,1],[12,1],[3,4],[12,2]], _.sortBy(xxx, (x) -> x[1])
# assert [[3,4],[12,1],[2,1],[12,2]], _.sortBy(xxx, (x) -> -x[1])

normera = (a,b,k) -> Math.round (b - k*a) / (k-1) # Räknar ut vad som ska adderas till elotalen
assert  -406, normera 1406,2406,2   # 1000,2000
assert -1900, normera 1950,2000,2   #   50,100
assert     0, normera 1000,2000,2   # 1000,2000
assert   200, normera 900,2000,2    # 1100,2200
assert -1200, normera 1600,2000,2   #  400,800
assert  -500, normera 1000,2000,3   #  500,1500
assert -1000, normera 1200,1800,4   #  200,800
assert -1067, normera 1400,2400,4   #  333,1333
assert  -800, normera 1600,2000,1.5 #  800,1200
assert   400, normera 1600,2000,1.2 # 2000,2400
assert  2400, normera 1600,2000,1.1 # 4000,4400

sum = (s) ->
	res = 0
	for item in s
		res += parseFloat item
	res
assert 6, sum '012012'

downloadFile = (txt,filename) ->
	blob = new Blob [txt], { type: 'text/plain' }
	url = URL.createObjectURL blob
	a = document.createElement 'a'
	a.href = url
	a.download = filename
	document.body.appendChild a
	a.click()
	document.body.removeChild a
	URL.revokeObjectURL url

prBoth = (score) -> " #{'0½1'[score]} - #{'1½0'[score]} "

invert = (arr) ->
	res = []
	for i in range arr.length
		res[arr[i]] = i
	return res
assert [0,1,2,3], invert [0,1,2,3]
assert [3,2,0,1], invert [2,3,1,0]
assert [2,3,1,0], invert invert [2,3,1,0]

window.windowResized = -> 
	resizeCanvas windowWidth, windowHeight-4
	g.LPP = height // g.ZOOM[g.state] - 4

window.setup = ->
	createCanvas windowWidth-4,windowHeight-4
	textFont 'Courier New'
	# textAlign window.LEFT,window.TOP
	textAlign CENTER,CENTER
	rectMode window.CORNER

	g.ZOOM = [20,20,20,20] # vertical line distance for four states
	g.state = g.TABLES
	g.tournament = new Tournament
	g.N = 0 # number of players

	g.tournament = new Tournament()
	# g.tournament.lotta()
	g.state = 3

	g.pages = [new Tables, new Names, new Standings, new Pairings]
	print g.pages

	window.windowResized()

window.draw = ->
	background 'gray'
	textSize g.ZOOM[g.state]
	g.pages[g.state].draw()

window.mousePressed = (event) -> g.pages[g.state].mousePressed event
window.mouseWheel   = (event) -> g.pages[g.state].mouseWheel event
window.keyPressed   = (event) -> g.pages[g.state].keyPressed event,key
	# om något resultat saknas för en aktiv spelare, ska ingen lottning ske
	# if key in 'pP'
	# 	for p in g.tournament.persons
	# 		if p.active and p.res.length < p.col.length
	# 			print 'Pairings kan ej nås pga att resultat saknas för bl a',"#{p}"
	# 			return 

