export class RegexHelper {
    static NumberRegexStr = "0-9";
    static AlphabetRegexStr = "a-zA-Z";
    static SpecialCharRegexStr = "~!@#$%^&*()\\[\\]\\{\\}\\-=_+<>?,\\.";
    static NumberRegex = new RegExp(`[${this.NumberRegexStr}]`);
    static AlphabetRegex = new RegExp(`[${this.AlphabetRegexStr}]`);
    static SpecialCharRegex = new RegExp(`[${this.SpecialCharRegexStr}]`);
    static ValidNameRegex = new RegExp(`[${this.NumberRegexStr}${this.AlphabetRegexStr}가-힣]+`);
    static ValidEmailRegex = new RegExp("^[a-z]{2,}[0-9]*@[a-z]{2,}.[a-z]{2,}$");
    static ValidPasswordRegex = new RegExp(`^[${this.AlphabetRegexStr}${this.NumberRegexStr}${this.SpecialCharRegexStr}]+$`);
}
