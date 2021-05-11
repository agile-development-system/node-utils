/*
 * @Author: 锦阳
 * @Create: 2021年04月22日
 */
const { merge } = require('webpack-merge');
/**
 * 支持preset的配置对象
 * @typedef {object} module:nodeUtils.PresetUtils~Config
 * @property {Config[]} presets 预设配置数组
 */

/**
 * 支持presets预设的配置生成工具
 * @alias module:nodeUtils.PresetUtils
 */
class PresetUtils {
    /**
    * 递归获取配置对象presets数组，返回一维数组
    * @param {module:nodeUtils.PresetUtils~Config} config 配置对象
    * @returns {Promise<module:nodeUtils.PresetUtils~Config[]>}
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
     * @param {module:nodeUtils.PresetUtils~Config} config 配置对象
     * @returns {module:nodeUtils.PresetUtils~Config}
     */
    static async getDeepPresetMerge(config) {
        const configs = await this.getDeepPreset(config);
        const _config = merge(configs);
        delete _config.preset;
        return _config;
    }
}
module.exports = PresetUtils;
