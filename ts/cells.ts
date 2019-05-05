/**
 * 关于 cell 的工具类
 */

import { Cell } from "./cell";

export class Cells {
    static includingCell(cells: Cell[], cell: Cell): boolean {
        return Boolean(cells.find(c => c.isSamePosition(cell)))
    }
}