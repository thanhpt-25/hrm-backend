import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
    jwtSecret: process.env.JWT_SECRET,
}));
