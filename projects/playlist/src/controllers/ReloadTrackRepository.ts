import ITrackRepository from '@/repository/ITrackRepository';
import { Request, Response } from 'express';

export default class ReloadTrackRepository {
  constructor(private readonly trackRepository: ITrackRepository) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    await this.trackRepository.reload();
    res.send();
  }
}
