import { Tournament } from './tournament.js' 
import { Tables } from './tables.js' 
import { Names } from './names.js' 
import { Standings } from './standings.js' 
import { Pairings } from './pairings.js' 

export print = console.log
export range = _.range

export g = {}

g.LPP = 14

# parameters that somewhat affects matching
g.COST = 'QUADRATIC' # QUADRATIC=1.01 or LINEAR=1
g.DIFF = 'ID' # ID or ELO
g.COLORS = 1 # 1 or 2

g.TABLES = 0
g.NAMES = 1
g.STANDINGS = 2
g.PAIRINGS = 3

g.showType = (a) -> if typeof a == 'string' then "'#{a}'" else a
#assert = (a,b) -> if not _.isEqual a,b then print "Assert failure: #{showType a} != #{showType b}"
g.assert = (a,b) -> if not _.isEqual a,b then print "Assert failure: #{JSON.stringify a} != #{JSON.stringify b}"

g.ok = (p0, p1) -> p0.id != p1.id and p0.id not in p1.opp and abs(p0.balans() + p1.balans()) <= g.COLORS
g.other = (col) -> if col == 'b' then 'w' else 'b'

g.myRound = (x,decs) -> x.toFixed decs
g.assert "2.0", g.myRound 1.99,1
g.assert "0.6", g.myRound 0.61,1

g.ints2strings = (ints) -> "#{ints}"
g.assert "1,2,3", g.ints2strings [1,2,3]
g.assert "1", g.ints2strings [1]
g.assert "", g.ints2strings []

g.res2string = (ints) -> (i.toString() for i in ints).join ''
g.assert "123", g.res2string [1,2,3]
g.assert "1", g.res2string [1]
g.assert "", g.res2string []

g.zoomIn  = (n) -> g.ZOOM[g.state]--
g.zoomOut = (n) -> g.ZOOM[g.state]++
g.setState = (newState) -> g.state = newState

g.invert = (arr) ->
	res = []
	for i in range arr.length
		res[arr[i]] = i
	return res
g.assert [0,1,2,3], g.invert [0,1,2,3]
g.assert [3,2,0,1], g.invert [2,3,1,0]
g.assert [2,3,1,0], g.invert g.invert [2,3,1,0]

xxx = [[2,1],[12,2],[12,1],[3,4]]
xxx.sort (a,b) -> 
	diff = a[0] - b[0] 
	if diff == 0 then a[1] - b[1] else diff
g.assert [[2,1], [3,4], [12,1], [12,2]], xxx	
g.assert true, [2] > [12]
g.assert true, "2" > "12"
g.assert false, 2 > 12

# xxx = [[2,1],[12,2],[12,1],[3,4]]
# assert [[2,1],[12,1],[12,2],[3,4]], _.sortBy(xxx, (x) -> [x[0],x[1]])
# assert [[3,4],[2,1],[12,1],[12,2]], _.sortBy(xxx, (x) -> -x[0])
# assert [[2,1],[12,1],[3,4],[12,2]], _.sortBy(xxx, (x) -> x[1])
# assert [[3,4],[12,1],[2,1],[12,2]], _.sortBy(xxx, (x) -> -x[1])

g.normera = (a,b,k) -> Math.round (b - k*a) / (k-1) # Räknar ut vad som ska adderas till elotalen
g.assert  -406, g.normera 1406,2406,2   # 1000,2000
g.assert -1900, g.normera 1950,2000,2   #   50,100
g.assert     0, g.normera 1000,2000,2   # 1000,2000
g.assert   200, g.normera 900,2000,2    # 1100,2200
g.assert -1200, g.normera 1600,2000,2   #  400,800
g.assert  -500, g.normera 1000,2000,3   #  500,1500
g.assert -1000, g.normera 1200,1800,4   #  200,800
g.assert -1067, g.normera 1400,2400,4   #  333,1333
g.assert  -800, g.normera 1600,2000,1.5 #  800,1200
g.assert   400, g.normera 1600,2000,1.2 # 2000,2400
g.assert  2400, g.normera 1600,2000,1.1 # 4000,4400

g.sum = (s) ->
	res = 0
	for item in s
		res += parseFloat item
	res
g.assert 6, g.sum '012012'

g.txtT = (value, w, align=window.CENTER) -> 
	if value.length > w then value = value.substring 0,w
	if value.length < w and align==window.RIGHT then value = value.padStart w
	if align==window.LEFT then res = value + _.repeat ' ',w-value.length
	if align==window.RIGHT then res = _.repeat(' ',w-value.length) + value
	if align==window.CENTER 
		diff = w-value.length
		lt = _.repeat ' ',(1+diff)//2
		rt = _.repeat ' ',diff//2
		res = lt + value + rt
	res

g.prBoth = (score) -> " #{'0½1'[score]} - #{'1½0'[score]} "

#assert "   Sven   ", txtT "Sven",10