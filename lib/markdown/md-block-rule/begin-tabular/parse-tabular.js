"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsv_1 = require("../../common/tsv");
var tabular_td_1 = require("./tabular-td");
var common_1 = require("./common");
var sub_math_1 = require("./sub-math");
var sub_tabular_1 = require("./sub-tabular");
var multi_column_row_1 = require("./multi-column-row");
exports.separateByColumns = function (str) {
    var columns = [];
    var index = 0;
    for (var i = 0; i < str.length; i++) {
        var pos = str.indexOf('&', i);
        if (pos === -1) {
            columns.push(str.slice(index));
            break;
        }
        if (pos > 0 && str.charCodeAt(pos - 1) === 92) {
            i = pos;
            continue;
        }
        columns.push(str.slice(index, pos));
        index = pos + 1;
        i = pos;
    }
    return columns;
};
var getNumCol = function (cells) {
    var res = 0;
    for (var i = 0; i < cells.length; i++) {
        var columns = exports.separateByColumns(cells[i]);
        var col = columns.length;
        for (var j = 0; j < columns.length; j++) {
            col += multi_column_row_1.getMC(columns[j]);
        }
        res = col > res ? col : res;
    }
    return res;
};
var getRows = function (str) {
    str = sub_math_1.getSubMath(str);
    return str.split('\\\\');
};
var setTokensTabular = function (str, align) {
    if (align === void 0) { align = ''; }
    var res = [];
    var rows = getRows(str);
    var cellsAll = common_1.getCellsAll(rows);
    var numCol = getNumCol(cellsAll);
    var data = common_1.getRowLines(rows, numCol);
    var CellsHLines = data.cLines;
    var CellsHLSpaces = data.cSpaces;
    var dataAlign = common_1.getVerticallyColumnAlign(align, numCol);
    var cLines = common_1.getColumnLines(align, numCol);
    var cAlign = dataAlign.cAlign, vAlign = dataAlign.vAlign, cWidth = dataAlign.cWidth;
    var decimal = common_1.getDecimal(cAlign, cellsAll);
    res.push({ token: 'table_open', tag: 'table', n: 1, attrs: [['id', 'tabular']] });
    res.push({ token: 'tbody_open', tag: 'tbody', n: 1 });
    var MR = new Array(numCol).fill(0);
    for (var i = 0; i < rows.length; i++) {
        var tsv_row = new Array(numCol).fill('');
        if (!cellsAll[i] || cellsAll[i].length === 0) {
            if (i < cellsAll.length - 1) {
                res.push({ token: 'tr_open', tag: 'tr', n: 1, attrs: [['style', 'border-top: none !important; border-bottom: none !important;']] });
                for (var k = 0; k < numCol; k++) {
                    var cRight = k === numCol - 1 ? cLines[cLines.length - 1] : cLines[k + 1];
                    var cLeft = k === 0 ? cLines[0] : '';
                    var data_1 = tabular_td_1.AddTd('', { h: cAlign[k], v: vAlign[k], w: cWidth[k] }, { left: cLeft, right: cRight, bottom: CellsHLines[i + 1] ? CellsHLines[i + 1][k] : 'none',
                        top: i === 0 ? CellsHLines[i] ? CellsHLines[i][k] : 'none' : '' }, CellsHLSpaces[i + 1][k]);
                    tsv_row[k] = data_1.content;
                    res = res.concat(data_1.res);
                }
                res.push({ token: 'tr_close', tag: 'tr', n: -1 });
            }
            continue;
        }
        res.push({ token: 'tr_open', tag: 'tr', n: 1, attrs: [['style', 'border-top: none !important; border-bottom: none !important;']] });
        var cells = exports.separateByColumns(cellsAll[i]);
        for (var j = 0; j < numCol; j++) {
            var ic = multi_column_row_1.getCurrentMC(cells, j);
            if (ic >= numCol) {
                break;
            }
            if (j >= (cells.length) && ic < numCol) {
                for (var k = ic; k < numCol; k++) {
                    var cRight_1 = k === numCol - 1 ? cLines[cLines.length - 1] : cLines[k + 1];
                    var cLeft_1 = k === 0 ? cLines[0] : '';
                    var data_2 = tabular_td_1.AddTd('', { h: cAlign[k], v: vAlign[k], w: cWidth[k] }, { left: cLeft_1, right: cRight_1, bottom: CellsHLines[i + 1] ? CellsHLines[i + 1][k] : 'none',
                        top: i === 0 ? CellsHLines[i] ? CellsHLines[i][k] : 'none' : '' }, CellsHLSpaces[i + 1][k]);
                    tsv_row[k] = data_2.content;
                    res = res.concat(data_2.res);
                }
                break;
            }
            var cRight = ic === numCol - 1 ? cLines[cLines.length - 1] : cLines[ic + 1];
            var cLeft = ic === 0 ? cLines[0] : '';
            if (cells[j] && cells[j].trim().length > 0) {
                var multi = multi_column_row_1.getMultiColumnMultiRow(cells[j], { lLines: cLines[ic], align: cAlign[ic], rLines: cRight });
                if (multi) {
                    var mr = multi.mr > rows.length ? rows.length : multi.mr;
                    var mc = multi.mc > numCol ? numCol : multi.mc;
                    if (mr && mr > 0) {
                        if (mc && mc > 1) {
                            var d = ic - mc + 1;
                            for (var k = 0; k < mc; k++) {
                                MR[d + k] = mr;
                            }
                        }
                        else {
                            MR[ic] = mr;
                        }
                        if (mr + i >= rows.length - 1) {
                            multi.attrs = tabular_td_1.addHLineIntoStyle(multi.attrs, CellsHLines[mr + i] ? CellsHLines[mr + i][ic] : 'none');
                        }
                    }
                    else {
                        if (mc && mc > 1) {
                            var d = ic - mc + 1;
                            for (var k = 0; k < mc; k++) {
                                MR[d + k] = MR[d + k] > 0 ? MR[d + k] - 1 : 0;
                            }
                        }
                        else {
                            MR[ic] = MR[ic] > 0 ? MR[ic] - 1 : 0;
                        }
                        if (MR[ic] && MR[ic] > 0) {
                            continue;
                        }
                    }
                    if (i === 0) {
                        multi.attrs = tabular_td_1.addHLineIntoStyle(multi.attrs, CellsHLines[i] ? CellsHLines[i][ic] : 'none', 'top');
                    }
                    if (mr && mr > 0) {
                        multi.attrs = tabular_td_1.addHLineIntoStyle(multi.attrs, CellsHLines[mr + i] ? CellsHLines[mr + i][ic] : 'none');
                    }
                    else {
                        multi.attrs = tabular_td_1.addHLineIntoStyle(multi.attrs, CellsHLines[i + 1] ? CellsHLines[i + 1][ic] : 'none');
                    }
                    res.push({ token: 'td_open', tag: 'td', n: 1, attrs: multi.attrs });
                    if (multi.subTable) {
                        res = res.concat(multi.subTable);
                    }
                    else {
                        if (multi.content) {
                            res.push({ token: 'inline', tag: '', n: 0, content: multi.content });
                            tsv_row[j] = multi.content;
                        }
                    }
                    res.push({ token: 'td_close', tag: 'td', n: -1 });
                    continue;
                }
                MR[ic] = MR[ic] > 0 ? MR[ic] - 1 : 0;
                if (MR[ic] && MR[ic] > 0) {
                    continue;
                }
                var parseSub = sub_tabular_1.getSubTabular(cells[j], 0);
                if (parseSub && parseSub.length > 0) {
                    res = res.concat(tabular_td_1.AddTdSubTable(parseSub, { h: cAlign[ic], v: vAlign[ic], w: cWidth[ic] }, { left: cLeft, right: cRight, bottom: CellsHLines[i + 1] ? CellsHLines[i + 1][ic] : 'none',
                        top: i === 0 ? CellsHLines[i] ? CellsHLines[i][ic] : 'none' : '' }));
                    for (var si = 0; si < parseSub.length; si++) {
                        tsv_row[j] += tsv_row[j].length > 0 ? ' ' : '';
                        tsv_row[j] += parseSub[si].id;
                    }
                    continue;
                }
                var parseMath = sub_math_1.getMathTableContent(cells[j], 0);
                var content = '';
                if (parseMath) {
                    content = parseMath;
                }
                else {
                    content = common_1.getContent(cells[j]);
                }
                var data_3 = tabular_td_1.AddTd(content, { h: cAlign[ic], v: vAlign[ic], w: cWidth[ic] }, { left: cLeft, right: cRight, bottom: CellsHLines[i + 1] ? CellsHLines[i + 1][ic] : 'none',
                    top: i === 0 ? CellsHLines[i] ? CellsHLines[i][ic] : 'none' : '' }, CellsHLSpaces[i + 1][ic], decimal[ic]);
                tsv_row[ic] = data_3.content;
                res = res.concat(data_3.res);
            }
            else {
                MR[ic] = MR[ic] > 0 ? MR[ic] - 1 : 0;
                if (MR[ic] && MR[ic] > 0) {
                    continue;
                }
                var data_4 = tabular_td_1.AddTd('', { h: cAlign[ic], v: vAlign[ic], w: cWidth[ic] }, { left: cLeft, right: cRight, bottom: CellsHLines[i + 1] ? CellsHLines[i + 1][ic] : 'none',
                    top: i === 0 ? CellsHLines[i] ? CellsHLines[i][ic] : 'none' : '' }, CellsHLSpaces[i + 1][ic]);
                tsv_row[ic] = data_4.content;
                res = res.concat(data_4.res);
            }
        }
        tsv_1.tsvPush(tsv_row);
        res.push({ token: 'tr_close', tag: 'tr', n: -1 });
    }
    res.push({ token: 'tbody_close', tag: 'tbody', n: -1 });
    res.push({ token: 'table_close', tag: 'table', n: -1 });
    return res;
};
exports.ParseTabular = function (str, i, align) {
    if (align === void 0) { align = ''; }
    var res = [];
    var posEnd = str.indexOf('\\end{tabular}');
    if (posEnd > 0) {
        var posBegin = str.slice(i, posEnd).lastIndexOf('\\begin{tabular}');
        if (posBegin >= 0) {
            var params = common_1.getParams(str, posBegin + '\\begin{tabular}'.length);
            if (params) {
                var subT = str.slice(posBegin, posEnd + '\\end{tabular}'.length);
                str = sub_tabular_1.pushSubTabular(str, subT, posBegin, posEnd, i);
                res = exports.ParseTabular(str, 0, align);
            }
            else {
                var match = str
                    .slice(posBegin)
                    .match(/(?:\\begin{tabular}\s{0,}\{([^}]*)\})/);
                var subT = str.slice(posBegin, posEnd + '\\end{tabular}'.length);
                str = sub_tabular_1.pushSubTabular(str, subT, posBegin + match.index, posEnd, i);
                res = exports.ParseTabular(str, 0, align);
            }
        }
        else {
            var subT = str.slice(i, posEnd);
            var subRes = setTokensTabular(subT, align);
            str = sub_tabular_1.pushSubTabular(str, subRes, 0, posEnd);
            res = exports.ParseTabular(str, 0, align);
        }
    }
    else {
        res = setTokensTabular(str, align);
    }
    return res;
};
//# sourceMappingURL=parse-tabular.js.map