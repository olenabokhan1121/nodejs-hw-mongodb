import { isHttpError } from 'http-errors';
export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err) === true) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
  }
  res
    .status(500) /*це НТТР статус відповіді*/
    .json({
      status: 500 /*це дані в тілі відповіді для зручності*/,
      message: 'Something went wrong',
      data: err.message,
      // конкретне повідомлення про помилку, отримане з об'єкта помилки
    });
};
