/* eslint-disable import/no-anonymous-default-export */
import AuthForm from "components/AuthForm";
import { authService, googleProvider, githubProvider, signInWithPopup } from "firebase";

const Auth = () => {
    const onSocialClick = async (event) => {
        const { target: { name } } = event;

        let provider;
        if (name === "google") {
            provider = googleProvider;
        } else if (name === "github") {
            provider = githubProvider;
        }
        await signInWithPopup(authService, provider);
    }

    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}
export default Auth;