import { PayloadType } from './payload.interface';

export interface CustomRequest extends Request {
  user?: PayloadType;
}
