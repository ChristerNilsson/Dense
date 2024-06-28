import { Tournament } from './tournament.js' 
import { Tables } from './tables.js' 
import { Names } from './names.js' 
import { Standings } from './standings.js' 
import { Pairings } from './pairings.js' 

export print = console.log
export range = _.range

export g = {}

g.LPP = 14

g.zoomIn  = (n) -> g.ZOOM[g.state]--
g.zoomOut = (n) -> g.ZOOM[g.state]++
g.setState = (newState) -> g.state = newState

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
#assert "   Sven   ", txtT "Sven",10


