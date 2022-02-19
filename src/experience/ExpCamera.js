import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Controls and Perspective Camera
export default class ExpCamera
{
    constructor(paramObj)
    {
        this.sizes = paramObj.sizes
        this.scene = paramObj.scene
        this.canvas = paramObj.canvas

        this.initCamera()
        this.initControls()
    }

    initCamera(){
        this.cam = new THREE.PerspectiveCamera(
            27,
            this.sizes.width / this.sizes.height,
            0.1,
            100)
        this.cam.position.set( 6, 4, 8 )
        this.scene.add(this.cam)
    }

    initControls(){
        this.control = new OrbitControls(this.cam, this.canvas)
        this.control.enableDamping = true
    }

    changeAspect(aspect){
        this.cam.aspect = aspect
        this.cam.updateProjectionMatrix()
    }

    update(){
        this.control.update()
    }

    dispose()
    {
        this.control.dispose()
    }
}