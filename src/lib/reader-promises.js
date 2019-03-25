'use strict';

const fs = require('fs');
const util = require('util');
let contents = [];


// const readFile = util.promisify(fs.readFile);
const readFile = util.promisify(fs.readFile);
/**
 * Our module exports a single function that expects an array of files
 * @type {function(*=)}
 */
module.exports = exports = (files, callback) => {
  if(files.length == 1){
    readOne(files[0],callback);
  }else{
    readAll([...files],callback);
  }
  contents = [];
};

/**
 * This wraps the fs module, primarily so that we can more easily write tests around it.
 * @param file
 * @param callback
 */
const readOne = (file, callback)=>{
  fs.readFile( file, (err, data) => {
    if(err) { callback(err); }
    else { callback(null, data); }
  });
};

/**
 * Reads and returns the contents of 3 files
 * Requires 3 paths, otherwise, it'll fail with aggression
 * @param paths
 */
const readAll = (paths, callback) => {
  let contents = [];
  readFile(paths[0])
    .then(data => {
      contents.push(data.toString().trim());
      return readFile(paths[1]);
    })
    .then( data => {
      contents.push(data.toString().trim());
      return readFile(paths[2]);
    })
    .then( data => {
      contents.push(data.toString().trim());
      callback(null, contents);
    })
    .catch( error => callback(error));
};
  
