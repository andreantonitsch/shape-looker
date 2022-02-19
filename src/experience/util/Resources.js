import {EventEmitter} from 'events'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Resources extends EventEmitter
{
    constructor()
    {
        super()
        this.items = {}
        this.toLoad = 0
        this.loaded = 0
        this.setLoaders()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.manager = new THREE.LoadingManager() 
        this.loaders.gltf = new GLTFLoader(this.loaders.manager )
        this.loaders.texture = new THREE.TextureLoader(this.loaders.manager )
        this.loaders.cubeTexture = new THREE.CubeTextureLoader(this.loaders.manager )

        this.loaderMap = {}

    }

    load(sources)
    {
        this.loaded = 0
        this.toLoad = sources.length
        if(Object.keys(sources).length != 0){
            for(const source of sources)
            {
                this.loaders[source.type].load(source.path, 
                    (file) =>  
                    { 
                        this.auxLoad(source, file)
                    }
                )
            }
        } else {
            this.emit('done')
        }
    }

    auxLoad(source, file)
    {
        this.items[source.id] = file
        this.loaded++
        this.emit('update', this.loaded)
 
        if(this.toLoad === this.loaded){
            this.emit('done')
        }
    }
    dispose()
    {
        this.removeAllListeners('update')
        this.removeAllListeners('done')

    }
}
