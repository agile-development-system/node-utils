const { expect, test, describe } = require('@jest/globals');
const { ConvName, FastFs, FastPath, Notice, PresetUtils } = require('@ads/node-utils');
const path = require('path');
const fs = require('fs-extra');
describe('ConvName', () => {
    test('ConvName.initName', () => {
        const convName = ConvName.initName('ConvName-test');
        expect(convName).toMatchObject({
            lineName: 'conv-name-test',
            humpName: 'ConvNameTest',
            lowerHumpName: 'convNameTest',
        });
    });
    test('class ConvName', () => {
        const convName = new ConvName('ConvName-test');
        expect(convName).toMatchObject({
            lineName: 'conv-name-test',
            humpName: 'ConvNameTest',
            lowerHumpName: 'convNameTest',
        });
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
describe('Notice', () => {
    const onConsoleOut = (logMethod, cb, out) => new Promise(resolve => {
        const log = console[logMethod];
        console[logMethod] = function () {
            // log.apply(console, arguments);
            cb.apply(null, arguments);
            resolve();
            console[logMethod] = log;
        };
        out();
    });
    test('Notice.success', () => {
        return onConsoleOut('log', (res) => {
            expect(JSON.stringify(res)).toBe('"\\u001b[42m\\u001b[30m SUCCESS \\u001b[39m\\u001b[49m\\u001b[32m 成功信息\\u001b[39m"');
        }, () => Notice.success('成功信息'));
    });
    test('Notice.error', () => {
        return onConsoleOut('error', (res) => {
            expect(JSON.stringify(res)).toBe('"\\u001b[41m ERROR \\u001b[49m\\u001b[31m 错误信息\\u001b[39m"');
        }, () => Notice.error('错误信息'));
    });
    test('Notice.warn', () => {
        return onConsoleOut('warn', (res) => {
            expect(JSON.stringify(res)).toBe('"\\u001b[43m\\u001b[30m WARN \\u001b[39m\\u001b[49m\\u001b[33m 警告信息\\u001b[39m"');
        }, () => Notice.warn('警告信息'));
    });
    test('Notice.info', () => {
        return onConsoleOut('info', (res) => {
            expect(JSON.stringify(res)).toBe('"\\u001b[44m\\u001b[30m INFO \\u001b[39m\\u001b[49m\\u001b[36m 普通信息\\u001b[39m"');
        }, () => Notice.info('普通信息'));
    });
    test('Notice.getStr', () => {
        const res = Notice.getStr('info', '普通信息颜色文字');
        expect(JSON.stringify(res)).toBe('"\\u001b[36m普通信息颜色文字\\u001b[39m"');
    });
    test('Notice.getBoldStr', () => {
        const res = Notice.getBoldStr('blue', '普通信息颜色文字');
        expect(JSON.stringify(res)).toBe('"\\u001b[1m\\u001b[34m普通信息颜色文字\\u001b[39m\\u001b[22m"');
    });
});

describe('PresetUtils', () => {
    const config = {
        presets: [{
            e: 'e',
            b: ['b'],
            c: 'c',
        }],
        a: 'a',
        c: 'd',
        b: [
            'a',
            'c',
        ],
        modify: (_config) => {
            delete _config.c;
        },
    };
    test('PresetUtils.getDeepPreset', async () => {
        const res = await PresetUtils.getDeepPreset(config);
        expect(res).toMatchObject([
            { e: 'e', b: ['b'], c: 'c' },
            { presets: [{ e: 'e', b: ['b'], c: 'c' }], a: 'a', c: 'd', b: ['a', 'c'] },
        ]);
    });
    test('PresetUtils.getDeepPresetMerge', async () => {
        const res = await PresetUtils.getDeepPresetMerge(config);
        expect(res).toMatchObject({ a: 'a', b: ['b', 'a', 'c'], c: 'd', e: 'e' });
    });
    test('PresetUtils.getDeepPresetMergeAndModify', async () => {
        const res = await PresetUtils.getDeepPresetMergeAndModify(config);
        expect(res).toMatchObject({ a: 'a', b: ['b', 'a', 'c'], e: 'e' });
    });
});