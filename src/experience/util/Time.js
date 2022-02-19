import {EventEmitter} from 'events'

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        this.start = Date.now() * 0.001
        this.current = this.start
        this.elapsed = 0
        this.delta = 16 * 0.001


        window.requestAnimationFrame( () =>
        {
            this.beat()
        })

    }

    beat() {
        const currentTime = Date.now() * 0.001
        this.delta =  (currentTime - this.current)
        this.current = currentTime
        this.elapsed = this.current - this.start

        //reschedule tick
        window.requestAnimationFrame( () =>
        {
            this.beat()
        })
        this.emit('beat')
    }

    dispose(){
        this.removeAllListeners('beat')
    }
}