import {
  apiUri,
  Level,
  LogColors,
  logColors as logColorsMap,
  LogLevels,
  logLevels as logLevelsMap,
  LogsToRecord,
  logsToRecord as logsToRecordMap
} from './config';

interface Base {
  applicationId?: string;
  disableColors?: boolean;
  level?: Level;
  logColors?: LogColors;
  logLevels?: LogLevels;
  logsToRecord?: LogsToRecord;
}

interface PublicConfig extends Base {
  applicationId: string;
  privateKey?: never;
  publicKey: string;
}

interface PrivateConfig extends Base {
  applicationId: string;
  privateKey: string;
  publicKey?: never;
}

interface BaseConfig extends Base {
  applicationId?: never;
  privateKey?: never;
  publicKey?: never;
}

type Config = PrivateConfig | PublicConfig | BaseConfig;

export default class Logger {
  private lastLogTime: { [key: string]: number } = {};

  private readonly applicationId: string | null = null;

  private readonly disableColors: boolean = false;

  private readonly level: Level = 'info';

  private readonly logColors = logColorsMap;

  private readonly logLevels = logLevelsMap;

  private readonly logsToRecord = logsToRecordMap;

  private readonly privateKey?: string;

  private readonly publicKey?: string;

  constructor(config: Config = {}) {
    this.applicationId = config.applicationId ?? this.applicationId ?? null;
    this.disableColors = config.disableColors ?? this.disableColors;
    this.level = config.level ?? this.level;
    this.logColors = { ...this.logColors, ...config.logColors };
    this.logLevels = { ...this.logLevels, ...config.logLevels };
    this.logsToRecord = { ...this.logsToRecord, ...config.logsToRecord };
    this.privateKey = config.privateKey;
    this.publicKey = config.publicKey;
  }

  /**
   * Asserts that a condition is true. If not, it will write a message to the console.
   * @param condition - The condition to test.
   * @param data - Data to write to the console.
   */

  assert(condition?: boolean, ...data: any[]) {
    if (this.skipLog('assert')) return;
    const messages = data.map((message) => this.applyColor(message, 'assert'));
    console.assert(condition, ...messages);
    this.debounce(this.recordLog.bind(this))('assert', condition, ...data);
  }

  /**
   * Clears the console.
   */

  clear() {
    if (this.skipLog('clear')) return;
    console.clear();
    this.debounce(this.recordLog.bind(this))('clear');
  }

  /**
   * Logs the number of times that this particular call to count() has been called.
   * @param label - The label to use for the counter.
   */

  count(label?: string) {
    if (this.skipLog('count')) return;
    const message = this.applyColor(label ?? '', 'count');
    console.count(message);
    this.debounce(this.recordLog.bind(this))('count', label);
  }

  /**
   * Resets the counter used with console.count().
   * @param label - The label to use for the counter.
   */

  countReset(label?: string) {
    if (this.skipLog('countReset')) return;
    const message = this.applyColor(label ?? '', 'countReset');
    console.countReset(message);
    this.debounce(this.recordLog.bind(this))('countReset', label);
  }

  /**
   * Logs a debug message to the console.
   * @param data - Data to write to the console.
   */

  debug(...data: any[]) {
    if (this.skipLog('debug')) return;
    const messages = data.map((message) => this.applyColor(message, 'debug'));
    console.debug(...messages);
    this.debounce(this.recordLog.bind(this))('debug', ...data);
  }

  /**
   * Displays an interactive list of the properties of the specified JavaScript object.
   * @param item - The object to display.
   * @param options - Optional options for displaying the object.
   */

  dir(item?: any, options?: any) {
    if (this.skipLog('dir')) return;
    console.dir(item, options);
    this.debounce(this.recordLog.bind(this))('dir', item, options);
  }

  /**
   * Displays an XML/HTML Element representation of the specified object if possible.
   * @param data - Data to write to the console.
   */

