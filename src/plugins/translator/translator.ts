import Messages, {MessageObject} from 'messageformat/messages';

/**
 * The actual translator
 */
export class Translator {

  /**
   * The messages
   */
  private messages: Messages;

  /**
   * Constructor
   */
  constructor(messages: MessageObject) {
    // We only use the default locale for now
    this.messages = new Messages({en: messages}, 'en');
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
      return key;
    }

    return this.messages.get(splittedKey, params || {}) as string;
  }
}
