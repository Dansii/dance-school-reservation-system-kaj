import {Box, Flex} from "@semcore/ui/flex-box";
import {Text} from "@semcore/ui/typography";
import Input from "@semcore/ui/input";
import Button from "@semcore/ui/button";
import React from "react";
import Card from "@semcore/ui/card";
import Link from "@semcore/ui/Link";
import {Link as LinkRouter} from "react-router-dom";
import {useStore} from "effector-react";
import {$email, $hasError, $password, changeEmail, changePassword, signUp, signUpFx} from "./store";
import UserM from '@semcore/ui/icon/User/m'
import KeyM from '@semcore/icon/Key/m'
import {CredentialsWarning} from "../../shared/credentials-warning";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import ReactPlayer from "react-player";

const StyledButton = styled(Button)`
  transition: 0.5s;

: hover {
  transform: perspective(500px) translateZ(10px) ;
  //-ms-transform: rotate(5deg); /* IE 9 */
  //transform: rotate(5deg);
  padding-right: 24px;
  padding-left:8px;
};
`

export const SignUpForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const email = useStore($email)
    const password = useStore($password)
    const hasError = useStore($hasError)
    const isPending = useStore(signUpFx.pending)


    return (
        <Flex
            direction={"column"}
            justifyContent="center"
            alignItems="center"
            h="100vh"
        >
            <Box
                tag={Card}
                w={350}
            >
                <Text>
                    Email
                </Text>
                <Input
                    mt={2}
                    mb={4}
                    size="l"
                    state="normal"
                >
                    <Input.Addon>
                        <UserM />
                    </Input.Addon>
                    <Input.Value
                        {...register("email", {
                                required: 'required field',
                                pattern : {
                                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                                    message: "incorrect address"
                                }
                            }
                        )}
                        placeholder={'email'}
                        autoFocus={true}
                        value={email}
                        onChange={changeEmail}
                    />
                </Input>
                <Text>
                    Password
                </Text>
                <Input
                    mt={2}
                    mb={4}
                    size="l"
                    state="normal"
                >
                    <Input.Addon>
                        <KeyM />
                    </Input.Addon>
                    <Input.Value
                        {...register("password", {
                            required: 'required field',
                            pattern : {
                                value : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{1,}$/,
                                message :
                                    "must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n"
                            },
                            minLength : {
                                value : 8,
                                message: "at least 8 characters"
                            }
                        })
                        }
                        placeholder={'password'}
                        value={password}
                        onChange={changePassword}
                        type="password"
                    />
                </Input>
                <StyledButton
                    w='100%'
                    size="l"
                    theme="warning"
                    use="primary"
                    loading={isPending}
                    onClick={handleSubmit(signUp)}
                >
                    <Text fontWeight={700}>
                        SIGN UP
                    </Text>
                </StyledButton>
                <Text
                    tag={'p'}
                    mt={2}
                >
                    Already have an account?{' '}
                    <Link
                        color={'#ff7f00'}
                        tag={LinkRouter}
                        to={'/sign-in'}
                    >
                        Sign in
                    </Link>
                </Text>
                <CredentialsWarning isVisible={hasError}>
                    User with this email already exists.
                </CredentialsWarning>
                <CredentialsWarning isVisible={Object.keys(errors).length !== 0}>
                    {
                        Object.keys(errors).map((wrongField) => (
                            <p key={wrongField}>{wrongField}: {errors[wrongField].message}</p>
                        ))
                    }
                </CredentialsWarning>
            </Box>
            <Box w={350} mt={10}>
                <ReactPlayer
                    url={"http://codeskulptor-demos.commondatastorage.googleapis.com/descent/Zombie.mp3"}
                    width="100%"
                    height="50px"
                    playing={false}
                    controls={true}
                />
            </Box>
        </Flex>
    );
}