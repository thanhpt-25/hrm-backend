import { registerAs } from '@nestjs/config'
import * as Joi from '@hapi/joi';

export default registerAs('postgres', () => ({
    POSTGRES_DB_HOST: process.env.POSTGRES_DB_HOST,
    POSTGRES_DB_PORT: process.env.POSTGRES_DB_PORT,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB_SCHEMA: process.env.POSTGRES_DB_PREFIX + '_' + process.env.POSTGRES_DB_NAME,
    validationSchema: Joi.object({
        POSTGRES_DB_HOST: Joi.string().required(),
        POSTGRES_DB_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB_PREFIX: Joi.string().required(),
        POSTGRES_DB_NAME: Joi.string().required(),
    })
}));
