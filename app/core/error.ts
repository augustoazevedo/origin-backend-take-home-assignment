export class DefaultError extends Error {
  code: string;

  source: string;

  userHelp?: string;

  developerMessage?: string;

  moreInfo?: string;

  statusCode: number;

  constructor(code: string, message: string, statusCode: number, userHelp?: string, developerMessage?: string, moreInfo?: string) {
    super(message);
    this.code = code;
    this.source = (this.stack as string).split('\n')[1].replace('at', '').trim();
    this.userHelp = userHelp || '';
    this.developerMessage = developerMessage || '';
    this.moreInfo = moreInfo || '';
    this.statusCode = statusCode;
  }

  public toJSON(): ErrorInterface {
    const erroJSON: ErrorInterface = {
      code: this.code,
      source: this.source,
      message: this.message,
    };
    if (this.userHelp) {
      erroJSON.userHelp = this.userHelp;
    }
    if (this.developerMessage) {
      erroJSON.developerMessage = this.developerMessage;
    }
    if (this.moreInfo) {
      erroJSON.moreInfo = this.moreInfo;
    }
    return erroJSON;
  }

  StringFormat = (str: string, ...args: string[]): string => str.replace(/{(\d+)}/g, (match, index) => args[index] || '');

  public formatMessage(...args: string[]): DefaultError {
    this.message = this.StringFormat(this.message as string, ...args);
    return this;
  }

  public formatUserHelp(...args: string[]): DefaultError {
    this.userHelp = this.StringFormat(this.userHelp as string, ...args);
    return this;
  }

  public formatDeveloperMessage(...args: string[]): DefaultError {
    this.developerMessage = this.StringFormat(this.developerMessage as string, ...args);
    return this;
  }

  public formatMoreInfo(...args: string[]): DefaultError {
    this.moreInfo = this.StringFormat(this.moreInfo as string, ...args);
    return this;
  }
}

export interface ErrorResponseInterface {
  errors: ErrorInterface[];
}

export interface ErrorInterface {
  code: string;
  source: string;
  message: string;
  userHelp?: string;
  developerMessage?: string;
  moreInfo?: string;
}

export enum ErrorTypes {
  TYPE_BUSINESS_ERROR = 'BusinessError',
}
