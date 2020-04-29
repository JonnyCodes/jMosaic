import { ITile } from "./types";

export default class Tile {

    private _type: number;
    private _data: any;

    constructor(tileData: ITile) {
        this._type = tileData.type;
        this._data = Object.freeze(tileData.data); // TODO: Deep clone
    }

    get type(): number {
        return this._type;
    }

    get data(): any {
        return this._data;
    }
}