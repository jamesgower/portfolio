import React, { useState, useMemo } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Container, FormGroup, Label, Input, FormText } from "reactstrap";
import { useForm } from "react-form";
import { AuthState, ProfileState } from "../../interfaces/app.i";
import InputField from "../containers/InputField";
import { AppState } from "src/store/store";

interface AccountProps {
  profile: ProfileState;
}

const Account: React.FC<AccountProps> = () => {
  const {
    profile: { firstName, lastName, email, image },
  } = useSelector((state: AppState): AuthState => state.letsWatch.auth);
  const defaultValues = useMemo(
    () => ({
      firstName,
      lastName,
      email,
      image,
    }),
    [],
  );
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const {
    Form,
    values,
    meta: { isSubmitting, isSubmitted, canSubmit, error },
  } = useForm({
    defaultValues,
    onSubmit: async (values) => {
      console.log(values);
    },
    debugForm: true,
  });

  return (
    <Container>
      <h3>Profile</h3>
      <Form>
        <FormGroup row>
          <Label for="firstName" sm={2}>
            First Name:
          </Label>
          <Col sm={4}>
            <InputField
              field="firstName"
              name="firstName"
              disabled={!editMode}
              placeholder="First name..."
            />
          </Col>
          <Label for="lastName" sm={2}>
            Last Name:
          </Label>
          <Col sm={4}>
            <InputField
              field="lastName"
              name="lastName"
              disabled={!editMode}
              placeholder="Last name..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="email" sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <InputField
              field="email"
              type="email"
              name="email"
              disabled={!editMode}
              placeholder="Email address..."
            />
          </Col>
        </FormGroup>
        {/* <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="file" id="fileUpload" />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input. It's a bit
            lighter and easily wraps to a new line.
          </FormText>
        </FormGroup> */}
        <Button
          outline
          color={editMode ? "primary" : "danger"}
          onClick={
            !editMode
              ? (): void => setEditMode(true)
              : async () => {
                  const formData = new FormData();
                  const currentFile = document.getElementById(
                    "fileUpload",
                  ) as HTMLInputElement;
                  formData.append("file", currentFile.files[0]);
                  const res = await axios.post("/api/upload", formData);
                  console.log(res);
                }
          }
        >
          {editMode ? "Save" : "Edit"}
        </Button>
      </Form>
    </Container>
  );
};

export default Account;
