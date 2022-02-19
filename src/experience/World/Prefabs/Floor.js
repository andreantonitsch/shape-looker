import * as THREE from 'three'
import { Vector2 } from 'three'

export default class Floor
{
    constructor(exp)
    {
        this.exp = exp
        this.scene = this.exp.scene
        this.resources = this.exp.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry(){
        this.geom = new THREE.CircleGeometry(5,64)
    }

    setTextures(){
        this.textures = {}

        this.textures.color = this.resources.items.color_texture_001
        this.textures.color.minFilter = THREE.LinearMipmapLinearFilter
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(2, 2)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.normal_texture_001
        this.textures.normal.repeat.set(2, 2)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            map : this.textures.color,
            normalMap : this.textures.normal,
            metalness : 0.2,
            roughness : 0.4

        })
        this.material.normalScale.set(1.5, 1.5)
    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geom, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true

    }


}