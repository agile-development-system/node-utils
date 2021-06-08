const { expect, test, describe } = require('@jest/globals');
const { ConvName, FastFs, FastPath } = require('@ads/node-utils');
const path = require('path');
const fs = require('fs-extra');
describe('ConvName', () => {
    test('ConvName.initName', () => {
        const convName = ConvName.initName('ConvName-test');
        expect(convName.lineName).toBe('conv-name-test');
        expect(convName.humpName).toBe('ConvNameTest');
        expect(convName.lowerHumpName).toBe('convNameTest');
    });
    test('class ConvName', () => {
        const convName = new ConvName('ConvName-test');
        expect(convName.lineName).toBe('conv-name-test');
        expect(convName.humpName).toBe('ConvNameTest');
        expect(convName.lowerHumpName).toBe('convNameTest');
    });
    test('ConvName.toLine', () => {
        const name = ConvName.toLine('ConvName-test');
        expect(name).toBe('conv-name-test');
    });
    test('ConvName.toLowerHump', () => {
        const name = ConvName.toLowerHump('ConvName-test');
        expect(name).toBe('convNameTest');
    });
    test('ConvName.toUpperHump', () => {
        const name = ConvName.toUpperHump('ConvName-test');
        expect(name).toBe('ConvNameTest');
    });
});

const testText = 'Test';
describe('FastFs', () => {
    test('FastFs.writeFile', async () => {
        const pathName = path.join(__dirname, '.temp/FastFs.writeFile.test');
        await FastFs.writeFile(pathName, testText);
        expect(fs.readFileSync(pathName, { encoding: 'utf-8' })).toBe(testText);
    });
    test('FastFs.writeFileSync', () => {
        const pathName = path.join(__dirname, '.temp/FastFs.writeFileSync.test');
        FastFs.writeFileSync(pathName, testText);
        expect(fs.readFileSync(pathName, { encoding: 'utf-8' })).toBe(testText);
    });
    const statPathName = path.join(__dirname, '../__mock__/index.js');
    const statFalsePathName = path.join(__dirname, '../__mock__/index.jst');

    test('FastFs.getPathStat', async () => {
        const res = await FastFs.getPathStat(statPathName);
        expect(res).toBe(true);
    });
    test('FastFs.getPathStat false', async () => {
        const res = await FastFs.getPathStat(statFalsePathName);
        expect(res).toBe(false);
    });
    test('FastFs.getPathStatSync', () => {
        const res = FastFs.getPathStatSync(statPathName);
        expect(res).toBe(true);
    });
    test('FastFs.getPathStatSync false', () => {
        const res = FastFs.getPathStatSync(statFalsePathName);
        expect(res).toBe(false);
    });
    const obj = {
        a: 'a',
        b: 1,
    };
    test('FastFs.writeJsonFormat&FastFs.readJson', async () => {
        const pathName = path.join(__dirname, '.temp/FastFs.writeJsonFormat.json');
        await FastFs.writeJsonFormat(pathName, obj);
        expect(await FastFs.readJson(pathName)).toMatchObject(obj);
    });
    test('FastFs.writeJsonFormatSync&FastFs.readJsonSync', () => {
        const pathName = path.join(__dirname, '.temp/FastFs.writeJsonFormatSync.json');
        FastFs.writeJsonFormatSync(pathName, obj);
        expect(FastFs.readJsonSync(pathName)).toMatchObject(obj);
    });
    const json = require('../__mock__/json.json');
    const jsonPathName = path.join(__dirname, '../__mock__/json.json');
    test('FastFs.readJson', async () => {
        const res = await FastFs.readJson(jsonPathName);
        expect(res).toMatchObject(json);
    });
    test('FastFs.readJsonSync', () => {
        const res = FastFs.readJsonSync(jsonPathName);
        expect(res).toMatchObject(json);
    });
    test('FastFs parseJson error', () => {
        const jsonPathName = path.join(__dirname, '../__mock__/index.js');
        try {
            FastFs.readJsonSync(jsonPathName);
        } catch (error) {
            expect(error.message).toMatch(jsonPathName);
        }
    });
});

describe('FastPath', () => {
    test('FastPath.getCwdPath', () => {
        const res = FastPath.getCwdPath('package.json');
        expect(typeof res === 'string').toBe(true);
    });
    test('FastPath.getHomePath', () => {
        const res = FastPath.getHomePath('cache');
        expect(typeof res === 'string').toBe(true);
    });
    test('FastPath.getAdsHomePath', () => {
        const res = FastPath.getAdsHomePath('cache');
        expect(typeof res === 'string').toBe(true);
    });
    test('FastPath.convPath', () => {
        const res = FastPath.convPath(__dirname, 'cache');
        expect(typeof res === 'string').toBe(true);
    });
    test('FastPath.convPath root', () => {
        const res = FastPath.convPath(__dirname, '/cache');
        expect(typeof res === 'string').toBe(true);
    });
});
