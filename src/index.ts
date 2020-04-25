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

    // Returns the chunks around and including position given. Going Left to Right, Top to Bottom
    getChunksGrid(row: number, column: number, gridSize: number = 3, arr: Chunk[][] = []): Chunk[][] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const lowerY = Math.max(row - Math.floor(gridSize / 2), 0);
        const upperY = Math.min(row + (Math.floor(gridSize / 2)) - (1 - (gridSize % 2)), this._rows);
        const lowerX = Math.max(column - Math.floor(gridSize / 2), 0);
        const upperX = Math.min(column + (Math.floor(gridSize / 2)) - (1 - (gridSize % 2)), this._columns);

        for (let y = lowerY; y < upperY; y++) {
            if (!Array.isArray(arr[y])) {
                arr[y] = [];
            }
            for(let x = lowerX; x < upperX; x++) {
                arr[y].push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to N chunks above position given. Left to Right
    getNChunksNorth(row: number, column: number, numChunks:number = 3, arr: Chunk[] = []): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const y = row - 1;
        const lowerX = Math.max(column - Math.floor(numChunks / 2), 0);
        const upperX = Math.min(column + (Math.floor(numChunks / 2)) - (1 - (numChunks % 2)), this._columns); // Floor half numChunks and minus 1 if an even number was given or the max num columns, whichever is smaller

        if (y >= 0) {
            for (let x = lowerX; x < upperX; x++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks to the left of the given position. Top to Bottom
    getNChunksEast(row: number, column: number, numChunks:number = 3, arr: Chunk[] = []): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const x = column + 1;
        const lowerY = Math.max(row - Math.floor(numChunks / 2), 0);
        const upperY = Math.min(row + (Math.floor(numChunks / 2)) - (1 - (numChunks % 2)), this._rows); // Floor half numChunks and minus 1 if an even number was given or the max num rows, whichever is smaller
        if (x <= this._columns) {
            for (let y = lowerY; y < upperY; y++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks below the given position. Left to Right
    getNChunksSouth(row: number, column: number, numChunks:number = 3, arr: Chunk[] = []): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const y = row + 1;
        const lowerX = Math.max(column - Math.floor(numChunks / 2), 0);
        const upperX = Math.min(column + (Math.floor(numChunks / 2)) - (1 - (numChunks % 2)), this._columns); // Floor half numChunks and minus 1 if an even number was given or the max num columns, whichever is smaller

        if (y <= this._rows) {
            for (let x = lowerX; x < upperX; x++) {
                arr.push(this._chunks[y * this._columns + x]);
            }
        }

        return arr;
    }

    // Returns up to 3 chunks to the right. Top to Bottom
    get3ChunksWest(row: number, column: number, numChunks:number = 3, arr: Chunk[] = []): Chunk[] {
        Utils.checkRowInRange(row, this._rows);
        Utils.checkColumnInRange(column, this._columns);

        const x = column - 1;
        const lowerY = Math.max(row - Math.floor(numChunks / 2), 0);
        const upperY = Math.min(row + (Math.floor(numChunks / 2)) - (1 - (numChunks % 2)), this._rows); // Floor half numChunks and minus 1 if an even number was given or the max num rows, whichever is smaller

        if (x >= 0) {
            for (let y = lowerY; y < upperY; y++) {
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