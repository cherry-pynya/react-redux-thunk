import { useDispatch, useSelector } from "react-redux";
import { clearForm, changeForm, editItem, getData } from "../reducer/listSlice";


export default function Form(props) {
  const item = useSelector((state) => state.list.item);
  console.log(item);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeForm({ name, value }));
  };

  const handleCancel = () => {
    dispatch(clearForm());
    props.history.push(`/`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.history.push(`/`);
    try {
      await dispatch(editItem(item));
      await dispatch(getData());
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="service">Услуга</label>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          className="form-control"
          id="service"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Цена</label>
        <input
          name="price"
          value={item.price}
          onChange={handleChange}
          type="number"
          className="form-control"
          id="price"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Содержание</label>
        <input
          name="content"
          value={item.content}
          onChange={handleChange}
          type="text"
          className="form-control"
          id="content"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Сохранить
      </button>
      <button type="button" className="btn btn-primary" onClick={handleCancel}>
        Отмена
      </button>
    </form>
  );
}
