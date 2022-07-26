import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import "./style.scss";

export default function ShoppingCard({ img, tag }) {
  const history = useHistory();
  const handleOnClick = () => {
    history.push("/shopping");
  };
  return (
    <Card
      style={{ cursor: "pointer" }}
      onClick={handleOnClick}
      className="shopping_card "
    >
      <div className="shopping_card_tag">{tag}</div>
      <Card.Img
        className="shopping_card_image"
        variant="top"
        src={img}
        alt={tag}
      />
    </Card>
  );
}
