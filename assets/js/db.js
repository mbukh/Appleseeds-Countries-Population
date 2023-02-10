// LZString from https://github.com/pieroxy/lz-string
// imported in html

async function writeDataToDb(key, data) {
    const compressed = await LZString.compressToUTF16(JSON.stringify(data));
    localStorage.setItem(key, compressed);
}

async function getDataFromDb(key) {
    const data = await LZString.decompressFromUTF16(localStorage.getItem(key));
    return data;
}

function getLocalStorageSize() {
    var _lsTotal = 0,
        _xLen,
        _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = (localStorage[_x].length + _x.length) * 2;
        _lsTotal += _xLen;
        console.log(
            _x.substring(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB"
        );
    }
    console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
}

export default { writeDataToDb, getDataFromDb, getLocalStorageSize };
