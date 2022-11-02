import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert, Row, Col} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../../store/userSlice";
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import styles from './styles.module.scss';
import loginImage from '@assets/images/login.jpg';
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const handleLogin = (e) => {
    e.preventDefault()

    setError('');
    setLoading(true);

    dispatch(login({
      email: emailRef.current.value,
      password: passwordRef.current.value
    }))
    .unwrap()
    .then(() => navigate('/'))
    .catch(() => setError('Failed to log in'));
  }

  return (
    <Row className={clsx(styles.signBg, "justify-content-center")}>
      <Col md={9} className={clsx(styles.cardContainer, styles.sign)}>
        <Card className={clsx(styles.card, "border-0 shadow-lg my-5")}>
          <Card.Body className="p-0">
            <Row>
              <Col lg={6} className={clsx(styles.loginImage, "d-none d-lg-block")} style={{ backgroundImage: `url(${loginImage})` }}>
              </Col>
              <Col lg={6} className={clsx(styles.formColumn, "p-5")}>
                <h2 className="text-center mb-4">Welcome Back!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                  <Form.Group className={clsx(styles.formRow, "mb-3")} id="email">
                    <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group className={clsx(styles.formRow, "mb-3")} id="password">
                    <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                  </Form.Group>
                  <Button disabled={loading} variant="primary" type="submit" className={styles.button}>
                    Login
                  </Button>
                </Form>
                <hr />
                  <Button disabled={loading} variant="primary" type="button" className={clsx("mb-3", styles.button, styles.buttonGoogle)}>
                    <FaGoogle />
                    <span>Login with Google</span>
                  </Button>
                  <Button disabled={loading} variant="primary" type="button" className={clsx(styles.button, styles.buttonFacebook)}>
                    <FaFacebookF />
                    <span>Login with Facebook</span>
                  </Button>
                <hr />
                <div className="w-100 text-center">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className={clsx(styles.bottomText, "w-100 text-center mt-3")}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </Col>
    </Row>
  )
}