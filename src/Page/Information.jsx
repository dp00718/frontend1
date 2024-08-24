import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../Common/MyContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const Information = () => {

const {userdata,setUserdata,token} = useContext(MyContext)
const [loader, setLoader] = useState(true);
const[edit,setEdit]=useState(false)
 

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await fetch('https://back-end-xi-nine.vercel.app/account-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserdata(data.accountInfo);
      sessionStorage.setItem('user', JSON.stringify(data.accountInfo));
    } catch (error) {
      console.error('Failed to fetch account details:', error);
    } finally {
      setLoader(false);
    }
  };

  fetchUserData();
}, [setUserdata, token]);

if (loader) {
  return <div>Loading...</div>;
}

  return (
   
    <>
{
    token?

    !edit?(
          <div className='account-details'>
            <h2>Account Information</h2>
            <p><strong>Firstname:</strong> {userdata && userdata.firstname}</p>
            <p><strong>Lastname:</strong> {userdata && userdata.lastname}</p>
            <p><strong>Email:</strong>{userdata && userdata.emailaddress}</p>
            <p><strong>Password:</strong> ********</p>
            <button onClick={()=>setEdit(true)}>Edit</button>
          </div>
          
    ):(
      <Formik
            initialValues={{
              firstname: userdata.firstname || '',
              lastname: userdata.lastname || '',
              emailaddress: userdata.emailaddress || '',
              password: '',
            }}
            validationSchema={Yup.object({
              firstname: Yup.string().required('Firstame is required'),
              lastname: Yup.string().required('Lastname is required'),
              emailaddress: Yup.string().email('Invalid email address').required('Emailaddress is required'),
              password: Yup.string().required('Password is required'),
            })}
            onSubmit={async (values) => {

              // alert(values.firstname)
             
              const response = await fetch('https://back-end-xi-nine.vercel.app/update-account-data', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
              });

              const data = await response.json();

              if(data.success){
                alert(data.message)
              }else{
                alert(data.error)
              }

              if (data.success) {
               
                setUserdata(data.accountInfo);
                sessionStorage.setItem('user', JSON.stringify(data.accountInfo));
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
              } else {
            console.log(data.error)
              }
            
            }}
          >
            {({ isSubmitting }) => (
              <Form className='name-main'>
                <h2>Update Account Details</h2>
                <div className='name-form'>
                  <div className='name-input'>
                    <label htmlFor="firstname">Firstname:</label>
                    <Field type="text" name="firstname" />
                    <ErrorMessage name="firstname" component="div" className="error-message" />
                  </div>
                  <div className='name-input'>
                    <label htmlFor="lastname">Lastname:</label>
                    <Field type="text" name="lastname" />
                    <ErrorMessage name="lastname" component="div" className="error-message" />
                  </div>
                  <div className='name-input'>
                    <label htmlFor="emailaddress">Emailaddress:</label>
                    <Field type="text" name="emailaddress" disabled/>
                    <ErrorMessage name="emailaddress" component="div" className="error-message" />
                  </div>
                  <div className='name-input'>
                    <label htmlFor="password">Password:</label>
                    <Field type="password" name="password" placeholder='Enter Updated Password' />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                   Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
    )
    
    
    :
          <p>no data available</p>

}

          </>
        )
     }



export default Information