export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birth: string;
  address: string;
  address_two?: string;
  city: string;
  uf: string;
}
