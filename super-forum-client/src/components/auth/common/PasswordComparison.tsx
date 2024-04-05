import React, { FC } from "react"
import { allowSubmit } from "./Helpers";
import { isPasswordValid, PasswordTestResult } from "../../../common/validators/PasswordValidator";

interface PasswordComparisonProps {
    dispatch: React.Dispatch<any>;
    password: string;
    passwordConfirm: string;
}

const PasswordComparison: FC<PasswordComparisonProps> = ({
    dispatch,
    password,
    passwordConfirm,
}) => {
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "password"})
        const passwordCheck: PasswordTestResult = isPasswordValid(e.target.value);

        if (!passwordCheck.isValid) {
            allowSubmit(dispatch, passwordCheck.message, true);
            return;
        } else {
            passwordsSame(passwordConfirm, e.target.value);
        }
    }

    // 每一个输入框的动作，都会触及父级状态的更改，并且做出相应的反应。
    const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "passwordConfirm"})
        passwordsSame(password, e.target.value);
    }

    const passwordsSame = (passwordVal: string, passwordConfirmVal: string) => {
        if (passwordVal !== passwordConfirmVal) {
            allowSubmit(dispatch, "Passwords do not match", true); // 函数内部封装了对store的操作
            return false;
        } else {
            allowSubmit(dispatch, "", false);
            return true;
        }
    }

    return (
        <React.Fragment>
            <div>
                <label htmlFor="">password</label>
                <input type="password" placeholder="Password" value={password} onChange={onChangePassword} />
            </div>
            <div>
                <label htmlFor="">password confirmation</label>
                <input type="password" placeholder="Password Confirmation" value={passwordConfirm} onChange={onChangePasswordConfirm} />
            </div>
        </React.Fragment>
    )
}

export default PasswordComparison;