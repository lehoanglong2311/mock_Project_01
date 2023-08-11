import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import './NewArticle.css';
const NewArticle = () => {
    const initialValues = {
        title: "",
        description: "",
        body: "",
        tagList: [

        ]
    };

    const handleSubmit = (values) => {
        // Xử lý logic khi form được submit
        console.log(values);
    };

    const validateForm = (values) => {
        // const errors = {};

        // if (!values.name) {
        //   errors.name = 'Vui lòng nhập tên.';
        // }

        // return errors;
    };
    const fieldStyle = {
        margin: '10px',
        padding: '5px',
    };
    return (
        <>
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validate={validateForm}
                    >
                        <Form style={fieldStyle}>
                            <div className='my-2'>
                                <Field type="text" placeholder="Article Title" name="title" className="form-control form-control-lg" />
                                <ErrorMessage name="title" component="div" />

                            </div>
                            <div className='my-2'>

                                <Field type="text" placeholder="What's this article about?" name="title" className="form-control form-control-lg" />
                                <ErrorMessage name="description" component="div" />

                            </div>
                            <div className='my-2'>

                                <Field as="textarea" rows="8" placeholder="Write your article (in markdown)" name="title" className="form-control form-control-lg" />
                                <ErrorMessage name="body" component="div" />

                            </div>
                            <div className='my-2'>

                                <Field type="text" placeholder="Enter tags" name="title" className="form-control form-control-lg" />
                                <ErrorMessage name="tagList" component="div" />

                            </div>
                            <div className="d-flex justify-content-end">

                                <button className=" sb btn btn-success btn-lg" type="submit">Submit</button>
                            </div>
                        </Form>
                    </Formik>




                </div>
            </div>
        </>
    );
};

export default NewArticle;