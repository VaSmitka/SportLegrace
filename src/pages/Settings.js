import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import SetUpContext from "../setUpContext";

function Settings({ setActual }) {
  const history = useHistory();
  const { setWorkTime, setWorkSchedule } = useContext(SetUpContext);

  return (
    <>
      <main >
        <Formik
          initialValues={{ workTime: '', workSchedule: '' }}
          validationSchema={Yup.object().shape({
            workTime: Yup.string().required(),
            workSchedule: Yup.mixed().required(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const reader = new FileReader();
            reader.onload = () => {
              const exercises = reader.result.split('\n');
              setWorkTime(values.workTime);
              setWorkSchedule(exercises);
              setSubmitting(false);
              setActual("Workout");
              history.push("/workout");
            };
            reader.readAsText(values.workSchedule);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="settingsInputs">
              <div>
                <label htmlFor="workTime">Work Time:</label>
                <label htmlFor="workSchedule">Work Schedule:</label>
              </div>
              <div>
                <input
                  id="workTime"
                  type="time"
                  name="workTime"
                  min="0:00"
                  max="59:59"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.workTime}
                />
                <input
                  id="workSchedule"
                  type="file"
                  name="workSchedule"
                  onChange={(event) => {
                    setFieldValue("workSchedule", event.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                />
              </div>
              <div className="errorInfo">
                <span>{errors.workTime && touched.workTime && errors.workTime}</span>
                <span>{errors.workSchedule && touched.workSchedule && errors.workSchedule}</span>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Set workout
            </button>
          </form>
        )}
      </Formik>
      </main>
    </>
  );
}

export default Settings;