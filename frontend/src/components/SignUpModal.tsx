import { useForm } from "react-hook-form";
import { User } from "../model/user";
import { SignUpCredentials } from "../network/note_api";
import * as NotesApi from "../network/note_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "../form/textInputField";
//import styleUtils from "../style/utils.module.css";
import React, { useState } from "react";
import { conflictError } from "../errors/http_errors";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credential: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credential);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof conflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            style={{ width: "100%" }}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
