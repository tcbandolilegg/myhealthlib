import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailPRovider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
