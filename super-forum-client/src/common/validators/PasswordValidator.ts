export interface PasswordTestResult {
    message: string;
    isValid: boolean;
}

export const isPasswordValid = (password: string): PasswordTestResult => {
    const passwordTestResult: PasswordTestResult = {
        message: "",
        isValid: true,
    }
    if (password.length < 8) {
        passwordTestResult.message = "Password must be at least 8 characters";
        passwordTestResult.isValid = false;
        return passwordTestResult;
    }

    // 每一个括号都是一个前瞻断言，匹配零个或多个字符后存在后面方括号的字符集。
    const strongPassword = new RegExp(
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
		);
    if (!strongPassword.test(password)) {
        passwordTestResult.message = "Password must contain at least 1 special character, 1 cap letter, and 1 number";
        passwordTestResult.isValid = false;
        return passwordTestResult;
    }

    return passwordTestResult;
}