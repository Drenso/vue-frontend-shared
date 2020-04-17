// Note: this is not generated! Required for correct autocomplete in the I18NService.
// Has been submitted to the github repository as well: https://github.com/messageformat/messageformat/issues/255
// Can be removed once we update to v3

declare module 'messageformat/messages' {
  /**
   * @classdesc Accessor for compiled MessageFormat functions
   *
   * ```
   * import Messages from 'messageformat/messages'
   * ```
   *
   * @class
   * @param {object} locales A map of locale codes to their function objects
   * @param {string|null} [defaultLocale] If not defined, default and initial locale is the first entry of `locales`
   *
   * @example
   * var fs = require('fs');
   * var MessageFormat = require('messageformat');
   * var mf = new MessageFormat(['en', 'fi']);
   * var msgSet = {
   *   en: {
   *     a: 'A {TYPE} example.',
   *     b: 'This has {COUNT, plural, one{one user} other{# users}}.',
   *     c: {
   *       d: 'We have {P, number, percent} code coverage.'
   *     }
   *   },
   *   fi: {
   *     b: 'Tällä on {COUNT, plural, one{yksi käyttäjä} other{# käyttäjää}}.',
   *     e: 'Minä puhun vain suomea.'
   *   }
   * };
   * var cfStr = mf.compile(msgSet).toString('module.exports');
   * fs.writeFileSync('messages.js', cfStr);
   *
   * ...
   *
   * var Messages = require('messageformat/messages');
   * var msgData = require('./messages');
   * var messages = new Messages(msgData, 'en');
   *
   * messages.hasMessage('a')                // true
   * messages.hasObject('c')                 // true
   * messages.get('b', { COUNT: 3 })         // 'This has 3 users.'
   * messages.get(['c', 'd'], { P: 0.314 })  // 'We have 31% code coverage.'
   *
   * messages.get('e')                       // 'e'
   * messages.setFallback('en', ['foo', 'fi'])
   * messages.get('e')                       // 'Minä puhun vain suomea.'
   *
   * messages.locale = 'fi'
   * messages.hasMessage('a')                // false
   * messages.hasMessage('a', 'en')          // true
   * messages.hasMessage('a', null, true)    // true
   * messages.hasObject('c')                 // false
   * messages.get('b', { COUNT: 3 })         // 'Tällä on 3 käyttäjää.'
   * messages.get('c').d({ P: 0.628 })       // 'We have 63% code coverage.'
   */
  class Messages {

    /**
     * List of available locales
     * @readonly
     * @memberof Messages
     * @member {string[]} availableLocales
     */
    public availableLocales: string[];

    /**
     * Current locale
     *
     * One of Messages#availableLocales or `null`. Partial matches of language tags
     * are supported, so e.g. with an `en` locale defined, it will be selected by
     * `messages.locale = 'en-US'` and vice versa.
     *
     * @memberof Messages
     * @member {string|null} locale
     */
    public locale: string | null;

    /**
     * Default fallback locale
     *
     * One of Messages#availableLocales or `null`. Partial matches of language tags
     * are supported, so e.g. with an `en` locale defined, it will be selected by
     * `messages.defaultLocale = 'en-US'` and vice versa.
     *
     * @memberof Messages
     * @member {string|null} defaultLocale
     */
    public defaultLocale: string | null;

    constructor(locales: MessageData, defaultLocale: string);

    /**
     * Add new messages to the accessor; useful if loading data dynamically
     *
     * The locale code `lc` should be an exact match for the locale being updated,
     * or empty to default to the current locale. Use {@link #resolveLocale} for
     * resolving partial locale strings.
     *
     * If `keypath` is empty, adds or sets the complete message object for the
     * corresponding locale. If any keys in `keypath` do not exist, a new object
     * will be created at that key.
     *
     * @param {function|object} data Hierarchical map of keys to functions, or a
     *   single message function
     * @param {string} [lc] If empty or undefined, defaults to `this.locale`
     * @param {string[]} [keypath] The keypath being added
     * @returns {Messages} The Messages instance, to allow for chaining
     */
    public addMessages(data: object, lc?: string, keypath?: string[]): Messages;

    /**
     * Resolve `lc` to the key of an available locale or `null`, allowing for
     * partial matches. For example, with an `en` locale defined, it will be
     * selected by `messages.defaultLocale = 'en-US'` and vice versa.
     *
     * @param {string} lc Locale code
     * @returns {string|null}
     */
    public resolveLocale(lc: string): string | null;

    /**
     * Get the list of fallback locales
     * @param {string} [lc] If empty or undefined, defaults to `this.locale`
     * @returns {string[]}
     */
    public getFallback(lc?: string): string[];

    /**
     * Set the fallback locale or locales for `lc`
     *
     * To disable fallback for the locale, use `setFallback(lc, [])`.
     * To use the default fallback, use `setFallback(lc, null)`.
     *
     * @param {string} lc
     * @param {string[]|null} fallback
     * @returns {Messages} The Messages instance, to allow for chaining
     */
    public setFallback(lc: string, fallback: string[] | null): Messages;

    /**
     * Check if `key` is a message function for the locale
     *
     * `key` may be a `string` for functions at the root level, or `string[]` for
     * accessing hierarchical objects. If an exact match is not found and `fallback`
     * is true, the fallback locales are checked for the first match.
     *
     * @param {string|string[]} key The key or keypath being sought
     * @param {string} [lc] If empty or undefined, defaults to `this.locale`
     * @param {boolean} [fallback=false] If true, also checks fallback locales
     * @returns {boolean}
     */
    public hasMessage(key: string | string[], lc?: string, fallback?: boolean): boolean;

    /**
     * Check if `key` is a message object for the locale
     *
     * `key` may be a `string` for functions at the root level, or `string[]` for
     * accessing hierarchical objects. If an exact match is not found and `fallback`
     * is true, the fallback locales are checked for the first match.
     *
     * @param {string|string[]} key The key or keypath being sought
     * @param {string} [lc] If empty or undefined, defaults to `this.locale`
     * @param {boolean} [fallback=false] If true, also checks fallback locales
     * @returns {boolean}
     */
    public hasObject(key: string | string[], lc?: string, fallback?: boolean): boolean;

    /**
     * Get the message or object corresponding to `key`
     *
     * `key` may be a `string` for functions at the root level, or `string[]` for
     * accessing hierarchical objects. If an exact match is not found, the fallback
     * locales are checked for the first match.
     *
     * If `key` maps to a message function, it will be called with `props`. If it
     * maps to an object, the object is returned directly.
     *
     * @param {string|string[]} key The key or keypath being sought
     * @param {object} [props] Optional properties passed to the function
     * @param {string} [lc] If empty or undefined, defaults to `this.locale`
     * @returns {string|Object<string,function|object>}
     */
    public get(key: string | string[], props?: object, lc?: string): string | object;
  }

  export interface MessageData {
    [locale: string]: MessageObject;
  }

  export interface MessageObject {
    [key: string]: (props: object) => string;
  }

  export default Messages;
}
