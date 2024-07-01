import { g,print,range,scale } from './globals.js' 

export class Button
	constructor : (@title, @help, @click) -> @active = true

	draw : ->
		textAlign CENTER,CENTER
		if @title == '' then return

		fill if @active then 'yellow' else 'lightgray'
		rect scale(@x/20),scale(@y),scale(@w/20),scale(@h)

		fill 'black'
		text @title,scale((@x+@w/2)/20),scale(@y+@h/2)
		textAlign LEFT,CENTER
		if @inside mouseX,mouseY then text @help,10,scale(@y+3.2*@h/2)

	inside : (x,y) -> scale(@x/20) <= x <= scale((@x + @w)/20) and scale(@y) <= y <= scale(@y + @h)

export spread = (buttons, letterWidth, y, h) ->
	x = letterWidth #* 0.5
	for key,button of buttons
		button.x = x
		button.y = y
		button.w = (button.title.length + 2) * letterWidth
		button.h = h
		if button.title.length > 0 or key == "ArrowUp" then x += button.w + letterWidth
