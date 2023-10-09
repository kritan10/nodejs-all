class Place {
    /**
     * 
     * @param {number} id unique id of the place
     * @param {string} name name of the place
     * @param {string} location location of the place
     * @param {boolean} isOpen is the place open currently
     */
    constructor(id, name, location, isOpen) {
        this.id = id
        this.name = name
        this.location = location
        this.isOpen = isOpen
    }
}

export default Place