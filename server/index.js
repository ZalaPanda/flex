const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const filePath = path.resolve(__dirname, '../db/feladat1.txt');
const kartyak = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }).split('\r\n\r\n');
const feladat1 = [
    /\bpid:\S/,
    /\bbyr:\S/,
    /\biyr:\S/,
    /\beyr:\S/,
    /\bhgt:\S/,
    /\bhcl:\S/,
    /\becl:\S/];
const feladat2 = [
    /\bpid:\d{9}\b/,
    /\bbyr:(19[2-9][0-9]|200[0-2])\b/,
    /\biyr:(201[0-9]|202[0-1])\b/,
    /\beyr:(202[0-9]|203[0-1])\b/,
    /\bhgt:([5-9][0-9]cm|1[0-9][0-9]cm|2[0-1][0-9]cm|220cm|[2-8][0-9]in|90in)\b/,
    /\bhcl:#[0-9a-f]{6}\b/,
    /\becl:(grn|blu|brn|hzl|oth|amb|gry)\b/
];
console.log(kartyak);
const megoldas1 = kartyak.reduce((rendben, kartya) => rendben + (feladat1.find(mezo => !mezo.test(kartya)) === undefined ? 1 : 0), 0);
const megoldas2 = kartyak.reduce((rendben, kartya) => rendben + (feladat2.find(mezo => !mezo.test(kartya)) === undefined ? 1 : 0), 0);
console.log({ osszesen: kartyak.length, megoldas1, megoldas2 });

const app = express();
app.use(express.json());
app.use(express.static('frontend/public'));
app.use((_, res, next) => { // app.use(helmet()) -> https://helmetjs.github.io/
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/kartyak', (_, res) => res.json(kartyak));
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));