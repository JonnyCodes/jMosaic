import Tile from "./tile";
import Utils from "./utils";

export default class Chunk {
    
    private _rows: number;
    private _columns: number;
    private _tiles: Tile[];

    constructor(rows: number, columns: number) {
        this._rows = rows;
        this._columns = columns;
        this._tiles = this._generateTiles();
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

    getTileAtLocalPosition(x: number, y: number): Tile {
        const column = Math.floor(x / this._columns);
        const row = Math.floor(y / this._rows);

        return this.getTile(row, column);
    }

    private _generateTiles(): Tile[] {
        const arr: Tile[] = [];

        for (let i = 0; i < this._rows * this._columns; i++) {
            arr.push(new Tile());
        }

        return arr;
    }
}