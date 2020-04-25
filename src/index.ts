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
        
        this._chunks = this._generateChunks();
    }
    
    getChunkByIndex(index: number): Chunk {
        return this._chunks[index];
    }

    getChunk(row: number, column: number): Chunk {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        return this._chunks[row * this._columns + column]
    }

    // Returns the chunk at the given pixel position
    getChunkAtGlobalPosition(x: number, y: number): Chunk {
        const column = Math.floor(x / this._columns);
        const row = Math.floor(y / this._rows);

        return this.getChunk(row, column);
    }

    // Returns the tile at the given pixel position
    getTileAtGlobalPosition(x: number, y: number): Tile {
        return this.getChunkAtGlobalPosition(x, y).getTileAtLocalPosition(x % this._chunkDimensions.width, y % this._chunkDimensions.height);
    }

    // Returns up to 9 chunks around position given. Going Left to Right, Top to Bottom
    getChunks3x3(row: number, column: number, arr: Chunk[][] = []): Chunk[][] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        for (let y = Math.max(row - 1, 0); y < Math.min(row + 1, this._rows); y++) {
            if (!Array.isArray(arr[y])) {
                arr[y] = [];
            }
            for(let x = Math.min(column - 1); x < Math.min(column + 1, this._columns); x++) {
                arr[y].push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks above. Left to Right
    get3ChunksNorth(row: number, column: number, arr: Chunk[] = []): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const y = row - 1;

        if (y >= 0) {
            for (let x = Math.max(column - 1, 0); x < Math.max(column + 1, this._columns); x++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks to the left. Top to Bottom
    get3ChunksEast(row: number, column: number, arr: Chunk[] = []): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const x = column + 1;

        if (x <= this._columns) {
            for (let y = Math.max(row - 1, 0); y < Math.max(row + 1, this._rows); y++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks below. Left to Right
    get3ChunksSouth(row: number, column: number, arr: Chunk[] = []): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const y = row + 1;

        if (y <= this._rows) {
            for (let x = Math.max(column - 1, 0); x < Math.max(column + 1, this._columns); x++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks to the right. Top to Bottom
    get3ChunksWest(row: number, column: number, arr: Chunk[] = []): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const x = column - 1;

        if (x >= 0) {
            for (let y = Math.max(row - 1, 0); y < Math.max(row + 1, this._rows); y++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    private _generateChunks(): Chunk[] {
        const arr: Chunk[] = [];

        for (let i = 0; i < this._rows * this._columns; i++) {
            arr.push(new Chunk(this._chunkDimensions.width, this._chunkDimensions.height));
        }

        return arr;
    }
}