import './style.css'

export interface PopupProps {
  children: React.ReactNode
  show: boolean
  onClickClose?: () => void
}

const Popup = ({ children, show, onClickClose }: PopupProps) => {
  if (show === false) {
    return <></>
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close" type="button" onClick={() => onClickClose?.()}>X</button>
        {children}
      </div>
    </div>
  )
}

export default Popup
