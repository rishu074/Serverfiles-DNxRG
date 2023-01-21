declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
      }
      interface Process {
        RequestsMemoryDatabase: [{
          ip: string,
          ua: string,
          path: string
        }]
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}