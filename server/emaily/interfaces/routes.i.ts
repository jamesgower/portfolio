import { Request } from "express";

export interface MatchProps {
  surveyId?: string;
  choice?: string;
}

export interface SurveyMatch {
  email: string;
  surveyId: string;
  choice: string;
}

export interface AuthRequest extends Request {
  logout: () => void;
  user: any;
}
