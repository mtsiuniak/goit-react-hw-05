import { Field, Form, Formik } from "formik";
// import style from "./SearchForm.module.css";
import toast from "react-hot-toast";

export default function SearchBox  ({ onSubmit })  {
  const handleSubmit = (values, actions) => {
    const formattedSearch = values.search.trim().toLowerCase();
    if (!values.search.trim()) {
      toast.error("Must be filled!");
      return;
    }
    onSubmit(formattedSearch);
    actions.resetForm();
  };
  return (
    <div >
      <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field
            
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Enter name of movie"
          />
          <button  type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
}

