import * as THREE from 'three'
import * as dat from 'lil-gui'

export default class Environment
{
    constructor(exp)
    {
        this.experience = exp
        this.scene = this.experience.scene

        this.setDirectional()
        //this.setEnvMap()
        this.setAmbient()

    }

    setAmbient(){
        this.ambient = new THREE.AmbientLight(
            0xE09D2B,
            //0xffffff,
            1
        )
        this.scene.add(this.ambient)
    }

    setDirectional(){
        this.directional = new THREE.DirectionalLight(
            0xffffff,
            4
        )
        this.directional.position.set(3, 2, - 2.25)

        this.directional.castShadow = true
        this.directional.shadow.camera.far = 15
        this.directional.shadow.mapSize.set(1024, 1024)
        this.directional.shadow.bias = 0.001

        this.scene.add(this.directional)
    }

    setEnvMap(){
        // this.envMap = {}
        // this.envMap.intensity = 0.2
        // this.envMap.texture = this.experience.resources.items.env_map_001
        // this.envMap.texture.encoding = THREE.sRGBEncoding

        // this.scene.environment = this.envMap.texture
        // this.envMap.updateMaterials = () => this.updateEnvMapMaterials()
        // this.envMap.updateMaterials()
    }


    updateEnvMapMaterials()
    {
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.envMap = this.envMap.texture
                child.material.envMapIntensity = this.envMap.intensity
                child.material.needsUpdate = true
            }
        })
    }

    debug(gui){
        const envFolder = gui.addFolder('environment')
        // envFolder.add(this.envMap, 'intensity', 0, 10, 0.001)
        // .name('Environment Light Intensity')
        // .onChange(this.envMap.updateMaterials)

        const lightFolder = envFolder.addFolder('Sun Position')
        lightFolder.add(this.directional.position, 'x', -5, 5, 0.001)
        lightFolder.add(this.directional.position, 'y', -5, 5, 0.001)
        lightFolder.add(this.directional.position, 'z', -5, 5, 0.001)

        envFolder.add(this.directional, 'intensity', -100, 100, 0.01).name('Sun Brightness')
        envFolder.addColor(this.directional, 'color').name("Sun Color")
        .onChange((value) =>{
            this.ambient.color.set(value)
        })
        
        envFolder.add(this.ambient, 'intensity', -100, 100, 0.01).name("Ambient Brightness")

        envFolder.addColor(this.ambient, 'color').name("Ambient Color")
        .onChange((value) =>{
            this.ambient.color.set(value)
        })
    }

    dispose(){
        this.envMap.texture.dispose()
    }
}