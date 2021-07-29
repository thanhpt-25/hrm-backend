import { registerAs } from '@nestjs/config'

export default registerAs('i18n', () => ({
    DEFAULT_LANG: process.env.DEFAULT_LANG,
}));
