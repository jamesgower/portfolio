export interface FormState {
  name: string;
  email: string;
  details: string;
  emailSend: boolean;
  emailResponse: boolean;
  nameError: boolean;
  emailError: boolean;
  detailsError: boolean;
  sentError: boolean;
}
