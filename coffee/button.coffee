export class Button
    constructor : (@title, @x, @y, @w, @h, @click) -> @active = true

    draw : ->
        if @title=='' then return
        if @active
            fill 'yellow'
            rect @x,@y,@w,@h
        fill 'black'
        text @title,@x,@y+@h/2

    inside : (x,y) -> 
        # print 'inside',x,y,@x,@y,@w,@h
        @x <= x <= @x + @w and @y <= y <= @y + @h
