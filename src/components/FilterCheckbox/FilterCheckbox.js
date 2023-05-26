import "./FilterCheckbox.css";

function FilterCheckbox({ handleCheckbox, isShort }) {
  return (
    <div className="filter">
      <label className="filter__tumbler">
        <input
          type="checkbox"
          className="filter__checkbox"
          checked={isShort}
          onChange={handleCheckbox}
        ></input>
        <span className="filter__slider"></span>
      </label>
      <span className="filter__label-text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
