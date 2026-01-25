export class RegexHelper {
    static readonly NumberRegexStr: string = "0-9";
    static readonly AlphabetRegexStr: string = "a-zA-Z";
    static readonly SpecialCharRegexStr: string = "~!@#$%^&*()\\[\\]\\{\\}\\-=_+<>?,\\.";

    static readonly NumberRegex: RegExp = new RegExp(`[${this.NumberRegexStr}]`);
    static readonly AlphabetRegex: RegExp = new RegExp(`[${this.AlphabetRegexStr}]`);
    static readonly SpecialCharRegex: RegExp = new RegExp(`[${this.SpecialCharRegexStr}]`);

    static readonly ValidNameRegex: RegExp = new RegExp(`[${this.NumberRegexStr}${this.AlphabetRegexStr}가-힣]+`);
    static readonly ValidEmailRegex: RegExp = new RegExp("^[a-z]{2,}[0-9]*@[a-z]{2,}\\.[a-z]{2,}$");
    static readonly ValidPasswordRegex: RegExp = new RegExp(`^[${this.AlphabetRegexStr}${this.NumberRegexStr}${this.SpecialCharRegexStr}]+$`);
}
