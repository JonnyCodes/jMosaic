export default class Utils {

    static checkRowInRange(row: number, max: number, min: number = 0) {
        if (row < min || row > max) {
            throw new RangeError(`Row must be between ${min} and ${max}`);
        }
    }

    static checkColumnInRange(column: number, max: number, min: number= 0) {
        if (column < min || column > max) {
            throw new RangeError(`Column must be between ${min} and ${max}`);
        }
    }
}