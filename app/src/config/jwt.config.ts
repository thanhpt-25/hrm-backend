import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
    JWT_SECRET: process.env.JWT_SECRET,
}));
