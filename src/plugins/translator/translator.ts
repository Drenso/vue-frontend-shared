import Messages, {MessageObject} from 'messageformat/messages';

export type MissingTranslationKeyCallback = (key: string) => void;

/** The actual translator */
export class Translator {

  private messages!: Messages;
  private readonly missingKeyCallback?: MissingTranslationKeyCallback;

  constructor(messages: MessageObject, missingKeyCallback?: MissingTranslationKeyCallback) {
    this.missingKeyCallback = missingKeyCallback;
    this.setMessages(messages);
  }

  /**
   * Sets the messages object. We only use the default locale (en) at this time.
   * @param messages The new translation messages
   */
  public setMessages(messages: MessageObject): void {
    this.messages = new Messages({en: messages}, 'en');
  }

  /**
   * Creates the translated representation of the given key and its parameters.
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
