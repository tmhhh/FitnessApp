import React, {useRef} from "react";
import {Button, Modal} from "antd";
import {FastField, Form, Formik} from "formik";
import SelectField from "../../../Common/SelectField";
import {filterNutrition} from "../constants";
import RangeField from "../../../Common/RangeField";

export const FilterModal = ({visible, handleCancel, handleSaveFilter, handleClearFilter, searchType}) => {
    const formRef = useRef();

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }

        handleCancel();
    };

    return (
        <>
            <Modal
                visible={visible}
                title="Filter"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Filter
                    </Button>,
                ]}
            >
                <Formik
                    initialValues={{
                        calories: searchType === 'dish' ? [1900, 2600] : [300, 800]
                    }}
                    onSubmit={(values) => {
                        handleSaveFilter(values)
                    }}
                    innerRef={formRef}
                >
                    {(formikProps) => {
                        const {values} = formikProps;
                        return (
                            <Form>
                                <FastField
                                    name="health"
                                    label="Health"
                                    placeholder="Choose your health regime"
                                    component={SelectField}
                                    options={filterNutrition.health}
                                />
                                <FastField
                                    name="category"
                                    label="Category"
                                    placeholder="Choose your food category"
                                    component={SelectField}
                                    options={filterNutrition.category}
                                />
                                {searchType === 'dish' ? (
                                    <>
                                        <FastField
                                            name="diet"
                                            label="Diet"
                                            placeholder="Choose your diet trend"
                                            component={SelectField}
                                            options={filterNutrition.diet}
                                        />
                                        <FastField
                                            name="cuisineType"
                                            label="Cuisine Type"
                                            placeholder="Choose your cuisine type"
                                            component={SelectField}
                                            options={filterNutrition.cuisine}
                                        />
                                        <FastField
                                            name="calories"
                                            label="Calories range"
                                            defaultValue={[1900, 2600]}
                                            range={[1200, 3500]}
                                            marks={{
                                                1200: {
                                                    style: {
                                                        color: '#f89e6e'
                                                    },
                                                    label: <strong><i className="fas fa-fire-alt"></i> Low</strong>
                                                },
                                                1900: {
                                                    style: {
                                                        color: 'pink'
                                                    },
                                                    label: <strong><i className="fas fa-venus"></i> Women</strong>
                                                },
                                                2600: {
                                                    style: {
                                                        color: '#5db9ff'
                                                    },
                                                    label: <strong><i className="fas fa-mars"></i> Men</strong>
                                                },
                                                3500: {
                                                    style: {
                                                        color: '#f50',
                                                    },
                                                    label: <strong><i
                                                        className="fas fa-exclamation-triangle"></i> High</strong>,
                                                }
                                            }}
                                            component={RangeField}
                                        />
                                    </>
                                ) : (
                                    <FastField
                                        name="calories"
                                        label="Calories range"
                                        defaultValue={[300, 800]}
                                        range={[0, 1000]}
                                        marks={{
                                            0: {
                                                style: {
                                                    color: '#96f34b'
                                                },
                                                label: <strong>0</strong>
                                            },
                                            300: {
                                                style: {
                                                    color: '#f5d672'
                                                },
                                                label: <strong><i className="fas fa-apple-alt"></i> Low Calories</strong>
                                            },
                                            800: {
                                                style: {
                                                    color: '#fc7932'
                                                },
                                                label: <strong><i className="fas fa-hamburger"></i> High
                                                    Calories</strong>
                                            },
                                            1000: {
                                                style: {
                                                    color: '#ff2600',
                                                },
                                                label: <strong>1000</strong>,
                                            }
                                        }}
                                        component={RangeField}
                                    />
                                )}
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    );
}