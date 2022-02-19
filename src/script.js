import './style.css'
import Experience from './Experience/Experience'


const canvas = document.querySelector('canvas.webgl')
const experience = new Experience(canvas)


if(window.location.hash === '#debug'){

    console.log(experience.gui)
    experience.resources.once('done', () =>{
        experience.gui.gui.add(experience, 'dispose')
    } )
}