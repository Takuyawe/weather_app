import {
  Button,
  Input,
  CloseButton,
  PasswordInput,
  TextInput,
  createTheme,
  MantineThemeProvider,
} from "@mantine/core";
import { useState } from "react";
import { fetchFavorites, handleSignIn } from "../../utils";
import { userStore } from "@/app/_stores/userStore";
import {
  emailValidationSchema,
  passwordValidationSchema,
} from "@/app/_validations/indext";

// const theme = createTheme({
//   components: {
//     Input: Input.extend({
//       classNames: {
//         input: "margin: 0rem",
//       },
//     }),
//   },
// });

type Props = {
  close: () => void;
};

const AuthenticationBox = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleSubmitButton = async () => {
    const data = await handleSignIn(email, password);
    if (!data.error) {
      userStore.getState().setUser(data.user);
      userStore.getState().setIsSignedIn(true);
      const favorites = await fetchFavorites(data.user.email);
      userStore.getState().setFavorites(favorites);
      props.close();
    }
  };

  const handleEmailInputBlur = () => {
    const valResult = emailValidationSchema.safeParse(email);
    setIsEmailValid(valResult.success);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
    const valResult = passwordValidationSchema.safeParse(password);
    setIsPasswordValid(valResult.success);
  };

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center my-4">
      <Input.Wrapper className="text-gray-500" label="メールアドレス">
        <TextInput
          className="w-80"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailInputBlur}
          error={
            isEmailValid ? false : "正しいメールアドレスを入力してください"
          }
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setEmail("")}
              style={{ display: email ? undefined : "none" }}
            />
          }
        />
      </Input.Wrapper>
      <Input.Wrapper className="text-gray-500" label="パスワード">
        <PasswordInput
          className="w-80"
          placeholder="Your Password"
          value={password}
          onChange={handleChangePassword}
          error={
            isPasswordValid
              ? false
              : "8文字以上のパスワードを入力してください"
          }
        />
      </Input.Wrapper>
      <Button
        onClick={handleSubmitButton}
        className="h-8 w-80 bg-blue-500 hover:bg-blue-400 text-xs px-2"
      >
        サインイン
      </Button>
    </div>
  );
};

export default AuthenticationBox;
