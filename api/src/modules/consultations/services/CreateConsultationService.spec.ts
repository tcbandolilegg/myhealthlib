import FakeConsultationsRepository from '../repositories/fakes/FakeConsultationsRepository';
import CreateConsultationService from './CreateConsultationService';

describe('CreateConsultation', () => {
  it('should be able to create a new consultation', async () => {
    const fakeConsultationsRepository = new FakeConsultationsRepository();
    const createConsultation = new CreateConsultationService(
      fakeConsultationsRepository,
    );

    const consultation = await createConsultation.execute({
      user_id: '123456987asdf',
      doctor: 'Jhon Doe',
      specialty: 'Medical',
      description: 'Any description',
      date: new Date(),
    });

    expect(consultation).toHaveProperty('id');
    expect(consultation.user_id).toBe('123456987asdf');
  });
});