  dirxml(...data: any[]) {
    if (this.skipLog('dirxml')) return;
    console.dirxml(...data);
    this.debounce(this.recordLog.bind(this))('dirxml', ...data);
  }

  /**
   * Logs an error message to the console.
   * @param data - Data to write to the console.
   */

  error(...data: any[]) {
    if (this.skipLog('error')) return;
    const messages = data.map((message) => this.applyColor(message, 'error'));
    console.error(...messages);
    this.debounce(this.recordLog.bind(this))('error', ...data);
  }

  /**
   * Creates a new inline group in the console log.
   * @param data - Data to write to the console.
   */

  group(...data: any[]) {
    if (this.skipLog('group')) return;
    const messages = data.map((message) => this.applyColor(message, 'group'));
    console.group(...messages);
    this.debounce(this.recordLog.bind(this))('group', ...data);
  }

  /**
   * Creates a new inline group in the console log that is initially collapsed.
   * @param data - Data to write to the console.
   */

  groupCollapsed(...data: any[]) {
    if (this.skipLog('groupCollapsed')) return;
    const messages = data.map((message) => this.applyColor(message, 'groupCollapsed'));
    console.groupCollapsed(...messages);
    this.debounce(this.recordLog.bind(this))('groupCollapsed', ...data);
  }

  /**
   * Exits the current inline group in the console log.
   */

  groupEnd() {
    if (this.skipLog('groupEnd')) return;
    console.groupEnd();
    this.debounce(this.recordLog.bind(this))('groupEnd');
  }

  /**
   * Logs an informational message to the console.
   * @param data - Data to write to the console.
   */

  info(...data: any[]) {
    if (this.skipLog('info')) return;
    const messages = data.map((message) => this.applyColor(message, 'info'));
    console.info(...messages);
    this.debounce(this.recordLog.bind(this))('info', ...data);
  }

  /**
   * Logs a message to the console.
   * @param data - Data to write to the console.
   */

  log(...data: any[]) {
    if (this.skipLog('log')) return;
    const messages = data.map((message) => this.applyColor(message, 'log'));
    console.log(...messages);
    this.debounce(this.recordLog.bind(this))('log', ...data);
  }

  /**
   * Displays tabular data as a table.
   * @param tabularData - The data to display.
   * @param properties - Optional properties to include in the table.
   */

  table(tabularData?: any, properties?: string[]) {
    if (this.skipLog('table')) return;
    console.table(tabularData, properties);
    this.debounce(this.recordLog.bind(this))('table', tabularData, properties);
  }

  /**
   * Starts a timer with a name specified as an input parameter.
   * @param label - The name to give the timer.
   */

  time(label?: string) {
    if (this.skipLog('time')) return;
    const message = this.applyColor(label ?? '', 'time');
    console.time(message);
    this.debounce(this.recordLog.bind(this))('time', label);
  }

  /**
   * Stops a timer that was previously started by calling console.time().
   * @param label - The name of the timer to stop.
   */

  timeEnd(label?: string) {
    if (this.skipLog('timeEnd')) return;
    const message = this.applyColor(label ?? '', 'timeEnd');
    console.timeEnd(message);
    this.debounce(this.recordLog.bind(this))('timeEnd', label);
  }

  /**
   * Logs the current value of a timer that was previously started by calling console.time().
   * @param label - The name of the timer to log.
   * @param data - Data to write to the console.
   */

  timeLog(label?: string, ...data: any[]) {
    if (this.skipLog('timeLog')) return;
    const messages = data.map((message) => this.applyColor(message, 'timeLog'));
    console.timeLog(label, ...messages);
    this.debounce(this.recordLog.bind(this))('timeLog', label, ...data);
  }

  /**
   * Adds a label to the browser's Timeline or Waterfall tool.
   * @param label - The label to add.
   */

  timeStamp(label?: string) {
    if (this.skipLog('timeStamp')) return;
    const message = this.applyColor(label ?? '', 'timeStamp');
    console.timeStamp(message);
    this.debounce(this.recordLog.bind(this))('timeStamp', label);
  }

