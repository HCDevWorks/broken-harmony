import { Request, Response } from 'express';

export default class AddTrackController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(req: Request, res: Response) {
    res.send('Adding new track to the playlist');
  }
}
