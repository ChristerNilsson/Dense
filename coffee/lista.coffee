import { g,print,range } from './globals.js' 

export class Lista
	constructor : (@objects=[], @columnTitles="", @buttons={}, @drawFunction=null) -> # a list of players. Or a list of pairs of players
		@offset = 0
		@currentRow = 0
		@N = @objects.length
		@paintYellowRow = true

	draw : -> # ritar de rader som syns i fönstret enbart

		y = 4.0 * g.ZOOM[g.state]
		s = @columnTitles
		textAlign window.LEFT
		text s,10,y

		fill 'black'
		r = g.tournament.round - 1
		for iRow in range @offset,@offset + g.LPP
			if iRow >= @N then continue
			p = @objects[iRow]
			y += g.ZOOM[g.state] 
			s = @drawFunction p, iRow
			if iRow == @currentRow
				fill 'yellow'
				# noStroke()
				w = if @paintYellowRow then width else 23.4 * g.ZOOM[g.state]
				rect 0, y - 0.5 * g.ZOOM[g.state]-1, w, g.ZOOM[g.state]
				fill 'black'
			text s,10,y

	keyPressed : (event, key) -> @buttons[key].click()
	mouseWheel : (event) -> @move if event.delta < 0 then -g.LPP//2 else g.LPP//2
	mousePressed : -> 
		if mouseY > 4 * g.ZOOM[g.state]
			@currentRow = @offset + int mouseY / g.ZOOM[g.state] - 4.5
		else
			for key,button of @buttons
				if button.active and button.inside mouseX,mouseY then button.click()

	ArrowUp   : -> @move -1
	ArrowDown : -> @move 1
	PageUp    : -> @move -g.LPP//2 
	PageDown  : -> @move g.LPP//2
	Home      : -> @move -@currentRow
	End       : -> @move @N - @currentRow

	move : (delta) ->
		@currentRow += delta
		if @currentRow < 0 then @currentRow = 0
		if @currentRow >= @N then @currentRow = @N-1
		if @currentRow < @offset then @offset = @currentRow
		if @currentRow >= @offset + g.LPP then @offset = @currentRow - g.LPP + 1
		event.preventDefault()