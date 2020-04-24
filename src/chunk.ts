import Tile from "./tile";
import Utils from "./utils";

export default class Chunk {
    
    private _rows: number;
    private _columns: number;
    private _tiles: Tile[];

    constructor(rows: number, columns: number) {
        this._rows = rows;
        this._columns = columns;
        this._tiles = [];
    }

    get columns(): number {
        return this._columns;
    }

    get rows(): number {
        return this._rows;
    }

    getTiles(): Tile[] {
        return this._tiles;
    }

    getTile(row: number, column: number): Tile {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        return this._tiles[row * this._columns + column];
    }
}