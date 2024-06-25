export class Button
    constructor : (@title, @x, @y, @w, @h, @click) -> @active = true

    draw : ->
        if @title=='' then return
        if @active
            fill 'yellow'
            rect @x,@y,@w,@h
        fill 'black'
        text @title,@x,@y+@h/2

    inside : (x,y) -> @x - @w/2 < x < @x + @w/2 and @y-@h/2 < y < @y + @h/2
