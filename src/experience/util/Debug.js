import * as dat from 'lil-gui'

export default class Debug
{
    constructor()
    {
        this.gui = new dat.GUI()

    }

    dispose(){
        this.gui.destroy()
    }
}