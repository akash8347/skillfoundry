/**
 * Logger Service
 * Handles all application logging with different levels
 */

const LOG_LEVELS = {
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
};

class Logger {
  constructor(module) {
    this.module = module;
  }

  /**
   * Format log message
   */
  formatLog(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const log = {
      timestamp,
      level,
      module: this.module,
      message,
      ...(data && { data }),
    };
    return JSON.stringify(log);
  }

  /**
   * Debug level logging
   */
  debug(message, data = null) {
    if (process.env.NODE_ENV === "development") {
      console.log(this.formatLog(LOG_LEVELS.DEBUG, message, data));
    }
  }

  /**
   * Info level logging
   */
  info(message, data = null) {
    console.log(this.formatLog(LOG_LEVELS.INFO, message, data));
  }

  /**
   * Warning level logging
   */
  warn(message, data = null) {
    console.warn(this.formatLog(LOG_LEVELS.WARN, message, data));
  }

  /**
   * Error level logging
   */
  error(message, error = null, data = null) {
    const errorData = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      ...data,
    } : data;

    console.error(this.formatLog(LOG_LEVELS.ERROR, message, errorData));
  }

  /**
   * Log API request
   */
  logRequest(method, url, statusCode, duration) {
    this.info(`${method} ${url} - ${statusCode}ms`, {
      method,
      url,
      statusCode,
      duration: `${duration}ms`,
    });
  }

  /**
   * Log API error
   */
  logAPIError(method, url, statusCode, error) {
    this.error(`${method} ${url} - ${statusCode}`, error, {
      method,
      url,
      statusCode,
    });
  }
}

/**
 * Create logger instance
 */
export function createLogger(module) {
  return new Logger(module);
}

export { LOG_LEVELS };
