import successLogo from "../../images/success-logo.svg";
import failLogo from "../../images/fail-logo.svg";

function InfoTooltip({
  isSucces = false,
  name = "info",
  isOpen,
  onClose,
  infoToolTipMessage,
}) {
  return (
    <div className={`popup popup_type_${name}${isOpen ? " popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <div className={"popup__info"}>
          {isSucces ? (
            <img src={successLogo} alt={"Success"} className="popup__image" />
          ) : (
            <img src={failLogo} alt={"Fail"} className="popup__image" />
          )}
          <h2 className="popup__subtitle">{infoToolTipMessage}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
