import { Request } from "express";

interface EmailRequest extends Request {
  query: Query;
}

interface Query {
  name: string;
  email: string;
  details: string;
}

interface SendFileResponse {
  sendFile: (file) => void;
}

interface SendResponse {
  success: boolean;
  info?: object;
}

export { EmailRequest, SendResponse, SendFileResponse };
