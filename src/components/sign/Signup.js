import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert, Row, Col} from 'react-bootstrap'
import clsx from 'clsx';
import styles from './styles.module.scss';
import signupImage from '@assets/images/signup.jpg';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { signup } from '@store/userSlice';

export default function Signup() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  // const roleRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    setError('');
    setLoading(true);

    dispatch(signup({
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }))
    .unwrap()
    .then(() => navigate('/'))
    .catch((e) => {
      console.log(e);
      setError('Failed to create an account');
      setLoading(false);
    });
  }

  return (
    <Row className={clsx(styles.signBg, "justify-content-center")}>
      <Col md={9} className={clsx(styles.cardContainer, styles.sign)}>
        <Card className={clsx(styles.card, "border-0 shadow-lg my-5")}>
          <Card.Body className="p-0">
            <Row>
                <Col lg={6} className={clsx(styles.loginImage, "d-none d-lg-block")} style={{ backgroundImage: `url(${signupImage})` }}>
                </Col>
                <Col lg={6} className={clsx(styles.formColumn, "p-5")}>
                  <h2 className="text-center mb-4">Sign Up</h2>
                  
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                  <Form.Group className={clsx(styles.formRow, "mb-3")} id="name">
                      <Form.Control type="text" placeholder="Enter name" ref={nameRef} required />
                    </Form.Group>
                    <Form.Group className={clsx(styles.formRow, "mb-3")} id="email">
                      <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group className={clsx(styles.formRow, "mb-3")} id="password">
                      <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group className={clsx(styles.formRow, "mb-3")} id="password-confirm">
                      <Form.Control type="password" placeholder="Repeat Password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" id="role">
                      <Form.Label>Role</Form.Label>
                      <Form.Select ref={roleRef}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </Form.Select>
                    </Form.Group> */}
                    <Button disabled={loading} variant="primary" type="submit" className={styles.button}>
                      Create account
                    </Button>
                  </Form>
                  <hr />
                  <Button disabled={loading} variant="primary" type="button" className={clsx("mb-3", styles.button, styles.buttonGoogle)}>
                    <FaGoogle />
                    <span>Register with Google</span>
                  </Button>
                  <Button disabled={loading} variant="primary" type="button" className={clsx(styles.button, styles.buttonFacebook)}>
                    <FaFacebookF />
                    <span>Register with Facebook</span>
                  </Button>
                </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className={clsx(styles.bottomText, "w-100 text-center mt-3")}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </Col>
    </Row>
  )
}