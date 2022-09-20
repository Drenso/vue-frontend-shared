import Messages, {MessageObject} from 'messageformat/messages';

export type MissingTranslationKeyCallback = (key: string) => void;

/**
 * The actual translator
 */
export class Translator {

  private readonly messages: Messages;
  private readonly missingKeyCallback?: MissingTranslationKeyCallback;

  /**
   * Constructor
   */
  constructor(messages: MessageObject, missingKeyCallback?: MissingTranslationKeyCallback) {
    // We only use the default locale for now
    this.messages = new Messages({en: messages}, 'en');
    this.missingKeyCallback = missingKeyCallback;
  }

  /**
   * Creates the translated representation of the given key and it parameters.
   * Follows the ICU standard
   * @param key The translation key
   * @param params The translation params
   */
  public trans(key: string, params?: {}): string {
    if (!key) {
      return '';
    }

    const splittedKey = key.split('.');
    if (!this.messages.hasMessage(splittedKey)) {
      console.debug('Missing translation key', key);
      if (typeof this.missingKeyCallback === 'function') {
        this.missingKeyCallback(key);
      }

      return key;
    }

    return this.messages.get(splittedKey, params || {}) as string;
  }
}
