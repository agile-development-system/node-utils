/*
 * @Author: 锦阳
 * @Create: 2021年04月22日
 */
/**
 * 递归获取配置对象presets数组，返回一维数组
 * @param {Config} config
 * @returns {Promise<Config[]>}
 * @alias module:nodeUtils.getDeepPreset
 */
async function getDeepPreset(config) {
    const realConfig = await config;
    const presets = (realConfig.presets || []).reverse();
    const deepPresets = [];
    await Promise.all(presets.map(async preset => {
        deepPresets.push.apply(deepPresets, await getDeepPreset(await preset));
    }));
    deepPresets.push(realConfig);
    return deepPresets;
}

module.exports = getDeepPreset;

/**
 * 支持preset的配置对象
 * @typedef Config
 * @property {Config[]} presets 预设配置数组
 */
