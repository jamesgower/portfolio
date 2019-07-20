interface AboutMeState {
  name: string;
  email: string;
  details: string;
  emailSend: boolean;
  emailResponse: boolean;
  nameError: boolean;
  emailError: boolean;
  detailsError: boolean;
}

export { AboutMeState as default };
