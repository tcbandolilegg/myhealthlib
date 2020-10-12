export default interface ICreateConsultationDTO {
  user_id: string;
  doctor: string;
  specialty: string;
  description: string;
  date: Date;
}
