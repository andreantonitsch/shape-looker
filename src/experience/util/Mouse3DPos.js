import * as THREE from 'three'
import {EventEmitter} from 'events'
import { Vector3 } from 'three'


const raycaster = new THREE.Raycaster()
let intersects
export default class Mouse3DPos extends EventEmitter
{
    constructor(camera, mouse, time){
        super()
        this.raycastList = []
        this.count = 0
        this.repetition = 1
        this.camera = camera
        this.mouse = mouse
        this.time = time
        this.position = new Vector3(0, 0, 0)
        this.isRepeat = false

        this.raycast_func = this.raycast.bind(this)
        window.addEventListener('click', this.raycast_func)

    }

    setRepeat(repDelay){
        this.repetition  = repDelay
        this.isRepeat = true
        this.count = this.repetition
        this.repeat_func = this.repeat.bind(this)
        this.time.on('beat', this.repeat_func)
    }

    raycast()
    {
        
        raycaster.setFromCamera(this.mouse.position, this.camera.cam)
        intersects = raycaster.intersectObjects(this.raycastList.map(item => {return item.mesh} ))
    
        if(intersects.length > 0)
        {
            this.position.copy(intersects[0].point)
        }
        this.emit('mouse3Dupdate', this.position)
    }

    repeat()
    {
        this.count -= 1
        if(this.count <= 0)
        {
            this.raycast()
            this.count = this.repetition
        }
    }

    destroy()
    {
        window.removeEventListener('click', this.raycast_func)
        if(this.isRepeat){
            this.time.off('beat', this.repeat_func)
        }
        this.removeAllListeners('mouse3Dupdate')
    }

}
