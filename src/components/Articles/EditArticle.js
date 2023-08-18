import { React, useEffect, useState, createContext, useContext } from 'react';
import { useNavigate, Outlet, NavLink, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { UserContext } from '../../App';
import { EditPutArticle } from '../../Services/ApiServices';

const EditArticle = () => {
    //láy dữ liệu thông qua navigate bằng useLocation
    const location = useLocation();
    const { article } = location.state // ==  location.state.article
    console.log("location", article);
    const initialValues = {
        title: article?.title || "",
        description: article?.description || "",
        body: article?.body || "",
        tagList: article?.tagList || []
    };
    const { user } = useContext(UserContext);
    const token = user.token
    const navigate = useNavigate();
    const slug = article?.slug
    const handleSubmit = async (values) => {
        const data = {
            article: {
                ...values
            }
        }
        // Xử lý logic khi form được submit
        // console.log("form", data);
        try {
            const res = await EditPutArticle(token, data, slug)
            console.log("edit data", res);
            const dataRespon = res?.data?.article
            navigate(`/article/${dataRespon.slug}`)
        } catch (error) {
            console.log(error);
        }
    };

    const validateForm = (values) => {
        const errors = {};

        if (!values.title) {
            errors.title = 'title can not be blank.';
        }
        else if (!values.description) {
            errors.description = ' description can not be blank..';
        }
        else if (!values.body) {
            errors.body = ' body can not be blank.';
        }


        return errors;
    };
    const fieldStyle = {
        margin: '10px',
        padding: '5px',
    };
    return (
        <div>
       
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
                                    <h5>    <ErrorMessage style={{ color: 'red' }} name="title" component="div" /></h5>

                                </div>
                                <div className='my-2'>

                                    <Field type="text" placeholder="What's this article about?" name="description" className="form-control form-control-lg" />
                                    <h5><ErrorMessage style={{ color: 'red' }} name="description" component="div" /></h5>

                                </div>
                                <div className='my-2'>

                                    <Field as="textarea" rows="8" placeholder="Write your article (in markdown)" name="body" className="form-control form-control-lg" />
                                    <h5>   <ErrorMessage style={{ color: 'red' }} name="body" component="div" /></h5>

                                </div>
                                <div className='my-2'>
                                    <FieldArray name="tagList">
                                        {({ push, remove, form }) => (
                                            <div>
                                                {form.values.tagList.map((tag, index) => (
                                                    <div key={index}>
                                                        <Field
                                                            name={`tagList[${index}]`}
                                                            placeholder="Enter tags"
                                                            className="form-control form-control-lg"
                                                        />
                                                        <button type="button" className='btn btn-danger my-2' onClick={() => remove(index)}>
                                                            Remove tag
                                                        </button>
                                                    </div>
                                                ))}
                                                <button className='btn btn-info' type="button" onClick={() => push("")}>
                                                    Add Tag
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>


                                </div>
                                <div className="d-flex justify-content-end">

                                    <button className=" sb btn btn-success btn-lg" type="submit">Submit</button>
                                </div>
                            </Form>
                        </Formik>




                    </div>
                </div>
            </>
        </div>
    );
};

export default EditArticle;