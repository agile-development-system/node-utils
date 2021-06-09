/*
 * @Author: 锦阳
 * @Create: 2021年04月22日
 */
const { merge } = require('webpack-merge');

/**
 * 支持presets预设的配置生成工具
 *
 * @alias module:nodeUtils.PresetUtils
 */
class PresetUtils {
    /**
     * 递归获取配置对象presets数组，返回一维数组
     *
     * @param {Config} config 配置对象
     * @returns {Promise<Config[]>}
     */
    static async getDeepPreset(config) {
        const realConfig = await config;
        const presets = (realConfig.presets || []).reverse();
        const deepPresets = [];
        await Promise.all(presets.map(async preset => {
            deepPresets.push.apply(deepPresets, await this.getDeepPreset(await preset));
        }));
        deepPresets.push(realConfig);
        return deepPresets;
    }

    /**
     * 递归获取配置对象presets数组，并使用merge合并
     *
     * @param {Config} config 配置对象
     * @returns {Config}
     */
    static async getDeepPresetMerge(config) {
        const configs = await this.getDeepPreset(config);
        const _config = merge(configs);
        delete _config.presets;
        return _config;
    }

    /**
     * 递归获取配置对象presets数组，并使用merge合并，最后调用`config.modify`函数
     *
     * @param {Config} config 配置对象
     * @returns {Config}
     */
    static async getDeepPresetMergeAndModify(config) {
        const _config = await this.getDeepPresetMerge(config);
        typeof _config.modify === 'function' && _config.modify(_config);
        return _config;
    }
}
module.exports = PresetUtils;

/**
 * 支持preset的配置对象
 *
 * @typedef {object} Config
 * @property {Config[]} presets 预设配置数组
 * @property {ConfigModify} modify 将默认配置和preset合并后生成的config再次处理的钩子
 */

/**
 * @callback ConfigModify
 * @param {Config} config 将默认配置和preset合并后生成的config
 * @returns {Config}
 */
