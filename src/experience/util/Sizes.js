import {EventEmitter} from 'events'


export default class Sizes extends EventEmitter
{

    constructor()
    {
        super()
        //window.addEventListener('resize', () => this.resize()))
        this.resizeFunc = this.resize.bind(this)
        window.addEventListener('resize', this.resizeFunc)
        this.resize()
    }
    
    resize() 
    {   
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.emit('resize')
    }

    dispose(){
        window.removeEventListener('resize', this.resizeFunc)
        this.removeAllListeners('resize')
    }

}