  /**
   * Logs a stack trace to the console.
   * @param data - Data to write to the console.
   */

  trace(...data: any[]) {
    if (this.skipLog('trace')) return;
    const messages = data.map((message) => this.applyColor(message, 'trace'));
    console.trace(...messages);
    this.debounce(this.recordLog.bind(this))('trace', ...data);
  }

  /**
   * Logs a warning message to the console.
   * @param data - Data to write to the console.
   */

  warn(...data: any[]) {
    if (this.skipLog('warn')) return;
    const messages = data.map((message) => this.applyColor(message, 'warn'));
    console.warn(...messages);
    this.debounce(this.recordLog.bind(this))('warn', ...data);
  }

  /**
   * Applies color to a message if colors are enabled.
   * @param message - The message to color.
   * @param method - The method to use for coloring.
   * @returns The colored message.
   */

  private applyColor(message: any, method: keyof Console) {
    if (this.disableColors) return message;
    const color = this.logColors[method] ?? '\x1b[0m'; // Default to reset color
    return typeof message === 'string' ? `${color}${message}\x1b[0m` : message;
  }

  /**
   * Debounces a method to prevent flooding the network with duplicate logs.
   * @param func - The method to debounce.
   * @param timeout - The timeout in milliseconds.
   * @returns The debounced method.
   */

  private debounce(func: (method: keyof Console, ...data: any[]) => void, timeout = 1000) {
    return (method: keyof Console, ...data: any[]) => {
      const now = Date.now();
      const key = `${method}-${JSON.stringify(data)}`;

      if (!this.lastLogTime[key] || now - this.lastLogTime[key] >= timeout) {
        func(method, ...data);
      }

      // Update the last log time for this method to prevent flooding the network with duplicate logs
      this.lastLogTime[key] = now;
    };
  }

  /**
   * Gets the origin of the log.
   * @returns The origin of the log.
   */

  private static getLogOrigin() {
    const err = new Error();
    const stack = err.stack?.split('\n');

    // Skip the first two lines (the error message and this function)
    const callerLine = stack?.[5];

    // Extract the file and line number using a regular expression
    const match = callerLine?.match(/at (.*):(\d+):(\d+)/);

    if (match) {
      const filename = match[1];
      const lineNumber = match[2];
      const columnNumber = match[3];
      return { filename, lineNumber, columnNumber };
    }

    return { filename: null, lineNumber: null, columnNumber: null };
  }

  /**
   * Records a log to the logger.
   * @param method - The method used to log the data.
   * @param data - Data to log.
   */

  private recordLog(method: keyof Console, ...data: any[]) {
    // Don't log if there is no public or private key
    if (!this.publicKey && !this.privateKey) return;

    // Don't log if the method is false in the logsToRecord map
    if (!this.logsToRecord[method]) return;

    const { filename, lineNumber, columnNumber } = Logger.getLogOrigin();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: this.publicKey ?? this.privateKey ?? ''
    };

    const body = JSON.stringify({
      application_id: this.applicationId,
      column_number: columnNumber,
      filename,
      language: 'javascript',
      line_number: lineNumber,
      message: data.map((item) => Logger.serializeError(item)),
      method,
      timestamp: Date.now()
    });

    fetch(apiUri, { method: 'POST', headers, body }).catch((error) => {
      console.error('Error logging to Logify:', error);
    });
  }

  /**
   * Serializes an error object.
   * @param value - The value to serialize.
   * @returns The serialized error object.
   */

  private static serializeError(value: any) {
    if (value instanceof Error) {
      return {
        message: value.message,
        name: value.name,
        stack: value.stack?.split('\n').map((line) => line.trim())
      };
    }
    return value;
  }

  /**
   * Determines whether to skip logging based on the log level.
   * @param method - The method to check.
   * @returns True if logging should be skipped, false otherwise
   */

  private skipLog(method: keyof Console) {
    return !this.logLevels[method]?.includes(this.level);
  }
}
