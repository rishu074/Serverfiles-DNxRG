declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      WORKER_LOGS: "false" | "true";
      THEME: string;
      LOGIN_Q: string;
      LOGIN_USERKEY: string;
      LOGIN_PASSKEY: string;
      SSL: "false" | "true";
    }
    interface Process {
      RequestsMemoryDatabase: Array<{
        ip: string,
        ua: string,
        path: string,
        timestamp: number
      }>;
      WhitelistedIPS: Array<string>,
      SessionKeys: {
        session_key: string,
        xsrf_token: string,
        _comment: string
      },
      DownloadsData: Array<{
        time: number,
        file: string,
      }>
      HashDatabase: Array<{
        path: string,
        hash: string
      }>
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }