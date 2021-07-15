import { registerAs } from '@nestjs/config'

export default registerAs('throttle', () => ({
    THROTTLE_TTL: process.env.THROTTLE_TTL,
    THROTTLE_LIMIT:process.env.THROTTLE_LIMIT
}));
