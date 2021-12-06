// spawn a worker without using an external file
// https://medium.com/@roman01la/run-web-worker-with-a-function-rather-than-external-file-303add905a0
const { Worker } = require('worker_threads');
const { Blob } = require('node:buffer');
function createWorker(fn) {
    return new Worker(URL.createObjectURL(new Blob([`(${fn})()`])));
}

module.exports = { createWorker };
