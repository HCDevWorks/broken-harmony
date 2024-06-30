import ITrackRepository from '@/repository/ITrackRepository';
import { Request, Response } from 'express';

export default class RecommendationController {
  constructor(private readonly trackRepository: ITrackRepository) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    res.send(await this.trackRepository.get());
  }
}
