import type { ConsoleConstructor } from "console";
import { useGeneralFunction } from "../base/GeneralWrapper";
interface ConsoleMethod {
  error(...data: any[]): void;
  info(...data: any[]): void;
  log(...data: any[]): void;
  trace(...data: any[]): void;
  warn(...data: any[]): void;
}
type LoggingType = keyof ConsoleMethod;
export function useLogger() {
  const { baseManager } = useGeneralFunction();
  return {
    Console(type: LoggingType, ...message: any[]) {
      if (process.env.BUILD_STATE === "production") return;
      console[type](message);
      baseManager.AddLog(type, message);
      return { type, message };
    },
    GetAllLog() {
      const VERSION = "v1.0";
      const logs = baseManager.ReadAllLog();
      if (logs) {
        return {
          version: VERSION,
          logging: logs.map(
            (val) =>
              val as {
                type: LoggingType;
                message: any[];
              }
          ),
        };
      }
    },
  };
}
