import * as THREE from 'three'
import Shape from './Prefabs/Shape'
import Floor from './Prefabs/Floor'

export default class World
{
    constructor(exp)
    {
        this.experience = exp
        this.scene = this.experience.scene

        //Test
        this.testMesh = new Shape(exp)
        this.testMesh.setPosition(0,0, 0.0, 0.0)
        this.scene.add(this.testMesh.mesh)
        
        // has update()
        this.dynamic = []

        // no update
        this.static  =  [this.testMesh]
        
    }

    addUpdatable(obj){
        this.dynamic.push(obj)
    }

    update(time, deltaTime)
    {
        for(const obj of this.dynamic)
        {
            if(typeof(obj.update) === 'function')
                obj.update(time, deltaTime)
        }
    }

    debug(gui)
    {
        for(const obj of this.dynamic){

            if(typeof(obj.debug) === 'function')
            {
                obj.debug(gui)
            }
        }

        for(const obj of this.static){
            if(typeof(obj.debug) === 'function')
            {
                obj.debug(gui)
            }
        }
        //fox.debug(gui)
    }
    
    dispose()
    {
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })
    }
}