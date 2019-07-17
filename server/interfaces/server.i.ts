import { Request } from "express";

interface EmailRequest extends Request {
  query: Query;
}

interface Query {
  name: string;
  email: string;
  details: string;
}

interface SendResponse {
  sendFile: (file) => void;
}

export { EmailRequest, SendResponse };
