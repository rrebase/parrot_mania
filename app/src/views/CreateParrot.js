import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { Formik, Form } from 'formik';

import { createParrot } from 'sagas/parrots/createParrot';
import { gettext } from 'utils/i18n';

const CreateParrot = ({ createParrot }) => (
    <Container>
        <h1 className="my-5">{gettext('Add a new parrot!')}</h1>
        <Formik
            initialValues={{ name: '', link: '' }}
            onSubmit={(values) => {
                createParrot(values.name, values.link);
            }}
        >
            {({ values, handleChange }) => (
                <Form>
                    <FormGroup>
                        <Label for="name">{gettext('Name')}</Label>
                        <Input
                            name="name"
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="link">{gettext('Link')}</Label>
                        <Input
                            name="link"
                            id="link"
                            type="url"
                            value={values.link}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button type="submit">{gettext('Create')}</Button>
                </Form>
            )}
        </Formik>
    </Container>
);

const mapDispatchToProps = (dispatch) => ({
    createParrot: (name, link) => dispatch(createParrot(name, link)),
});

const CreateParrotConnector = connect(
    null,
    mapDispatchToProps,
)(CreateParrot);

export default CreateParrotConnector;
