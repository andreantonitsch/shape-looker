import Sizes from "./util/Sizes.js"
import Time from "./util/Time.js"
import * as THREE from 'three'
import { Scene } from "three"
import ExpCamera from "./ExpCamera.js"
import ExpRenderer from "./ExpRenderer.js"
import World from "./World/World.js"
import Environment from "./World/Environment.js"
import Resources from "./util/Resources.js"
import resourceSources from './resourceSources.js'
import Debug from "./util/Debug.js"
import Mouse from "./util/Mouse.js"
import Mouse3DPos from "./util/Mouse3DPos.js"
import Stats from 'three/examples/jsm/libs/stats.module.js';


export default class Experience
{
    /**
     * CONSTRUCTOR
     */
    constructor(canvas)
    {
        this.stats =  Stats()
        document.body.appendChild(this.stats.dom);

        // global access
        // WebGLExperience.active = this

        // Draw target
        this.canvas = canvas

        //Canvas parameters
        this.sizes = new Sizes()
        this.sizeUpd = this.window_resize.bind(this)
        this.sizes.on('resize', this.sizeUpd )

        // Resource Loading
        this.resources = new Resources()
        this.done = this.setup.bind(this)
        this.resources.once('done', this.done)

        //this.resources.on('update', (count) => console.log(count))
        this.resources.load(resourceSources)
        
    }
    
    setup(){

        // Scene
        this.scene = new Scene()

        // Camera
        this.camera = new ExpCamera( { sizes : this.sizes, canvas : this.canvas, scene : this.scene })
        
        // Time Tracking
        this.time = new Time()

        
        // Lighting
        this.environment = new Environment(this)
        
        // Renderer
        this.renderer = new ExpRenderer(this)
        
        //Mouse Info
        this.mouse = new Mouse(this.sizes)
        
        //Raycasting Info
        this.mouse3d = new Mouse3DPos(this.camera, this.mouse, this.time)

        //World
        this.world = new World(this)

        // Initialize events
        this.mouse3d.raycastList = this.world.static
        this.mouse3d.setRepeat(5)

        this.upd = this.update.bind(this)
        this.time.on('beat', this.upd)

        if(window.location.hash === '#debug'){
            const axis = new THREE.AxisHelper()
            this.scene.add(axis)
            this.gui = new Debug()
            this.gui.gui.add(axis, 'visible').name('visible axis')
            this.world.debug(this.gui.gui)
            this.environment.debug(this.gui.gui)
        }

    }

    /**
     * EVENTS
     */

    // Window resize
    window_resize()
    {
        this.camera.changeAspect(this.sizes.width / this.sizes.height)
        this.renderer.resize()
    }
    

    // Per Frame update
    update()
    {
        // update controls
        this.camera.update()
        this.renderer.render()
        this.world.update(this.time.elapsed, this.time.delta)
        this.stats.update()
    }

    dispose()
    {
        this.camera.dispose()
        this.world.dispose()
        this.time.off('beat', this.upd)
        this.sizes.dispose()
        this.environment.dispose()
        this.resources.dispose()
        
        if(window.location.hash === '#debug')
        {
            this.gui.dispose()
        }
        
        this.renderer.dispose()
        
    }
}

