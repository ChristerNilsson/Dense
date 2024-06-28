import { g,print,range } from './globals.js' 

export class Lista
	constructor : (@objects, @columnTitles, @drawFunction) ->
		@offset = 0
		@currentRow = 0

	draw : -> # ritar de rader som syns i fönstret enbart

		y = 4.0 * g.ZOOM[g.state]
		s = @columnTitles
		textAlign window.LEFT
		text s,10,y

		fill 'black'
		r = g.tournament.round - 1
		for iRow in range @offset,@offset + g.LPP
			if iRow >= @objects.length then continue
			p = @objects[iRow]
			y += g.ZOOM[g.state] 

			s = @drawFunction p

			if iRow == @currentRow
				fill 'yellow'
				noStroke()
				rect 0, y - 0.5 * g.ZOOM[g.state], width, g.ZOOM[g.state]
				fill 'black'

			text s,10,y

	mouseWheel : (event) ->
		if event.delta < 0 and @offset > 0 then @offset -= g.LPP
		if event.delta > 0 and @offset < g.N - g.LPP then @offset += g.LPP
		if @currentRow < @offset then @currentRow += g.LPP
		if @currentRow >= @offset+g.LPP then @currentRow -= g.LPP

	mousePressed : -> 
		if mouseY > 4 * g.ZOOM[g.state]
			print 'Lista',mouseY
			@currentRow = @offset + int mouseY / g.ZOOM[g.state] - 4.5
		else
			for key of @buttons
				button = @buttons[key]
				if button.inside mouseX,mouseY then button.click()

	keyPressed : (event, key)-> @buttons[key].click()

	ArrowUp : ->
		if @currentRow == 0 then return
		@currentRow -= 1
		if @currentRow < @offset then @offset -= g.LPP
		event.preventDefault()

	ArrowDown : ->
		if @currentRow == g.N-1 then return
		@currentRow += 1
		if @currentRow >= @offset + g.LPP then @offset += g.LPP
		event.preventDefault()

	PageUp : ->
		if @offset < g.LPP then return 
		@offset -= g.LPP
		@currentRow = @offset
		event.preventDefault()

	PageDown : ->
		if @offset > g.N - g.LPP then return 
		@offset += g.LPP
		@currentRow = @offset
		event.preventDefault()
