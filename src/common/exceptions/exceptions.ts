import { HttpStatus, HttpException } from '@nestjs/common';

export class NotFound extends HttpException {
  constructor(message: string = 'User not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
export class BadRequest extends HttpException {
  constructor(message: string = 'User no created') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
