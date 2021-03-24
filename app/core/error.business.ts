import { DefaultError, ErrorTypes } from './error';

export class BusinessError extends DefaultError {
  constructor(code: string, message: string, userHelp?: string, developerMessage?: string, moreInfo?: string) {
    const statusCode = 417;
    super(code, message, statusCode, userHelp, developerMessage, moreInfo);
    this.name = ErrorTypes.TYPE_BUSINESS_ERROR;
  }
}
