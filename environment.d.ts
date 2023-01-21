declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        WORKER_LOGS: "false" | "true";
      }
      interface Process {
        RequestsMemoryDatabase: Array<{
          ip: string,
          ua: string,
          path: string,
          timestamp: number
        }>
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}