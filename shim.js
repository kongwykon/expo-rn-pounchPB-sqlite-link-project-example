import { decode, encode } from 'base-64'
global.Buffer = global.Buffer || require('buffer/').Buffer

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

// Avoid using node dependent modules
process.browser = true