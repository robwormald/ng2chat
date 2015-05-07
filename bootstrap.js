/**
 * ES5 startup script. Loads main ES6 module and runs it.
 */
(function(){

  //execute run method on main module
  function bootstrap(mainModule){
    return mainModule.main();
    console.log('booted')
  }

  function importError(err){
    console.error('Error while importing:',err);
  }

  function bootstrapError(err){
    console.error('Error while bootstrapping:',err);
  }

  console.info('starting app...');

  //use SystemJS to import main.js
  System.import('src/main')
  .catch(importError)
  .then(bootstrap)
  .catch(bootstrapError);

})()
