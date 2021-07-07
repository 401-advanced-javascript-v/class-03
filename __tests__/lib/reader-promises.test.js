'use strict';

jest.mock('fs');

const reader = require('../../lib/reader-promises.js');

describe('File Reader Module', () => {

  it('promises: when given a bad file, returns an error', async function() {
    let files = ['bad.txt'];
    // In jest, throwing errors obviously kills the app, so if you're
    // going to throw one in a test, have the expect execute your code as a
    // function so that you can trap it.
    console.log('0test case: ');
    let contents = await reader(files);
    // console.log(err instanceof Error);
    // expect(contents.length).toBe(3);
    console.log('typeof contents'); //should be an error
    // console.log(contents); //should be an error
    // console.log(typeof contents); //should be an error
    expect(contents).toBeDefined();
    expect(contents).toBe('Invalid File');
    
  });


  it('promises: reads 3 files', async function(){
    let files = ['file1.txt', 'file2.txt', 'file2.txt'];
    let contents = await reader(files);
    console.log('contents:');
    console.log(contents);
    expect(contents).toBeDefined();
    expect(contents.length).toBe(3);
    
  });

});
