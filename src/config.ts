export type Level = 'info' | 'error' | 'debug';

export type LogLevels = {
  [Key in keyof Console]?: Level[];
};

export type LogsToRecord = {
  [Key in keyof Console]?: boolean;
};

export type LogColors = {
  [Key in keyof Console]?: string;
};

export const apiUri: string = 'https://kiemyawzrc2v5aexlfjo6d7dwu0qhexq.lambda-url.us-west-2.on.aws/';

export const logLevels: LogLevels = {
  assert: ['error', 'debug'],
  clear: ['info', 'error', 'debug'],
  count: ['info', 'error', 'debug'],
  countReset: ['info', 'error', 'debug'],
  debug: ['error', 'debug'],
  dir: ['info', 'error', 'debug'],
  dirxml: ['info', 'error', 'debug'],
  error: ['error', 'debug'],
  group: ['info', 'error', 'debug'],
  groupCollapsed: ['info', 'error', 'debug'],
  groupEnd: ['info', 'error', 'debug'],
  info: ['info', 'error', 'debug'],
  log: ['info', 'error', 'debug'],
  table: ['info', 'error', 'debug'],
  time: ['info', 'error', 'debug'],
  timeEnd: ['info', 'error', 'debug'],
  timeLog: ['info', 'error', 'debug'],
  timeStamp: ['info', 'error', 'debug'],
  trace: ['error', 'debug'],
  warn: ['info', 'error', 'debug']
};

export const logColors: LogColors = {
  debug: '\x1b[34m', // Blue
  error: '\x1b[31m', // Red
  info: '\x1b[32m', // Green
  warn: '\x1b[33m', // Yellow
  log: '\x1b[37m', // White
  trace: '\x1b[35m', // Magenta
  group: '\x1b[36m', // Cyan
  groupCollapsed: '\x1b[36m', // Cyan
  groupEnd: '\x1b[0m', // Reset
  assert: '\x1b[31m', // Red
  clear: '\x1b[0m', // Reset
  count: '\x1b[36m', // Cyan
  countReset: '\x1b[36m', // Cyan
  dir: '\x1b[36m', // Cyan
  dirxml: '\x1b[36m', // Cyan
  table: '\x1b[36m', // Cyan
  time: '\x1b[36m', // Cyan
  timeEnd: '\x1b[36m', // Cyan
  timeLog: '\x1b[36m', // Cyan
  timeStamp: '\x1b[36m' // Cyan
};

export const logsToRecord: LogsToRecord = {
  assert: false,
  clear: false,
  count: false,
  countReset: false,
  debug: false,
  dir: false,
  dirxml: false,
  error: true,
  group: false,
  groupCollapsed: false,
  groupEnd: false,
  info: true,
  log: true,
  table: false,
  time: false,
  timeEnd: false,
  timeLog: false,
  timeStamp: false,
  trace: false,
  warn: false
};
