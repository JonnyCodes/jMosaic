export default class Tile {

    private _data: any;

    constructor(data: any = {}) {
        this._data = Object.freeze(data); // TODO: Deep clone
    }

    get data(): any {
        return this._data;
    }
}