import Chunk from "./chunk";
import Tile from "./tile";
import Utils from "./utils";

// Types
import { IChunkDimensions, ITileDimensions } from "./types";

export default class jMosaic {
    private _columns: number;
    private _rows: number;
    private _tileDimensions: ITileDimensions;
    private _chunkDimensions: IChunkDimensions;
    private _chunks: Chunk[];

    constructor(rows: number, columns: number, tileDimensions: ITileDimensions, chunkDimensions: IChunkDimensions) {
        this._columns = columns;
        this._rows = rows;
        this._chunkDimensions = chunkDimensions;
        this._tileDimensions = tileDimensions;
        this._chunks = [];
    }
    
    getChunkByIndex(index: number): Chunk {
        return this._chunks[index];
    }

    getChunk(row: number, column: number): Chunk {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        return this._chunks[row * this._columns + column]
    }

    getChunkAtGlobalPosition(x: number, y: number): Chunk {
        const column = Math.floor(x / this._columns);
        const row = Math.floor(y / this._rows);

        return this.getChunk(row, column);
    }

    getTileAtGlobalPosition(x: number, y: number): Tile {
        const chunkColumn = Math.floor(x / this._columns);
        const chunkRow = Math.floor(y / this._rows);
        const tileColumn = Math.floor(x / this._tileDimensions.width) % this._chunkDimensions.width;
        const tileRow = Math.floor(y / this._tileDimensions.height) % this._chunkDimensions.height;

        return this.getChunk(chunkColumn, chunkRow).getTile(tileColumn, tileRow);
    }

    // Returns up to 9 chunks around position given. Going Left to Right, Top to Bottom
    getChunks3x3(row: number, column: number): Chunk[][] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const arr: Chunk[][] = [];

        for (let y = Math.max(row - 1, 0); y < Math.min(row + 1, this._rows); y++) {
            arr[y] = [];
            for(let x = Math.min(column - 1); x < Math.min(column + 1, this._columns); x++) {
                arr[y].push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks above. Left to Right
    get3ChunksNorth(row: number, column: number): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const arr: Chunk[] = [];
        const y = row - 1;

        if (y >= 0) {
            for (let x = Math.max(column - 1, 0); x < Math.max(column + 1, this._columns); x++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks to the left. Top to Bottom
    get3ChunksEast(row: number, column: number): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const arr: Chunk[] = [];
        const x = column + 1;

        if (x <= this._columns) {
            for (let y = Math.max(row - 1, 0); y < Math.max(row + 1, this._rows); y++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks below. Left to Right
    get3ChunksSouth(row: number, column: number): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const arr: Chunk[] = [];
        const y = row + 1;

        if (y <= this._rows) {
            for (let x = Math.max(column - 1, 0); x < Math.max(column + 1, this._columns); x++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks to the right. Top to Bottom
    get3ChunksWest(row: number, column: number): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const arr: Chunk[] = [];
        const x = column - 1;

        if (x >= 0) {
            for (let y = Math.max(row - 1, 0); y < Math.max(row + 1, this._rows); y++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }
}