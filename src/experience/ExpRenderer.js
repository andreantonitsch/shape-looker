import * as THREE from 'three'

export default class ExpRenderer
{
    constructor(exp)
    {
        this.experience = exp
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.initRenderer()
    }
    
    initRenderer(){
        this.renderer  = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias : true,
        })
        this.renderer.setClearColor('rgb(41,42,43)')
        this.renderer.physicallyCorrectLights = true
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.toneMapping = THREE.CineonToneMapping
        this.renderer.toneMappingExposure = 1.5
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

        this.resize()
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixelRatio)
    }

    render(){
        this.renderer.render(this.scene, this.camera.cam)
    }

    dispose(){
        this.renderer.clear()
        this.renderer.dispose()
    }
}
