#! /usr/bin/env node
/*
 * @Author: 锦阳
 * @Create: 2021年06月08日
 */
const path = require('path');
const CmdParser = require('../index').CmdParser;
CmdParser.cmdParser({ root: path.resolve(__dirname, '../../'), cmd: 'gc-has-msg' });
