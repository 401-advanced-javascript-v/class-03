'use strict';

const fs = require('fs');
const util = require('util');
let contents = [];


// const readFile = util.promisify(fs.readFile);
const readFileAsync = util.promisify(fs.readFile);
/**
 * Our module exports a single function that expects an array of files
 * @type {function(*=)}
 */
module.exports = exports = async function (files){
  let contents = [];
  let response_error = null;
  console.log('promises files:');
  console.log(files);
  for(let i = 0; i<files.length; i++){
    await readFileAsync(files[i]).then((text) => {
      console.log('readfile:', text);
      contents.push(text.toString().trim());
    }).catch((err) => {
      console.log('error:', err);
      response_error = err;
    });
  }

  if(response_error !== null){
    return response_error;
  }

  return contents;
  
};



// let promisify = (fn) => (...args) => {
//   return new Promise((resolve, reject) => {
//     fn(...args, (err, data)=>{
//       if(err) {reject(err);}
//       else{ resolve(data);}
//     });
//   });
// };

/**
 * This wraps the fs module, primarily so that we can more easily write tests around it.
 * @param file
 * @param callback
 */
const readOne = (file, callback)=>{
  fs.readFile( file, (err, data) => {
    if(err) { callback(err); }
    else { callback(undefined, data); }
  });
};

// let utilPromised = promisify(readOne);

/**
 * Reads and returns the contents of 3 files
 * Requires 3 paths, otherwise, it'll fail with aggression
 * @param paths
 */
const readAll = (paths, callback) => {
  let contents = [];
  readOne(paths[0], (err, data) => {
    if (err) {
      callback(err);
    }
    else {
      contents.push(data.toString().trim());
    } 
  });

  
  readOne(paths[1], (err, data) => {
    if (err) {
      callback(err);
    }
    else {
      contents.push(data.toString().trim());
    }
  });


  readOne(paths[2], (err, data) => {
    if (err) {
      callback(err);
    }
    else {
      contents.push(data.toString().trim());
    }  
  });
  callback(null, contents);
};

