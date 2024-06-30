import IPlaylistService from '@/services/IPlaylistService';
import { Request, Response } from 'express';

export default class RecommendationController {
  constructor(private readonly playlistService: IPlaylistService) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    res.send(await this.playlistService.generatePlaylist());
  }
}
