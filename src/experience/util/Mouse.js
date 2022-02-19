import EventEmitter from "events"
import { Vector2 } from "three"



export default class Mouse extends EventEmitter{
    constructor(sizes){
        super()
        this.sizes = sizes
        this.position = new Vector2(0, 0)

        this.mousemove_func = this.mousemove.bind(this)
        window.addEventListener('mousemove', this.mousemove_func)
        
        this.click_func = this.click.bind(this)
        window.addEventListener('click', this.click_func)
    }

    mousemove(event){
        this.position.x = (event.clientX / this.sizes.width) * 2 - 1
        this.position.y = (-event.clientY / this.sizes.height) * 2 + 1
        this.emit('mousemove')
    }

    click(event){
        this.emit('click', this.position)
    }

    destroy(){
        window.removeEventListener('mousemove', this.mousemove_func)
        window.removeEventListener('click', this.click_func)
        this.removeAllListeners('click')
        this.removeAllListeners('mousemove')
    }
}
