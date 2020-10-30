import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailPRovider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailPRovider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
