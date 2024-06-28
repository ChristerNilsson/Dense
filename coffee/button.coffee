export class Button
	constructor : (@title, @help, @click) -> @active = true

	draw : ->
		textAlign CENTER,CENTER
		if @title == '' then return

		fill if @active then 'lightgray' else 'yellow'
		rect @x,@y,@w,@h

		fill 'black'
		text @title,@x+@w/2,@y+@h/2
		textAlign LEFT,CENTER
		if @inside mouseX,mouseY then text @help,10,@y+3.2*@h/2

	inside : (x,y) -> @x <= x <= @x + @w and @y <= y <= @y + @h

export spread = (buttons, letterWidth, y, h) ->
	x = 0.5 * letterWidth
	for key of buttons
		button = buttons[key]
		button.x = x
		button.y = y
		button.w = (button.title.length + 0.5) * letterWidth
		button.h = h
		x += button.w + letterWidth
