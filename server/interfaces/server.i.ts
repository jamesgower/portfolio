import { Response } from "express";

interface EmailRequest extends Response {
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
