import React, {useContext, useEffect, useRef, useState} from "react";
import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import userApi from "../../../api/userApi";
import {BASE_IMAGE_BASE_URL} from "../../../assets/constants";
import {Context} from "../../../contexts";
import SearchBar from "../../Common/SearchBar";
import NutritionContainer from "../../Containers/NutritionContainer";
import FoodModal from "./FoodModal";
import TrackingSidebar from "./NutriSidebar";
import "./style.scss";
import TrackingModal from "./TrackingModal";
import authSlice from "../../../redux/slices/authSlice";
import {Helmet} from "react-helmet";
import CustomLoading from "../../Common/Placeholders/CustomLoading";
import NoResults from "../../Common/Placeholders/NoResults";
import {getTodayWorkoutCalories} from "redux/selectors/exerciseSelector";
import {Button, Modal} from "antd";
import {FastField, Form, Formik} from "formik";
import SelectField from "../../Common/SelectField";
import {filterNutrition} from "./constants";
import RangeField from "../../Common/RangeField";

export default function NutritionPage() {
    const dispatch = useDispatch();
    const {nutriState, nutriSearching, foodName} = useContext(Context);
    const {userInfo, isAuthenticated, authLoading} = useSelector(
        (state) => state.authReducer
    );
    const todayCaloriesWorkout = useSelector(getTodayWorkoutCalories);
    const [modal, setModal] = useState({
        isShown: false,
        foodData: {},
    });

    /**
     * FILTER MODAL
     */
    const [filterModal, setFilterModal] = useState({
        isShown: false,
        isLoading: false,
    });
    const handleShowFilterModal = () => {
        setFilterModal({
            ...filterModal,
            isShown: true
        })
    }
    const handleCloseFilterModal = () => {
        setFilterModal({
            ...filterModal,
            isShown: false
        })
    }

    //
    const [servingSize, setServingSize] = useState(1);

    //TRACKING MODAL
    const [showTrackingModal, setShowTrackingModal] = useState(false);
    const handleCloseTrackingModal = () => setShowTrackingModal(false);
    const handleShowTrackingModal = () => setShowTrackingModal(true);

    //
    const handleServingChange = (e) => {
        setServingSize(e.target.value);
    };
    //HANDLE FOOD DETAIL MODAL
    const handleCloseModal = (action) => {
        if (action !== "next") setServingSize(1);
        setModal({...modal, isShown: false});
    };
    const handleShowModal = (foodID) => {
        const foundFood = nutriState.listFoods.find(
            (e) => e.food.foodId === foodID
        );
        setModal({
            foodData: foundFood,
            isShown: true,
        });
    };

    //HANDLE REMOVE TRACKING FOOD
    const handleRemoveTrackingFood = async (id) => {
        try {
            const res = await userApi.removeTrackingFood(id);
            if (res.data.isSuccess)
                return dispatch(
                    authSlice.actions.setAuth({
                        authLoading: false,
                        isAuthenticated: true,
                        userInfo: res.data.updatedUser,
                    })
                );
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Handle Save Filter
     */
    const handleSaveFilter = (values) => {
        nutriSearching({
            health: values.health?.value,
            category: values.category?.value,
            calories: `${values.calories[0]}-${values.calories[1]}`,
            foodName,
        })
    }

    //
    useEffect(() => {
        if (!authLoading && isAuthenticated && !userInfo.trackingInfo.isFilled) {
            handleShowTrackingModal();
        }
    }, [userInfo]);
    return (
        <>
            <NutritionContainer>
                <Helmet>
                    <title>Nutrition</title>
                    <meta name="description" content="Word of nutrition"/>
                </Helmet>
                <TrackingSidebar
                    todayCaloriesWorkout={todayCaloriesWorkout}
                    isAuthenticated={isAuthenticated}
                    authLoading={authLoading}
                    userInfo={userInfo}
                    handleShowTrackingModal={handleShowTrackingModal}
                    handleRemoveTrackingFood={handleRemoveTrackingFood}
                />
                <div className="nutrition_section">
                    <SearchBar/>
                    {nutriState.isLoading ? (
                        <CustomLoading/>
                    ) : nutriState.listFoods ? (
                        nutriState.listFoods.length <= 0 ? (
                            <NoResults/>
                        ) : (
                            <>
                                <div className='d-flex justify-content-start'>
                                    <button
                                        className='common-outline-button common-outline-button-blue mb-3'
                                        style={{fontSize: '14px'}}
                                        onClick={handleShowFilterModal}>
                                        <i className="fas fa-filter"></i> Filter
                                    </button>
                                    <FilterFoodModal visible={filterModal.isShown} handleCancel={handleCloseFilterModal}
                                                     handleSaveFilter={handleSaveFilter}/>
                                </div>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Serving</th>
                                        <th>Food</th>
                                        <th>Energy</th>
                                        <th>Nutrients</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {nutriState.listFoods.map((e, index) => (
                                        <tr
                                            key={index}
                                            role="button"
                                            onClick={() => handleShowModal(e.food.foodId)}
                                        >
                                            <td>{index + 1}</td>
                                            <td>
                                                <img
                                                    height="80"
                                                    width="80"
                                                    src={
                                                        e.food.image
                                                            ? e.food.image
                                                            : BASE_IMAGE_BASE_URL + "/dishes-default.png"
                                                    }
                                                    alt={e.food.label}
                                                />
                                            </td>
                                            <td>100gr</td>
                                            <td>{e.food.label}</td>
                                            <td> {Math.trunc(e.food.nutrients.ENERC_KCAL)}</td>
                                            <td>
                                                <div
                                                    className="d-flex flex-column align-items-start pl-4 justify-content-start">
                                                    <p>
                                                        Protein: {Math.trunc(e.food.nutrients.PROCNT)}g
                                                    </p>
                                                    <p>Fat: {Math.trunc(e.food.nutrients.FAT)}g</p>
                                                    <p>Carbs: {Math.trunc(e.food.nutrients.FIBTG)}g</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </>
                        )
                    ) : (
                        <div className="none_active"></div>
                    )}
                    <FoodModal
                        handleServingChange={handleServingChange}
                        servingSize={servingSize}
                        modal={modal}
                        handleCloseModal={handleCloseModal}
                    />
                    <TrackingModal
                        showTrackingModal={showTrackingModal}
                        handleCloseTrackingModal={handleCloseTrackingModal}
                    />
                </div>
            </NutritionContainer>
        </>
    );

}

const FilterFoodModal = ({visible, handleCancel, handleSaveFilter}) => {
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
                        Save
                    </Button>,
                ]}
            >
                <Formik
                    initialValues={{
                        calories: [1900, 2600]
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
                                            label: <strong><i className="far fa-salad"></i> Low Calories</strong>
                                        },
                                        800: {
                                            style: {
                                                color: '#fc7932'
                                            },
                                            label: <strong><i className="far fa-cheeseburger"></i> High
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
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    );
}

const FilterDishModal = ({visible, handleCancel, handleSaveFilter}) => {
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
                        Save
                    </Button>,
                ]}
            >
                <Formik
                    initialValues={{
                        calories: [1900, 2600]
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
                                    name="category"
                                    label="Category"
                                    placeholder="Choose your food category"
                                    component={SelectField}
                                    options={filterNutrition.category}
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
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    );
}