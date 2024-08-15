import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  getRange(range: string): [number, number] | null {
    const regex = /bytes=(\d+)-(\d+)/;
    const result = range.match(regex);
    return result ? (result.slice(1, 3).map(Number) as [number, number]) : null;
  }
}
