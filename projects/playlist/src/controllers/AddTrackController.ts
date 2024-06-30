import Track from '@/entities/Track';
import ITrackRepository from '@/repository/ITrackRepository';
import { Request, Response } from 'express';

export default class AddTrackController {
  constructor(private trackRepository: ITrackRepository) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    const { trackSource } = req.body;
    const added = await this.trackRepository.add(Track.create(trackSource));

    if (added) {
      res.status(201).send('Track added successfully');
    } else {
      res.status(400).send('Invalid track source');
    }
  }
}
