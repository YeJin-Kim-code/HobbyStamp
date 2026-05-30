import app from './app';
import { AppDataSource } from './config/data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('DB Connected');

    app.listen(3000, () => {
      console.log('Server Running');
    });
  })
  .catch((error) => {
    console.error(error);
  });