import * as loginController from './loginController';
import * as loginValidator from './loginValidation';

export const loginHandler = {
    ...loginController,
    ...loginValidator,
};