'use strict';
const fs = require ('fs');


if(process.argv.length > 0){
  let filename = process.argv[0];
   
  fs.readFile(filename, function read(err, data) {
    if (err) throw err;
    
    console.log(data); 
  });

  fs.writeFile(filename, Math.random(), function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });


  fs.readFile(filename, function read(err, data) {
    if (err) throw err;
    console.log(data);
  });
}