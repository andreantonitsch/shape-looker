import * as THREE from 'three'
import { Vector2 } from 'three'

export default class Shape
{
    constructor(exp)
    {
        this.exp = exp
        this.scene = this.exp.scene
        //this.resources = this.exp.resources

        this.geoms = {}

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        
    }

    setGeometry()
    {
        this.geoms.cube = new THREE.BoxGeometry(1,1,1)
        this.geoms.cone = new THREE.ConeGeometry(0.5,1,64)
        this.geoms.cup = new THREE.ConeGeometry(0.5,1,64, 2, true)
        this.geoms.cylinder = new THREE.CylinderGeometry(.5,.5,1, 32)
        this.geoms.torus = new THREE.TorusGeometry(1,.33,16, 64)
        this.geoms.octa = new THREE.OctahedronGeometry(1,0)
        this.geoms.current = this.geoms.cube
    }


    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({color:0xdddddd, metalness:.1, roughness:.9, side: THREE.DoubleSide})
    }

    setMesh(){
        this.mesh = new THREE.Mesh(
            this.geoms.current,
            this.material
        )
        this.mesh.castShadow = true
        this.mesh.visible = true
    }

    setPosition(x, y, z){
        this.mesh.position.set(x,y,z)
    }

    debug(gui)
    {
        this.debug_obj = {rotate : () => { 
            this.mesh.rotation.x = Math.random() * 2 * Math.PI;
            this.mesh.rotation.y = Math.random() * 2 * Math.PI;
            this.mesh.rotation.z = Math.random() * 2 * Math.PI;
        }}
        const shape_folder  = gui.addFolder('Shape Parameters')
        const scale_folder = shape_folder.addFolder('Scale')
        scale_folder.add(this.mesh.scale, 'x', 0.1, 10, 0.01)
        scale_folder.add(this.mesh.scale, 'y', 0.1, 10, 0.01)
        scale_folder.add(this.mesh.scale, 'z', 0.1, 10, 0.01)
        
        shape_folder.add(this.geoms, 'current', {
            cube : this.geoms.cube,
            cone : this.geoms.cone,
            cup : this.geoms.cup,
            cylinder : this.geoms.cylinder,
            torus : this.geoms.torus,
            octa : this.geoms.octa
         }).name("Current Shape")
         .onChange(
             (value) =>{
                 this.mesh.geometry = this.geoms.current
             }
         )

         shape_folder.add(this.debug_obj, 'rotate')
         shape_folder.add(this.mesh.material, 'wireframe')

         shape_folder.add(this.material, 'roughness', 0, 1, 0.01)
         shape_folder.add(this.material, 'metalness', 0, 1, 0.01)
    }


}