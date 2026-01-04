export class RegexHelper {
    static NumberRegexStr = "0-9";
    static AlphabetRegexStr = "a-zA-Z";
    static SpecialCharRegexStr = "~!@#$%^&*()[]{}-=_+<>?.";
    static NameRegexStr = "a-zA-Z가-힣0-9";
    static NumberRegex = new RegExp(`[${this.NumberRegexStr}]`);
    static AlphabetRegex = new RegExp(`[${this.AlphabetRegexStr}]`);
    static SpecialCharRegex = new RegExp(`[${this.SpecialCharRegexStr}]`);
    static ValidNameRegex = new RegExp(`^[${this.NameRegexStr}]+&`);
    static ValidEmailRegex = new RegExp("^[a-z]{2,}[0-9]*@[a-z]{2,}.[a-z]{2,}$");
    static InvalidPasswordRegex = new RegExp(`[^${this.NumberRegexStr}${this.AlphabetRegexStr}${this.SpecialCharRegexStr}]`);
}
