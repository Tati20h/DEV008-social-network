import { signIn, signInGoogle } from '../firebase/firebase.js';

export const Login = () => {
  // creando el elemento div que contiene todo el registro
  const loginDiv = document.createElement('div');
  loginDiv.className = 'container';

  // lado izquierdo (ilustracion en este caso)
  const loginUpLeftDiv = document.createElement('section');
  loginUpLeftDiv.className = 'transition-div';

  const loginLeftDivHeader = document.createElement('div');
  loginLeftDivHeader.className = 'transition-header';

  const logo = document.createElement('img');
  logo.src = 'img/Logo.png';
  logo.className = 'Logo';
  logo.alt = 'vertical-logo';

  const brandDescription = document.createElement('p');
  brandDescription.innerText = 'Warmi es la primera red social para mujeres latinas que viven fuera de sus paises de origen';
  brandDescription.className = 'warmi-summary';

  const subTitle = document.createElement('h2');
  subTitle.innerText = '¿Nueva en Warmi?';
  subTitle.className = 'smaller-subtitle';

  const transparentBtn = document.createElement('button');
  transparentBtn.innerHTML = 'registrate';
  transparentBtn.className = 'btn transparent';

  const illustrationContainer = document.createElement('div');
  illustrationContainer.className = 'illustration-container';

  const illustration = document.createElement('img');
  illustration.src = 'img/illustration-homepage.png';
  illustration.className = 'illustration';
  illustration.alt = 'girls-illustration';

  // lado derecho (formulario en este caso)
  const loginUpRightDiv = document.createElement('section');
  loginUpRightDiv.className = 'forms-container';

  const formContainer = document.createElement('div');
  formContainer.className = 'signin';

  const formSignIn = document.createElement('form');
  formSignIn.className = 'sign-in-form';
  formSignIn.action = '#';

  const title = document.createElement('h2');
  title.innerText = 'Bienvenida!';
  title.className = 'title';

  const formSubTitle = document.createElement('h3');
  formSubTitle.innerText = 'Inicia sesión con tu usuario registrado';
  formSubTitle.className = 'subtitle';

  const inputFieldEmail = document.createElement('div');
  inputFieldEmail.className = 'input-field';

  const iconEmail = document.createElement('i');
  iconEmail.className = 'fas fa-envelope';

  const email = document.createElement('input');
  email.type = 'email';
  email.className = 'mail-register';
  email.placeholder = 'Ingresa tu email';
  email.name = 'Mail';
  email.required = true;

  inputFieldEmail.appendChild(iconEmail);
  inputFieldEmail.appendChild(email);

  const inputFieldPss1 = document.createElement('div');
  inputFieldPss1.className = 'input-field';

  const iconPassword1 = document.createElement('i');
  iconPassword1.className = 'fas fa-lock';

  const password1 = document.createElement('input');
  password1.type = 'password';
  password1.className = 'password-register';
  password1.placeholder = 'Ingresa tu contraseña';
  password1.name = 'Password';
  password1.required = true;

  inputFieldPss1.appendChild(iconPassword1);
  inputFieldPss1.appendChild(password1);

  const btnContainer = document.createElement('section');
  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn';
  submitBtn.value = 'Iniciar sesión';

  const recoverPasswordLink = document.createElement('a');
  recoverPasswordLink.className = 'link';
  recoverPasswordLink.innerHTML = '¿Olvidaste tu contraseña?';

  btnContainer.appendChild(submitBtn);
  btnContainer.appendChild(recoverPasswordLink);

  const socialText = document.createElement('p');
  socialText.className = 'social-text';
  socialText.textContent = 'ingresa con:';

  const socialMediaDiv = document.createElement('div');
  socialMediaDiv.className = 'social-media';

  const googleLink = document.createElement('a');
  googleLink.href = '#';
  googleLink.className = 'social-icon';
  const googleIcon = document.createElement('i');
  googleIcon.className = 'fab fa-google';
  googleLink.appendChild(googleIcon);

  // const appleLink = document.createElement('a');
  // appleLink.href = '#';
  // appleLink.className = 'social-icon';
  // const appleIcon = document.createElement('i');
  // appleIcon.className = 'fab fa-apple';
  // appleLink.appendChild(appleIcon);

  // const microsoftLink = document.createElement('a');
  // microsoftLink.href = '#';
  // microsoftLink.className = 'social-icon';
  // const microsoftIcon = document.createElement('i');
  // microsoftIcon.className = 'fab fa-microsoft';
  // microsoftLink.appendChild(microsoftIcon);

  socialMediaDiv.appendChild(googleLink);
  // socialMediaDiv.appendChild(appleLink);
  // socialMediaDiv.appendChild(microsoftLink);

  // lado izquierdo
  loginDiv.appendChild(loginUpLeftDiv);
  loginUpLeftDiv.appendChild(loginLeftDivHeader);
  loginLeftDivHeader.appendChild(logo);
  loginLeftDivHeader.appendChild(brandDescription);
  loginLeftDivHeader.appendChild(subTitle);
  loginLeftDivHeader.appendChild(transparentBtn);
  loginUpLeftDiv.appendChild(illustrationContainer);
  illustrationContainer.appendChild(illustration);
  // lado derecho
  loginDiv.appendChild(loginUpRightDiv);
  loginUpRightDiv.appendChild(formContainer);
  formContainer.appendChild(formSignIn);
  formSignIn.appendChild(title);
  formSignIn.appendChild(formSubTitle);
  formSignIn.appendChild(inputFieldEmail);
  formSignIn.appendChild(inputFieldPss1);
  formSignIn.appendChild(btnContainer);
  formSignIn.appendChild(socialText);
  formSignIn.appendChild(socialMediaDiv);

  // re direccionando a recuperacion de contraseña
  recoverPasswordLink.addEventListener('click', () => {
    window.location.assign('/recoverPassword');
  });

  transparentBtn.addEventListener('click', () => {
    window.location.assign('/register');
  });

  // evento que va a guardar el registro del usuario
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log('miuser', formSignIn.elements);

    const user = {
      email: formSignIn.elements.Mail.value,
      password: formSignIn.elements.Password.value,
    };
    console.log('Llamada');
    signIn(user);
    console.log('Proceso');

    signInGoogle();
    // caso exito y caso erro! redireccion a pantalla feed(timeline)
    window.location.assign('/feed');
  });

  googleLink.addEventListener('click', (e) => {
    e.preventDefault();
    try {
      signInGoogle();
    } catch (error) {
      console.log('error: ', error);
    }
  });

  return loginDiv;
};
