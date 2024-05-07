
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required(),
  phone: yup
    .string()
    .required("Mobile number is required")
    .matches(
      /^[0-9]{10}$/,
      "Mobile number must be 10 digits and contain only numbers"
    ),
  password: yup.string().min(8).max(15).required(),
  confirm_password: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const onsubmitHandle = async (data) => {
    setSubmitting(true);
    setSubmitError(null);
  
    try {
      console.log('Submitting data:', data); 
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('Response:', response); 
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
  
      const responseData = await response.json();
      console.log('Response Data:', responseData); 
      setSubmittedData(responseData);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onsubmitHandle)}>
        <h2>Register Here</h2>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input {...register("name")} className="form-control" placeholder="Enter Your Name" required />
          <p className="text-danger">{errors.name?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input {...register("phone")} className="form-control" placeholder="Enter Your Phone" required />
          <p className="text-danger">{errors.phone?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            {...register("email")}
            className="form-control"
            placeholder="Enter Your Email"
            type="email"
            required
          />
          <p className="text-danger">{errors.email?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            {...register("password")}
            className="form-control"
            placeholder="Enter Your Password"
            type="password"
            required
          />
          <p className="text-danger">{errors.password?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password:</label>
          <input
            {...register("confirm_password")}
            className="form-control"
            placeholder="Confirm Your Password"
            type="password"
            required
          />
          <p className="text-danger">{errors.confirm_password?.message}</p>
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
        {submitError && <p className="text-danger mt-3">Error: {submitError}</p>}
      </form>
      {submittedData && (
        <div className="mt-3">
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Form;










// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup.object().shape({
//   email: yup.string().required().email(),
//   name: yup.string().required(),
//   phone: yup
//     .string()
//     .required("Mobile number is required")
//     .matches(
//       /^[0-9]{10}$/,
//       "Mobile number must be 10 digits and contain only numbers"
//     ),
//   password: yup.string().min(8).max(15).required(),
//   confirm_password: yup
//     .string()
//     .label("confirm password")
//     .required()
//     .oneOf([yup.ref("password"), null], "Passwords must match"),
// });

// const Form = () => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onsubmitHandle = async (data) => {
//     try {
//       const response = await fetch('http://localhost:5000/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to submit form');
//       }
      
//       console.log('Form submitted successfully');
//       reset();
//     } catch (error) {
//       console.error('Error submitting form:', error.message);
//     }
//   };
  

//   return (
//     <div className="container mt-5">
//       <form onSubmit={handleSubmit(onsubmitHandle)}>
//         <h2>Register Here</h2>
//         <div className="mb-3">
//           <label className="form-label">Name:</label>
//           <input {...register("name")} className="form-control" placeholder="Enter Your Name" required />
//           <p className="text-danger">{errors.name?.message}</p>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Phone:</label>
//           <input {...register("phone")} className="form-control" placeholder="Enter Your Phone" required />
//           <p className="text-danger">{errors.phone?.message}</p>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Email:</label>
//           <input
//             {...register("email")}
//             className="form-control"
//             placeholder="Enter Your Email"
//             type="email"
//             required
//           />
//           <p className="text-danger">{errors.email?.message}</p>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Password:</label>
//           <input
//             {...register("password")}
//             className="form-control"
//             placeholder="Enter Your Password"
//             type="password"
//             required
//           />
//           <p className="text-danger">{errors.password?.message}</p>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Confirm Password:</label>
//           <input
//             {...register("confirm_password")}
//             className="form-control"
//             placeholder="Confirm Your Password"
//             type="password"
//             required
//           />
//           <p className="text-danger">{errors.confirm_password?.message}</p>
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Form;




// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Modal, Button } from "react-bootstrap";

// const schema = yup.object().shape({
//   email: yup.string().required().email(),
//   name: yup.string().required(),
//   phone: yup
//     .string()
//     .required("Mobile number is required")
//     .matches(
//       /^[0-9]{10}$/,
//       "Mobile number must be 10 digits and contain only numbers"
//     )
//     .required(),
//   password: yup.string().min(8).max(15).required(),
//   confirm_password: yup
//     .string()
//     .label("confirm password")
//     .required()
//     .oneOf([yup.ref("password"), null], "Passwords must match"),
// });

// const Form = () => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const [submittedData, setSubmittedData] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => setShowModal(false);

//   const onsubmitHandle = (data) => {
//     setSubmittedData(data);
//     setShowModal(true);
//     console.log({ data });
//     reset();
//   };

//   return (
//     <div className="container mt-5">
//       <form onSubmit={handleSubmit(onsubmitHandle)}>
//         <h2>Register Here</h2>
//         <div className="mb-3">
//           <label className="form-label">Name:</label>
//           <input
//             {...register("name")}
//             className="form-control"
//             placeholder="Enter Your Name"
//             required
//           />
//           <p className="text-danger">{errors.name?.message}</p>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Phone:</label>
//           <input
//             {...register("phone")}
//             className="form-control"
//             placeholder="Enter Your Phone"
//             required
//           />
//           <p className="text-danger">{errors.phone?.message}</p>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Email:</label>
//           <input
//             {...register("email")}
//             className="form-control"
//             placeholder="Enter Your Email"
//             type="email"
//             required
//           />
//           <p className="text-danger">{errors.email?.message}</p>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Password:</label>
//           <input
//             {...register("password")}
//             className="form-control"
//             placeholder="Enter Your Password"
//             type="password"
//             required
//           />
//           <p className="text-danger">{errors.password?.message}</p>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Confirm Password:</label>
//           <input
//             {...register("confirm_password")}
//             className="form-control"
//             placeholder="Confirm Your Password"
//             type="password"
//             required
//           />
//           <p className="text-danger">{errors.confirm_password?.message}</p>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Submitted Data</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {submittedData && (
//             <pre>{JSON.stringify(submittedData, null, 2)}</pre>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Form;




