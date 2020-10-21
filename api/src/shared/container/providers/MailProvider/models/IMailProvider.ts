export default interface IMailPRovider {
  sendMail(to: string, body: string): Promise<void>;
}
