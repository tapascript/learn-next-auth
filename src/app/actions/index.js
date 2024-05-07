
'use server'

export async function doSocialLogin(formData) {
  const action = formData.get('action');
  

  switch (action) {
    case 'google':
      console.log('sign in with google');
      break;

    case 'github':
      console.log('sign in with github');
      break;  
  }
}