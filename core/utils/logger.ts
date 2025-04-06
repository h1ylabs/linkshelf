export type LoggerModule = {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
};

export class Logger {
  public readonly prefixes: string[];
  private readonly totalPrefix: string;

  /**
   * Logger의 출력 방식을 나타냅니다.
   */
  private output: LoggerModule = {
    info: console.info,
    warn: console.warn,
    error: console.error,
  };

  constructor(...prefixes: string[]) {
    this.prefixes = prefixes;
    this.totalPrefix = this.prefixes.map((prefix) => `/${prefix}`).join("");
  }

  static withOutput(output: LoggerModule) {
    return (...prefixes: string[]) => {
      const logger = new Logger(...prefixes);
      logger.output = output;

      return logger;
    };
  }

  info(message: string) {
    this.output.info(`[📚Linkshelf${this.totalPrefix}] [INFO] ${message}`);
  }

  warn(message: string) {
    this.output.warn(`[📚Linkshelf${this.totalPrefix}] [WARN] ${message}`);
  }

  error(message: string) {
    this.output.error(`[📚Linkshelf${this.totalPrefix}] [ERROR] ${message}`);
  }
}