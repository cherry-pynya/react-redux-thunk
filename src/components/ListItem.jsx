import { useDispatch } from "react-redux";
import { deleteItem, getData, getItemById } from "../reducer/listSlice";

export default function ListItem(props) {
  const { name, price, id } = props.item;

  const dispatch = useDispatch();

  const handleRemove = async () => {
    try {
      dispatch(deleteItem(id));
      await dispatch(getData());
    } catch(err) {
      console.error(err);
    }
  };

  const handleEdit = async () => {
    props.history.push(`/services/:${id}`);
    try {
      await dispatch(getItemById(id));
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <li className="list-group-item">
      <div>
        <span>{name} </span>
        <span>{price} </span>
        <button type="button" className="btn btn-dark" onClick={handleRemove}>
          X
        </button>
        <button type="button" className="btn btn-danger" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </li>
  );
}
