/**
 * format price by locale
 *
 * @param price
 * @param currency
 * @param locale
 * @returns {string}
 */
export default function (price, currency, locale) {
    return price.toLocaleString(locale) + ' ' + currency;
}