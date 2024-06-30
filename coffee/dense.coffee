import { parseExpr } from './parser.js'
import { g,print,range } from './globals.js' 
import { Button,spread } from './button.js' 
import { Lista } from './lista.js' 
import { Tournament } from './tournament.js' 
import { Tables } from './tables.js' 
import { Names } from './names.js' 
import { Standings } from './standings.js' 
import { Pairings } from './pairings.js' 

g.LPP = 14

g.RINGS = {'b':'•', ' ':' ', 'w':'o'}

ASCII = '0123456789abcdefg'
ALFABET = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' # 62 ronder maximalt

datum = ''
g.tournament = null
g.errors = [] # id för motsägelsefulla resultat. Tas bort med Delete

g.pages = []
resultat = [] # 012 sorterad på id
message = '' #This is a tutorial g.tournament. Use it or edit the URL'



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
window.keyPressed   = (event) -> 
	key2 = key
	if key2 in ['Control','Shift','I'] then return
	if key2 == '1' then key2 = 'K1'
	if key2 == '0' then key2 = 'K0'
	g.pages[g.state].keyPressed event,key2
	# om något resultat saknas för en aktiv spelare, ska ingen lottning ske
	# if key in 'pP'
	# 	for p in g.tournament.persons
	# 		if p.active and p.res.length < p.col.length
	# 			print 'Pairings kan ej nås pga att resultat saknas för bl a',"#{p}"
	# 			return 