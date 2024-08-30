import { useCallback } from 'react';
import { Language } from 'context/base/types';
import { useLanguage } from 'hooks';
import messages_mk from 'assets/messages_mk.json';
import messages_en from 'assets/messages_en.json';

const messages: Record<Language, Record<string, unknown>> = {
  [Language.EN]: messages_en,
  [Language.MK]: messages_mk,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDataByPath = (data: any, path: string, discriminator: string): string => {
  if (!path) {
    return data;
  }

  const paths = path.split(discriminator);

  for (const key of paths) {
    if (!data) {
      return path;
    }

    data = data[key];
  }

  return data;
};

const ROOT_PREFIX = 'strongauto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TranslationFunction = (key: string, params?: Record<string, any>) => string;

const useTranslation = (prefix = '', fallbackValue?: string, discriminator = '.'): TranslationFunction => {
  const { language } = useLanguage();
  const basePrefix = prefix.length == 0 ? ROOT_PREFIX : `${ROOT_PREFIX}.${prefix}`;

  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key, params) => {
      const path = key.startsWith(basePrefix) ? key : `${basePrefix}.${key}`;
      let message = getDataByPath(messages[language], path, discriminator);

      if (message && params) {
        const matches = message.match(/{{[a-zA-Z]*}}/g) ?? [];
        for (const match of matches) {
          const property = match.substring(2, match.length - 2);

          if (property in params) {
            message = message.replaceAll(match, params[property]);
          }
        }
      }

      return message ?? fallbackValue ?? path;
    },
    [basePrefix, discriminator, fallbackValue, language]
  );
};

export default useTranslation;
